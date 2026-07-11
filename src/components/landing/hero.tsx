"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Zap } from "lucide-react";
import { GradientText } from "@/components/shared/gradient-text";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-300 text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI that has zero empathy</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Upload your resume.
          <br />
          <GradientText className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
            Get emotionally damaged.
          </GradientText>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our AI recruiter has reviewed 10 million resumes and has lost all hope in humanity.
          Now it&apos;s your turn. Get a{" "}
          <span className="text-orange-400 font-medium">savage, hilarious, brutally honest</span>{" "}
          roast — plus actual career advice that might save you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/roast"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
          >
            <Flame className="w-5 h-5" />
            Roast My Resume
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <span className="text-gray-500 text-sm">Free • No login required • Instant results</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-16 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span><span className="text-white font-medium">10,000+</span> resumes roasted</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="hidden sm:flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span><span className="text-white font-medium">4.9/5</span> emotional damage rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
