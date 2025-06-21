"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Container from "@/components/container";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title: string;
  steps: ProcessStep[];
}

const ProcessSection = ({ title, steps }: ProcessSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="bg-[#330505] py-16 lg:py-24">
      <Container>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl lg:text-4xl font-bold text-[#FDF5D9] text-center mb-16"
          >
            {title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-[#A20F0F] rounded-full flex items-center justify-center">
                  <span className="text-[#FDF5D9] text-xl font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#FDF5D9]">
                  {step.title}
                </h3>
                <p className="text-[#FDF5D9]/80 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProcessSection;
