import { pathToFileURL } from 'url';

const minimalPdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [ 3 0 R ] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [ 0 0 595 842 ] /Resources << >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 48 >>
stream
BT /F1 12 Tf 70 700 Td (Hello World, this is a real resume with long text for parsing test.) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000222 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
321
%%EOF`;

async function runTest() {
  try {
    const buffer = Buffer.from(minimalPdf, 'utf-8');
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('resume', blob, 'resume.pdf');

    console.log('Sending request to API...');
    const res = await fetch('http://localhost:3000/api/roast', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', res.status);
    const json = await res.json();
    console.log('Response JSON:', JSON.stringify(json, null, 2));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

runTest();
