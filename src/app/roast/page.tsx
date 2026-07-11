"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowLeft, RotateCcw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Dropzone } from "@/components/upload/dropzone";
import { LoadingRoast } from "@/components/shared/loading-roast";
import { ScoreCard } from "@/components/results/score-card";
import { RoastList } from "@/components/results/roast-list";
import { FunMeters } from "@/components/results/fun-meters";
import { MemeReaction } from "@/components/results/meme-reaction";
import { ShareButton } from "@/components/results/share-button";
import { ParticleBg } from "@/components/shared/particle-bg";
import { useRoast } from "@/hooks/use-roast";

export default function RoastPage() {
  const { stage, result, error, submitResume, reset } = useRoast();

  return (
    <main className="relative min-h-screen">
      <ParticleBg />
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b border-white/5 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Resume<span className="text-orange-400">Roast</span></span>
              </Link>
              {stage === 'done' && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Roast Another
                </button>
              )}
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            {/* IDLE STATE — Upload */}
            {stage === 'idle' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-300 text-sm mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Flame className="w-4 h-4" />
                    <span>Time to get roasted</span>
                  </motion.div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    Upload Your Resume
                  </h1>
                  <p className="text-gray-400 text-lg max-w-lg mx-auto">
                    Drop your resume below and prepare for emotional damage. We&apos;ll roast it, score it, and give you actual advice.
                  </p>
                </div>
                <Dropzone onFileSelect={submitResume} />
              </motion.div>
            )}

            {/* LOADING STATE */}
            {(stage === 'uploading' || stage === 'parsing' || stage === 'roasting') && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingRoast stage={stage as 'uploading' | 'parsing' | 'roasting'} />
              </motion.div>
            )}

            {/* ERROR STATE */}
            {stage === 'error' && (
              <motion.div
                key="error"
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              </motion.div>
            )}

            {/* RESULTS STATE */}
            {stage === 'done' && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center">
                  <motion.h1
                    className="text-4xl sm:text-5xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Your Roast is Ready 🔥
                  </motion.h1>
                  <motion.p
                    className="text-gray-400 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    We hope you have thick skin. Here are the results.
                  </motion.p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ScoreCard score={result.overallScore} label="Overall Score" sublabel="How your resume stacks up" delay={0.1} />
                  <ScoreCard score={result.atsScore} label="ATS Score" sublabel="Will the robots like you?" delay={0.2} />
                </div>

                {/* Roast List */}
                <RoastList roasts={result.roasts} />

                {/* Fun Meters & Verdict */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FunMeters result={result} />
                  <MemeReaction result={result} />
                </div>

                {/* Share */}
                <div className="flex justify-center pt-4">
                  <ShareButton result={result} />
                </div>

                {/* Back button */}
                <div className="flex justify-center pt-4 pb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
