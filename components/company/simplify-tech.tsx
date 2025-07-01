"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/common/animated-heading";
import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

const features = [
  { text: "Our solutions are tailored." },
  { text: "A hybrid of strategy and execution." },
  { text: "We believe in collaboration." },
];

const SimplifyTech = () => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div className=" bg-[#FDF5D9]">
      <Container className="grid md:grid-cols-2 py-12 md:py-24  gap-12 lg:gap-24">
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-start gap-4 md:gap-8 text-[#FDF5D9]"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <AnimatedHeading
              primaryText="Tech should simplify,"
              secondaryText="not complicate."
              className="text-[#330505]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <motion.p className="text-base sm:text-lg mb-4 md:mb-6 font-medium text-[#8A846F]">
              That’s why everything we do is rooted in clarity, speed, and
              sustainability. Whether we’re helping a startup build their MVP or
              guiding a large firm through digital transformation, our goal is
              the same: make tech work for people, not the other way around.
            </motion.p>

            <Link
              href={"/services"}
              className={cn(
                "inline-block lg:h-12 rounded-full transition-colors font-semibold",
                buttonVariants({ variant: "pink" })
              )}
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <motion.div
            className={cn("grid gap-6 grid-cols-1 lg:grid-cols-2 sm:gap-8")}
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
    </div>
  );
};

export default SimplifyTech;

interface FeatureItem {
  text: string;
}

interface FeatureItemProps {
  feature: FeatureItem;
  index: number;
  isInView: boolean;
}

function FeatureItem({ feature, index, isInView }: FeatureItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="flex lg:flex-col items-start gap-3"
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
        className="text-lg font-medium text-[#8A846F] max-w-[282px]"
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
