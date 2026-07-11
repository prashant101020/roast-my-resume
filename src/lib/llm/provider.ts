import { ParsedResume, RoastResult } from '@/lib/types';

export interface LLMProvider {
  name: string;
  generateRoast(resume: ParsedResume): Promise<RoastResult>;
  extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>>;
}

export function getLLMProvider(): LLMProvider {
  if (process.env.GEMINI_API_KEY) {
    const { GeminiProvider } = require('@/lib/llm/gemini');
    return new GeminiProvider();
  }
  if (process.env.GROQ_API_KEY) {
    const { GroqProvider } = require('@/lib/llm/groq');
    return new GroqProvider();
  }
  if (process.env.OPENROUTER_API_KEY) {
    const { OpenRouterProvider } = require('@/lib/llm/openrouter');
    return new OpenRouterProvider();
  }
  throw new Error(
    'No LLM provider configured. Set one of: GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY in your .env.local file.'
  );
}
