import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

// On the server, pdfjs-dist is externalized (serverExternalPackages) so it
// loads directly from node_modules. Its internal "fake worker" fallback
// dynamically imports the worker from its own directory — no manual
// workerSrc configuration is needed.

export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    const uint8Array = new Uint8Array(buffer);
    const doc = await pdfjs.getDocument({
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
