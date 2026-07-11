"use client";

import { motion } from "framer-motion";

export function ParticleBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-violet-500/15 blur-[100px]"
        animate={{
          x: [0, 40, -10, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-orange-500/10 blur-[80px]"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
