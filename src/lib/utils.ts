import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return Math.round(Math.max(0, Math.min(100, score))).toString();
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-green-500 to-emerald-400';
  if (score >= 60) return 'from-yellow-500 to-amber-400';
  if (score >= 40) return 'from-orange-500 to-amber-500';
  return 'from-red-500 to-rose-400';
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Actually Impressive';
  if (score >= 80) return 'Not Bad';
  if (score >= 70) return 'Mid';
  if (score >= 60) return 'Needs Work';
  if (score >= 50) return 'Yikes';
  if (score >= 40) return 'Oof';
  if (score >= 30) return 'Pain';
  if (score >= 20) return 'Emotional Damage';
  return 'Career Suicide';
}

export function getMeterEmoji(value: number): string {
  if (value >= 80) return '🚨';
  if (value >= 60) return '😬';
  if (value >= 40) return '😐';
  if (value >= 20) return '👍';
  return '✨';
}
