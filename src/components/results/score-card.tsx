"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
  label: string;
  sublabel?: string;
  delay?: number;
}

export function ScoreCard({ score, label, sublabel, delay = 0 }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 54; // radius 54
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={`url(#scoreGradient-${label.replace(/\s+/g, '-')})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={`scoreGradient-${label.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={score >= 60 ? '#22d3ee' : '#f97316'} />
              <stop offset="100%" stopColor={score >= 60 ? '#8b5cf6' : '#ef4444'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedCounter
            target={score}
            className={`text-3xl font-bold ${scoreColor}`}
          />
          <span className="text-xs text-gray-500 mt-1">{scoreLabel}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-white">{label}</h3>
      {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
    </motion.div>
  );
}
