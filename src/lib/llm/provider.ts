import { ParsedResume, RoastResult } from '@/lib/types';

export interface LLMProvider {
  name: string;
  generateRoast(resume: ParsedResume): Promise<RoastResult>;
  extractResume(rawText: string): Promise<Omit<ParsedResume, 'rawText'>>;
}

export function getLLMProvider(): LLMProvider {
  // Prioritize OpenRouter if the API key is set
  if (process.env.OPENROUTER_API_KEY) {
    const { OpenRouterProvider } = require('@/lib/llm/openrouter');
    return new OpenRouterProvider();
  }
  if (process.env.GEMINI_API_KEY) {
    const { GeminiProvider } = require('@/lib/llm/gemini');
    return new GeminiProvider();
  }
  if (process.env.GROQ_API_KEY) {
    const { GroqProvider } = require('@/lib/llm/groq');
    return new GroqProvider();
  }
  throw new Error(
    'No LLM provider configured. Set one of: OPENROUTER_API_KEY, GEMINI_API_KEY, or GROQ_API_KEY in your .env.local file.'
  );
}
