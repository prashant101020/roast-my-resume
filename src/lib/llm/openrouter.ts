import OpenAI from 'openai';
import { LLMProvider } from './provider';
import { ParsedResume, RoastResult } from '@/lib/types';
import { RESUME_EXTRACTION_PROMPT, ROAST_SYSTEM_PROMPT, buildRoastUserPrompt } from './prompts';

// Helper function to find and parse JSON from a string
function extractAndParseJson<T>(text: string): T {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch && jsonMatch[0]) {
    try {
      return JSON.parse(jsonMatch[0]) as T;
    } catch (error) {
      throw new Error('Failed to parse the extracted JSON object.');
    }
  }
  if (text.trim().startsWith('{')) {
    return JSON.parse(text.trim()) as T;
  }
  throw new Error('No JSON object found in the response text.');
}

export class OpenRouterProvider implements LLMProvider {
  name = 'openrouter';
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OPENROUTER_API_KEY not set');
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Resume Roast',
      },
    });
  }

  async generateRoast(resume: ParsedResume): Promise<RoastResult> {
    const { rawText, ...resumeData } = resume;
    const userPrompt = buildRoastUserPrompt(resumeData as unknown as Record<string, unknown>);

    try {
      const completion = await this.client.chat.completions.create({
        // Using OpenRouter's auto-routing model for free-tier reliability
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: ROAST_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 4096,
      });

      const text = completion.choices[0]?.message?.content ?? '';
      return extractAndParseJson<RoastResult>(text);
    } catch (error) {
      console.error("Failed to get roast from OpenRouter. Error:", error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get roast from OpenRouter. Reason: ${message}`);
    }
  }

  async extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>> {
    try {
      const completion = await this.client.chat.completions.create({
        // Using OpenRouter's auto-routing model for free-tier reliability
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: RESUME_EXTRACTION_PROMPT },
          { role: 'user', content: `Resume text:\n${rawText}` },
        ],
        temperature: 0.1,
        max_tokens: 4096,
      });

      const text = completion.choices[0]?.message?.content ?? '';
      return extractAndParseJson<Omit<ParsedResume, 'rawText'>>(text);
    } catch (error) {
      console.error("Failed to extract resume data from OpenRouter. Error:", error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to extract resume data from OpenRouter. Reason: ${message}`);
    }
  }
}
