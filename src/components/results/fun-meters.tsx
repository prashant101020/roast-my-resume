"use client";

import { motion } from "framer-motion";
import { RoastResult } from "@/lib/types";
import { getMeterEmoji } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FunMetersProps {
  result: RoastResult;
}

const meters = [
  { key: 'buzzwordDensity' as const, label: 'Buzzword Density', color: 'from-yellow-500 to-orange-500' },
  { key: 'corporateNpcScore' as const, label: 'Corporate NPC Score', color: 'from-blue-500 to-purple-500' },
  { key: 'mainCharacterIndex' as const, label: 'Main Character Syndrome', color: 'from-pink-500 to-rose-500' },
  { key: 'techBroDelusionMeter' as const, label: 'Tech Bro Delusion Meter', color: 'from-cyan-500 to-blue-500' },
];

export function FunMeters({ result }: FunMetersProps) {
  return (
    <motion.div
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        📊 Vibe Check Metrics
      </h3>

      <div className="space-y-5">
        {meters.map((meter, i) => {
          const value = result[meter.key];
          return (
            <div key={meter.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{meter.label}</span>
                <span className="text-sm font-medium text-white">
                  {getMeterEmoji(value)} {value}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${meter.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* LinkedIn Influencer Badge */}
      {result.linkedInInfluencer && (
        <motion.div
          className="mt-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
            🏆 LinkedIn Influencer Detected
          </Badge>
          <span className="text-blue-300/70 text-xs">This resume reads like a LinkedIn motivational post</span>
        </motion.div>
      )}
    </motion.div>
  );
}
