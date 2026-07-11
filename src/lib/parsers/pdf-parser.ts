import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

// Initialize worker configuration for Node.js server environment
// This must happen before any PDF document is processed
const initializeWorker = () => {
  if (typeof GlobalWorkerOptions === 'undefined') {
    return;
  }

  // Skip if already configured
  if (GlobalWorkerOptions.workerSrc) {
    return;
  }

  try {
    // For Node.js environments with pdfjs-dist/legacy
    // We need to use require.resolve to get the worker path
    const pdfjsWorkerPath = require.resolve('pdfjs-dist/legacy/build/pdf.worker.min.mjs');

    // Set the worker source with the absolute path
    GlobalWorkerOptions.workerSrc = pdfjsWorkerPath;
    console.log('[PDF Parser] Worker initialized:', pdfjsWorkerPath.substring(pdfjsWorkerPath.length - 50));
  } catch (error) {
    try {
      // Fallback to non-minified version
      const pdfjsWorkerPath = require.resolve('pdfjs-dist/legacy/build/pdf.worker.mjs');
      GlobalWorkerOptions.workerSrc = pdfjsWorkerPath;
      console.log('[PDF Parser] Worker initialized (fallback):', pdfjsWorkerPath.substring(pdfjsWorkerPath.length - 50));
    } catch (fallbackError) {
      console.warn('[PDF Parser] Failed to initialize worker:', error);
    }
  }
};

// Initialize on module load
initializeWorker();

export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    // Ensure worker is initialized before processing
    initializeWorker();

    const uint8Array = new Uint8Array(buffer);
    const doc = await getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
    }).promise;

    const textParts: string[] = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .filter((item) => 'str' in item)
        .map((item) => (item as { str: string }).str)
        .join(' ');
      textParts.push(pageText);
    }

    await doc.destroy();

    const text = textParts.join('\n').trim();

    if (!text || text.length < 50) {
      throw new Error('PDF appears to contain very little text. It might be image-based or scanned.');
    }

    return text;
  } catch (error) {
    if (error instanceof Error && error.message.includes('very little text')) {
      throw error;
    }
    const msg = error instanceof Error ? error.message : String(error);
    console.error('PDF parse error:', msg);
    throw new Error(`Failed to parse PDF: ${msg}`);
  }
}
