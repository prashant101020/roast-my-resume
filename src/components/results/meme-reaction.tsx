"use client";

import { motion } from "framer-motion";
import { RoastResult } from "@/lib/types";

interface MemeReactionProps {
  result: RoastResult;
}

export function MemeReaction({ result }: MemeReactionProps) {
  return (
    <motion.div
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white">🎭 The Verdict</h3>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Recruiter Reaction</span>
          <p className="text-gray-300 mt-1 text-sm">{result.recruiterReaction}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-xs text-emerald-400 uppercase tracking-wide">Best Section</span>
            <p className="text-white text-sm mt-1 font-medium">{result.bestSection}</p>
          </div>
          <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <span className="text-xs text-red-400 uppercase tracking-wide">Worst Section</span>
            <p className="text-white text-sm mt-1 font-medium">{result.worstSection}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Hire Probability</span>
          <p className="text-orange-300 mt-1 text-sm font-medium">{result.hireProbability}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Seniority Guess</span>
          <p className="text-purple-300 mt-1 text-sm font-medium">{result.seniorityGuess}</p>
        </div>

        {/* Final Insult */}
        <motion.div
          className="p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 fire-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-xs text-orange-400 uppercase tracking-wide">Final Insult 💀</span>
          <p className="text-orange-200 mt-2 text-base font-medium italic">&ldquo;{result.finalInsult}&rdquo;</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
