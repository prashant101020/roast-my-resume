import { GoogleGenAI } from '@google/genai';
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

export class GeminiProvider implements LLMProvider {
  name = 'gemini';
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    // Using the old constructor syntax that is compatible with your installed package.
    // Casting to `any` to bypass the conflicting type definitions.
    this.ai = new GoogleGenAI(apiKey as any);
  }

  async generateRoast(resume: ParsedResume): Promise<RoastResult> {
    const { rawText, ...resumeData } = resume;
    const userPrompt = buildRoastUserPrompt(resumeData as unknown as Record<string, unknown>);

    // Using the old `models.generateContent` syntax.
    const response = await (this.ai.models as any).generateContent({
      model: 'gemini-pro', // A model compatible with the older API version.
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      systemInstruction: ROAST_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    });

    const text = response.response.candidates[0].content.parts[0].text ?? '';
    try {
      return extractAndParseJson<RoastResult>(text);
    } catch (error) {
      console.error("Failed to parse roast response from Gemini. Raw text:", text);
      const message = error instanceof Error ? error.message : 'Unknown parsing error';
      throw new Error(`Failed to parse roast response from Gemini. Reason: ${message}`);
    }
  }

  async extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>> {
    const userPrompt = `${RESUME_EXTRACTION_PROMPT}\n\nResume text:\n${rawText}`;

    // Using the old `models.generateContent` syntax.
    const response = await (this.ai.models as any).generateContent({
      model: 'gemini-pro',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    });

    const text = response.response.candidates[0].content.parts[0].text ?? '';
    try {
      return extractAndParseJson<Omit<ParsedResume, 'rawText'>>(text);
    } catch (error) {
      console.error("Failed to parse resume extraction from Gemini. Raw text:", text);
      const message = error instanceof Error ? error.message : 'Unknown parsing error';
      throw new Error(`Failed to parse resume extraction from Gemini. Reason: ${message}`);
    }
  }
}
