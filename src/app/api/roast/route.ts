import { NextRequest, NextResponse } from 'next/server';
import { validateServerFile, getFileTypeFromBuffer } from '@/lib/validators/file-validator';
import { parsePdf } from '@/lib/parsers/pdf-parser';
import { parseDocx } from '@/lib/parsers/docx-parser';
import { extractResumeData } from '@/lib/parsers/resume-extractor';
import { getLLMProvider } from '@/lib/llm/provider';

export const runtime = 'nodejs'; // Force Node.js runtime
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please upload a resume.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const validation = validateServerFile(buffer, file.name);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const fileType = getFileTypeFromBuffer(buffer);
    let rawText: string;

    if (fileType === 'pdf') {
      rawText = await parsePdf(buffer);
    } else if (fileType === 'docx') {
      rawText = await parseDocx(buffer);
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type.' },
        { status: 400 }
      );
    }

    const resumeData = await extractResumeData(rawText);

    const provider = getLLMProvider();
    const roastResult = await provider.generateRoast(resumeData);

    return NextResponse.json({
      success: true,
      resume: {
        name: resumeData.name,
        skills: resumeData.skills,
        experienceCount: resumeData.experience.length,
        projectCount: resumeData.projects.length,
        educationCount: resumeData.education.length,
      },
      roast: roastResult,
    });
  } catch (error) {
    console.error('Roast API error:', error);
    const message = error instanceof Error ? error.message : 'Something went wrong while roasting your resume.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
