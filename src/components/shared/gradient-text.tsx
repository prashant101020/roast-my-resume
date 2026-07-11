"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className, animate = false }: GradientTextProps) {
  const Component = animate ? motion.span : 'span';
  return (
    <Component
      className={cn("gradient-text", className)}
      {...(animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
      } : {})}
    >
      {children}
    </Component>
  );
}
