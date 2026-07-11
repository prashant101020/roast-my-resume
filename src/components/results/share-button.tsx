"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Check, Copy } from "lucide-react";
import { RoastResult } from "@/lib/types";

interface ShareButtonProps {
  result: RoastResult;
}

export function ShareButton({ result }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const lines = [
      `🔥 Resume Roast Results`,
      ``,
      `📊 Overall Score: ${result.overallScore}/100`,
      `📋 ATS Score: ${result.atsScore}/100`,
      `🎯 Hire Probability: ${result.hireProbability}`,
      ``,
      `Top Roast:`,
      `"${result.roasts[0]?.roast || 'N/A'}"`,
      ``,
      `💀 Final Insult: "${result.finalInsult}"`,
      ``,
      `Get your resume roasted at resumeroast.app 🔥`,
    ];
    return lines.join('\n');
  };

  const handleCopy = async () => {
    const text = generateShareText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = generateShareText();
    if (navigator.share) {
      await navigator.share({
        title: '🔥 My Resume Roast Results',
        text,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
      >
        <Share2 className="w-4 h-4" />
        Share Roast
      </button>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
      >
        {copied ? (
          <><Check className="w-4 h-4 text-emerald-400" /> Copied!</>
        ) : (
          <><Copy className="w-4 h-4" /> Copy Results</>
        )}
      </button>
    </motion.div>
  );
}
