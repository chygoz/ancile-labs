"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedHeading } from "./animated-heading";

interface AnimatedSplitContentProps {
  primaryHeading: string;
  secondaryHeading?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  linkVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "pink";
  className?: string;
  headingClassName?: string;
  textClassName?: string;
}

export function AnimatedSplitContent({
  primaryHeading = "TECHNOLOGY",
  secondaryHeading,
  description,
  linkText,
  linkHref,
  linkVariant = "pink",
  className = "",
  headingClassName = "",
  textClassName = "",
}: AnimatedSplitContentProps) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 text-[#FDF5D9]",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className={cn("md:w-1/2", headingClassName)}
      >
        <AnimatedHeading
          primaryText={primaryHeading}
          secondaryText={secondaryHeading}
        />
      </motion.div>

      <motion.div
        className={cn("md:w-1/2", textClassName)}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        {description && (
          <motion.p className="text-base sm:text-lg mb-4 md:mb-6 font-medium">
            {description}
          </motion.p>
        )}

        {linkText && linkHref && (
          <Link
            href={linkHref}
            className={cn(
              "inline-block lg:h-12 rounded-full transition-colors font-semibold",
              buttonVariants({ variant: linkVariant as any })
            )}
          >
            {linkText}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
