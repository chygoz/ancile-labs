"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const headings = [
  { primary: "TECHNOLOGY", secondary: "CONSULTING" },
  { primary: "TALENT", secondary: "SOLUTIONS" },
  { primary: "SOFTWARE", secondary: "DEVELOPMENT" },
];

export function AnimatedSplit() {
  const ref = useRef(null);
  const [currentHeading, setCurrentHeading] = useState(0);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 text-[#FDF5D9]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="md:w-1/2 w-full"
      >
        <div className="relative h-24 sm:h-32 md:h-40 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeading}
              initial={{ opacity: 0, y: 30, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 45 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                rotateX: { duration: 0.6 },
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {headings[currentHeading].primary}
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {headings[currentHeading].secondary}
                </motion.span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="md:w-1/2 w-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <motion.p className="text-base sm:text-lg mb-4 md:mb-6 font-medium">
          Ancile Inc. empowers your business with smart solutions, fast hires,
          and modern tools — whether you&apos;re scaling, streamlining tech, or
          building from scratch.
        </motion.p>

        <Link
          href="/strategy"
          className={cn(
            "inline-block lg:h-12 rounded-full transition-colors font-semibold",
            buttonVariants({ variant: "pink" })
          )}
        >
          Let&apos;s Talk Strategy
        </Link>
      </motion.div>
    </div>
  );
}
