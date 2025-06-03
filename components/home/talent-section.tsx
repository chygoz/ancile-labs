"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimatedSplitContent } from "@/components/common/animated-split-content";

export default function TalentSection() {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const isButtonsInView = useInView(buttonsRef, { once: true, amount: 0.5 });

  return (
    <section className="w-full bg-[#FDF5D9] overflow-x-hidden">
      <Container className="py-12 lg:py-24">
        <div className="flex flex-col items-center">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mb-16"
          >
            <h2 className="text-lg lg:text-2xl text-[#8A846F]">
              We connect you to pre-vetted tech professionals, globally and
              locally. Our talent outsourcing model is fast, flexible, and
              cost-efficient — so you get the skills you need without the
              overhead.
            </h2>
          </motion.div>

          <div className="relative w-full mb-6">
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative w-full h-[300px] md:h-[437px] rounded-b-[32px] overflow-hidden"
            >
              <Image
                src="/tech-professionals.webp"
                alt="Tech professionals in conversation"
                fill
                className="not-sm:object-left object-cover"
              />
            </motion.div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isImageInView ? { y: 25, opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button variant={"pink"}> Need New Talent?</Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            ref={buttonsRef}
            className="flex flex-col md:flex-row gap-4 md:gap-8 w-full mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isButtonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, staggerChildren: 0.2 }}
          >
            <ServiceButton
              label="DESIGN"
              textColor="text-[#FDF5D9]"
              color="bg-[#A20F0F]"
              delay={0.1}
              isInView={isButtonsInView}
            />
            <ServiceButton
              label="HIRE"
              textColor="text-[#E7ADB2]"
              color="bg-[#330505]"
              delay={0.3}
              isInView={isButtonsInView}
            />
            <ServiceButton
              label="CONSULT"
              textColor="text-[#330505]"
              color="bg-[#E7ADB2]"
              delay={0.5}
              isInView={isButtonsInView}
            />
          </motion.div>

          <div className="pt-12 lg:pt-24">
            <AnimatedSplitContent
              primaryHeading="Let us help with"
              secondaryHeading="what we do best"
              description="At Ancile Inc., we offer a powerful mix of IT consulting, talent solutions, and web application development — designed to help you scale smarter, build faster, and operate with confidence. Whether you're launching a product, expanding your team, or rethinking your tech strategy, we've got you covered."
              linkHref="#contact"
              linkText="Let's Talk Strategy"
              className="text-[#330505]"
              textClassName="text-[#8A846F]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ServiceButtonProps {
  label: string;
  color: string;
  delay: number;
  textColor: string;
  isInView: boolean;
}

function ServiceButton({
  label,
  color,
  delay,
  textColor,
  isInView,
}: ServiceButtonProps) {
  return (
    <motion.button
      className={`${color} font-bold flex-1 text-center ${textColor} 
        rounded-3xl sm:rounded-full
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl
        py-6 px-4 sm:px-6 lg:aspect-[358/179] h-full w-full lg:h-[179px] lg:w-[358px]`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      {label}
    </motion.button>
  );
}
