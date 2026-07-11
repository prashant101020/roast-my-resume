export interface ParsedResume {
  name: string;
  email?: string;
  phone?: string;
  skills: string[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: string[];
  summary?: string;
  achievements: string[];
  rawText: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  description?: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  technologies?: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  year?: string;
  gpa?: string;
}

export interface RoastItem {
  title: string;
  roast: string;
  problem: string;
  fix: string;
}

export interface RoastResult {
  overallScore: number;
  atsScore: number;
  roasts: RoastItem[];
  recruiterReaction: string;
  bestSection: string;
  worstSection: string;
  hireProbability: string;
  seniorityGuess: string;
  finalInsult: string;
  buzzwordDensity: number;
  corporateNpcScore: number;
  mainCharacterIndex: number;
  techBroDelusionMeter: number;
  linkedInInfluencer: boolean;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export type LLMProviderName = 'gemini' | 'openrouter' | 'groq';
