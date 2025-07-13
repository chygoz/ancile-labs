"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";

const CareersHero = () => {
  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-24 flex flex-col">
      <div className="text-[#FDF5D9] flex-1">
        <Container className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-30 py-16 lg:py-24 h-full">
          {/* Left side - Heading */}
          <AnimatedHeading primaryText="JOIN OUR TEAM" />

          {/* Right side - Text and Button */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8">
              Help businesses grow through smart IT consulting, scalable talent,
              and modern software solutions. Build your career with a team that
              values innovation, expertise, and real impact.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Image Section - Team/Office workspace */}
      <div className="relative z-10">
        <motion.div
          className="w-full rounded-t-3xl h-[437px]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Container>
            <div className="relative w-full h-[437px] rounded-t-3xl">
              <Image
                src="/hiring.webp"
                alt="Ancile team collaboration workspace"
                fill
                className="object-cover rounded-t-3xl"
                priority
              />
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersHero;
