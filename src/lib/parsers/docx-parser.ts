// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require('mammoth');

export async function parseDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim();
    if (!text || text.length < 50) {
      throw new Error('DOCX appears to contain very little text content.');
    }
    return text;
  } catch (error) {
    if (error instanceof Error && error.message.includes('very little text')) {
      throw error;
    }
    throw new Error('Failed to parse DOCX file. The file might be corrupted.');
  }
}
