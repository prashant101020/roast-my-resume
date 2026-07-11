"use client";

import { Flame } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm text-gray-400">
            Resume<span className="text-orange-400">Roast</span> — Built for emotional damage
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="/roast" className="hover:text-white transition-colors">
            Get Roasted
          </Link>
          <span>Made with 🔥 and zero empathy</span>
        </div>
      </div>
    </footer>
  );
}
