"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, FileText, Brain, Zap } from "lucide-react";

const LOADING_MESSAGES = [
  { text: "Reading your resume... trying not to laugh 😂", icon: FileText },
  { text: "Counting buzzwords... we might be here a while 📊", icon: FileText },
  { text: "Consulting with HR... they said 'lol' 💀", icon: Brain },
  { text: "Warming up the roast oven... 🔥", icon: Flame },
  { text: "Preparing emotional damage... 🫡", icon: Zap },
  { text: "Analyzing your 'leadership skills'... sure, Jan 😏", icon: Brain },
  { text: "Cross-referencing with 10 million other resumes... yours is... unique 🫠", icon: FileText },
  { text: "Our AI just sighed heavily... 😮‍💨", icon: Brain },
  { text: "Running ATS simulation... it didn't go well 📉", icon: Zap },
  { text: "Almost done... the roast is reaching critical temperatures 🌡️", icon: Flame },
];

interface LoadingRoastProps {
  stage?: 'uploading' | 'parsing' | 'roasting';
}

export function LoadingRoast({ stage = 'roasting' }: LoadingRoastProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = LOADING_MESSAGES[messageIndex];
  const Icon = current.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated fire icon */}
      <motion.div
        className="relative mb-8"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center fire-glow">
          <Flame className="w-12 h-12 text-white" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Stage indicator */}
      <div className="flex items-center gap-2 mb-6">
        {['uploading', 'parsing', 'roasting'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              s === stage ? 'bg-orange-500 shadow-lg shadow-orange-500/50' :
              ['uploading', 'parsing', 'roasting'].indexOf(stage) > i ? 'bg-green-500' : 'bg-white/10'
            }`} />
            {i < 2 && <div className="w-8 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      {/* Rotating messages */}
      <div className="h-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            className="flex items-center gap-2 text-gray-300 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-orange-400" />
            <span>{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <motion.div className="w-64 h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      </motion.div>
    </motion.div>
  );
}
