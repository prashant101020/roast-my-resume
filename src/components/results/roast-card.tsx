"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, AlertTriangle, Lightbulb, ChevronDown } from "lucide-react";
import { RoastItem } from "@/lib/types";

interface RoastCardProps {
  item: RoastItem;
  index: number;
}

export function RoastCard({ item, index }: RoastCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-orange-500/20 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-600" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 pl-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-orange-300/90 text-sm italic leading-relaxed">&ldquo;{item.roast}&rdquo;</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pl-[4.25rem] pb-5 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-red-400 font-medium uppercase tracking-wide">Why it&apos;s bad</span>
                  <p className="text-gray-400 text-sm mt-1">{item.problem}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-emerald-400 font-medium uppercase tracking-wide">How to fix it</span>
                  <p className="text-gray-400 text-sm mt-1">{item.fix}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
