import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import 'pdfjs-dist/legacy/build/pdf.worker.mjs';

async function test() {
  try {
    console.log('Testing direct PDF worker import...');
    const uint8Array = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 255, 255, 255, 255, 10]); // Mock %PDF-1.4 header
    const docTask = getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
    });
    const doc = await docTask.promise;
    console.log('Success! Parsed document successfully:', doc);
  } catch (error) {
    console.error('Test error:', error);
  }
}

test();
