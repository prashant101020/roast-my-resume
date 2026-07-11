"use client";

import { RoastCard } from "./roast-card";
import { RoastItem } from "@/lib/types";
import { motion } from "framer-motion";

interface RoastListProps {
  roasts: RoastItem[];
}

export function RoastList({ roasts }: RoastListProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        🔥 The Roast
      </h2>
      <div className="space-y-3">
        {roasts.map((roast, index) => (
          <RoastCard key={index} item={roast} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
