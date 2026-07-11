"use client";

import { motion } from "framer-motion";
import { Flame, AlertTriangle, Lightbulb } from "lucide-react";

const examples = [
  {
    title: "Buzzword Overload",
    roast: "Your resume says 'passionate' 6 times. Passionate about what? Surviving HR filters?",
    problem: "Buzzwords reduce credibility and make you sound like every other applicant.",
    fix: "Replace vague claims with measurable impact. 'Increased user engagement by 40%' hits different.",
  },
  {
    title: "The Jack of All Trades",
    roast: "Bro listed 47 programming languages. You don't know 47 languages — your Google search history does.",
    problem: "Listing too many skills signals that you're a master of none.",
    fix: "Focus on 8-12 skills you can actually defend in an interview. Quality over quantity.",
  },
  {
    title: "Main Character Syndrome",
    roast: "'Single-handedly scaled the company to 10M users.' Sure you did. And I'm the CEO of Google.",
    problem: "Exaggerated claims are easily fact-checked and destroy trust instantly.",
    fix: "Use team-oriented language: 'Led a team of 5 that shipped features increasing DAU by 30%.'",
  },
];

export function RoastExamples() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Sample <span className="text-orange-400">Roasts</span> 🔥
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Here&apos;s a taste of what our AI has to say. Viewer discretion advised.
          </p>
        </motion.div>

        <div className="space-y-6">
          {examples.map((example, i) => (
            <motion.div
              key={example.title}
              className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-600" />

              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{example.title}</h3>
              </div>

              <p className="text-orange-300 text-base mb-4 pl-11 italic">&ldquo;{example.roast}&rdquo;</p>

              <div className="grid sm:grid-cols-2 gap-4 pl-11">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-red-400 font-medium uppercase tracking-wide">Problem</span>
                    <p className="text-gray-400 text-sm mt-1">{example.problem}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-emerald-400 font-medium uppercase tracking-wide">Fix</span>
                    <p className="text-gray-400 text-sm mt-1">{example.fix}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
