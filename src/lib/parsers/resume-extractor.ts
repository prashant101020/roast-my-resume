import { ParsedResume } from '@/lib/types';
import { getLLMProvider } from '@/lib/llm/provider';

export async function extractResumeData(rawText: string): Promise<ParsedResume> {
  const provider = getLLMProvider();
  const parsed = await provider.extractResume(rawText);
  return {
    ...parsed,
    rawText,
  };
}
