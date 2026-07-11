import OpenAI from 'openai';
import { LLMProvider } from './provider';
import { ParsedResume, RoastResult } from '@/lib/types';
import { RESUME_EXTRACTION_PROMPT, ROAST_SYSTEM_PROMPT, buildRoastUserPrompt } from './prompts';

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

    const completion = await this.client.chat.completions.create({
      model: 'meta-llama/llama-3.3-70b-instruct',
      messages: [
        { role: 'system', content: ROAST_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 4096,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    try {
      const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();
      return JSON.parse(cleaned) as RoastResult;
    } catch {
      throw new Error('Failed to parse roast response from OpenRouter.');
    }
  }

  async extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>> {
    const completion = await this.client.chat.completions.create({
      model: 'meta-llama/llama-3.3-70b-instruct',
      messages: [
        { role: 'system', content: RESUME_EXTRACTION_PROMPT },
        { role: 'user', content: `Resume text:\n${rawText}` },
      ],
      temperature: 0.1,
      max_tokens: 4096,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    try {
      const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error('Failed to parse resume extraction from OpenRouter.');
    }
  }
}
