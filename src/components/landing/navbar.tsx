"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Resume<span className="text-orange-400">Roast</span></span>
          </Link>

          <Link
            href="/roast"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
          >
            🔥 Start Roasting
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
