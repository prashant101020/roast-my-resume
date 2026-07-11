import { getDocument, PDFWorker } from 'pdfjs-dist/legacy/build/pdf.mjs';
import * as path from 'path';
import { pathToFileURL } from 'url';

// Resolve worker path
const workerPath = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
const workerUrl = pathToFileURL(workerPath).toString();

async function test() {
  try {
    console.log('Instantiating PDFWorker manually with:', workerUrl);
    
    // Create a new PDFWorker instance!
    const worker = new PDFWorker({
      port: null,
      name: 'pdfjs-worker',
      // In PDFJS, PDFWorker constructor takes an object with port or workerSrc
      // Let's check if the constructor supports workerSrc or if it uses GlobalWorkerOptions
    });
    
    console.log('Worker instance:', worker);
    
    const uint8Array = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 255, 255, 255, 255, 10]); // Mock %PDF-1.4 header
    const docTask = getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
      worker: worker
    });
    const doc = await docTask.promise;
    console.log('Success! Parsed document successfully:', doc);
  } catch (error) {
    console.error('Test error:', error);
  }
}

test();
