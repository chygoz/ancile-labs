"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import Container from "@/components/container";
import { CheckIcon } from "@/components/icons";

export interface FeatureItem {
  text: string;
}

interface FeaturesGridProps {
  features: FeatureItem[];
  backgroundColor?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function FeaturesGrid({
  features,
  backgroundColor = "#FDF5D9",
  columns = 4,
  className,
}: FeaturesGridProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section style={{ backgroundColor }} className={cn("", className)}>
      <Container>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <motion.div
            className={cn(
              "grid gap-6 sm:gap-8",
              columns === 2 && "grid-cols-1 sm:grid-cols-2",
              columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
              columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                feature={feature}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

interface FeatureItemProps {
  feature: FeatureItem;
  index: number;
  isInView: boolean;
}

function FeatureItem({ feature, index, isInView }: FeatureItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
    >
      <motion.div
        className="flex-shrink-0 rounded-[14px] p-2 flex items-center justify-center bg-[#E7ADB2] size-[50px]"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <CheckIcon className="text-black" />
      </motion.div>
      <motion.span
        className="text-lg font-medium text-[#8A846F]"
        animate={{
          fontWeight: isHovered ? 600 : 500,
        }}
        transition={{ duration: 0.2 }}
      >
        {feature.text}
      </motion.span>
    </motion.div>
  );
}
