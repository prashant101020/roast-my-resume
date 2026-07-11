import { GoogleGenAI } from '@google/genai';
import { LLMProvider } from './provider';
import { ParsedResume, RoastResult } from '@/lib/types';
import { RESUME_EXTRACTION_PROMPT, ROAST_SYSTEM_PROMPT, buildRoastUserPrompt } from './prompts';

export class GeminiProvider implements LLMProvider {
  name = 'gemini';
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateRoast(resume: ParsedResume): Promise<RoastResult> {
    const { rawText, ...resumeData } = resume;
    const userPrompt = buildRoastUserPrompt(resumeData as unknown as Record<string, unknown>);

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: ROAST_SYSTEM_PROMPT,
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    const text = response.text ?? '';
    try {
      const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();
      return JSON.parse(cleaned) as RoastResult;
    } catch {
      throw new Error('Failed to parse roast response from Gemini. The AI might be having a bad day.');
    }
  }

  async extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${RESUME_EXTRACTION_PROMPT}\n\nResume text:\n${rawText}`,
      config: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text ?? '';
    try {
      const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error('Failed to parse resume extraction from Gemini.');
    }
  }
}
