import { FileValidationResult } from '@/lib/types';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file: File): FileValidationResult {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Invalid file type. Only PDF and DOCX files are accepted. You uploaded: ${ext}`,
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a valid PDF or DOCX file.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File too large (${sizeMB}MB). Maximum size is 5MB.`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'File appears to be empty. Please upload a valid resume.',
    };
  }

  return { valid: true };
}

export function getFileTypeFromBuffer(buffer: Buffer): 'pdf' | 'docx' | null {
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return 'pdf';
  }
  if (buffer[0] === 0x50 && buffer[1] === 0x4b) {
    return 'docx';
  }
  return null;
}

export function validateServerFile(buffer: Buffer, fileName: string): FileValidationResult {
  if (buffer.length === 0) {
    return { valid: false, error: 'Empty file received.' };
  }
  if (buffer.length > MAX_FILE_SIZE) {
    return { valid: false, error: 'File exceeds 5MB limit.' };
  }
  const detectedType = getFileTypeFromBuffer(buffer);
  if (!detectedType) {
    return { valid: false, error: 'Could not detect file type. Upload a valid PDF or DOCX.' };
  }
  const ext = '.' + fileName.split('.').pop()?.toLowerCase();
  if (ext === '.pdf' && detectedType !== 'pdf') {
    return { valid: false, error: 'File claims to be PDF but content does not match.' };
  }
  if (ext === '.docx' && detectedType !== 'docx') {
    return { valid: false, error: 'File claims to be DOCX but content does not match.' };
  }
  return { valid: true };
}
