"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  primaryText: string;
  secondaryText?: string;
  className?: string;
  textColor?: string;
  primaryDelay?: number;
  secondaryDelay?: number;
  animationDuration?: number;
}

export function AnimatedHeading({
  primaryText,
  secondaryText,
  className,
  primaryDelay = 0.7,
  secondaryDelay = 0.9,
  animationDuration = 0.5,
}: AnimatedHeadingProps) {
  return (
    <h1
      className={cn(
        "text-3xl sm:text-4xl md:text-6xl font-bold mb-0 md:mb-4 tracking-tight",
        className
      )}
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: primaryDelay, duration: animationDuration }}
      >
        {primaryText}
      </motion.span>
      {secondaryText && (
        <>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: secondaryDelay, duration: animationDuration }}
          >
            {secondaryText}
          </motion.span>
        </>
      )}
    </h1>
  );
}
