"use client";

import { motion } from "framer-motion";
import { Flame, Brain, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Savage Roasts",
    description: "Our AI doesn't sugarcoat anything. Get roasted harder than a Thanksgiving turkey.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Powered by advanced AI that's read more resumes than every recruiter on LinkedIn combined.",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: BarChart3,
    title: "Fun Metrics",
    description: "Get your Corporate NPC Score, Buzzword Density, and Tech Bro Delusion Meter.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Actual Advice",
    description: "Every roast comes with actionable fixes. We break you down, then build you back up.",
    gradient: "from-emerald-500 to-green-600",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How we <span className="text-orange-400">destroy</span> your resume
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A full emotional damage experience, delivered in seconds.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
