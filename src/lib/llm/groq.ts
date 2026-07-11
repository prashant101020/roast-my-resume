import OpenAI from 'openai';
import { LLMProvider } from './provider';
import { ParsedResume, RoastResult } from '@/lib/types';
import { RESUME_EXTRACTION_PROMPT, ROAST_SYSTEM_PROMPT, buildRoastUserPrompt } from './prompts';

export class GroqProvider implements LLMProvider {
  name = 'groq';
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY not set');
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  async generateRoast(resume: ParsedResume): Promise<RoastResult> {
    const { rawText, ...resumeData } = resume;
    const userPrompt = buildRoastUserPrompt(resumeData as unknown as Record<string, unknown>);

    const completion = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: ROAST_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content ?? '';
    try {
      return JSON.parse(text) as RoastResult;
    } catch {
      throw new Error('Failed to parse roast response from Groq.');
    }
  }

  async extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>> {
    const completion = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: RESUME_EXTRACTION_PROMPT },
        { role: 'user', content: `Resume text:\n${rawText}` },
      ],
      temperature: 0.1,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content ?? '';
    try {
      return JSON.parse(text);
    } catch {
      throw new Error('Failed to parse resume extraction from Groq.');
    }
  }
}
