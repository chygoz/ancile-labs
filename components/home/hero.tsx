"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/common/animated-heading";
import Container from "@/components/container";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/woman-office.webp"
          alt="Professional workspace"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <motion.div
          className="lg:w-[90%] max-w-7xl bg-[#B30000] text-white p-6 md:p-12 rounded-t-3xl shadow-xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.3,
          }}
          style={{
            maxHeight: "min(70vh, 500px)",
          }}
        >
          <Container>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 text-[#FDF5D9]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="md:w-1/2"
              >
                <AnimatedHeading
                  primaryText="TECHNOLOGY"
                  secondaryText="CONSULTING"
                />
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <motion.p className="text-base sm:text-lg mb-4 md:mb-6">
                  Ancile Inc. empowers your business with smart solutions, fast
                  hires, and modern tools — whether you&apos;re scaling,
                  streamlining tech, or building from scratch.
                </motion.p>

                <Link
                  href="/strategy"
                  className="inline-block bg-[#EFD2DC] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#EFD2DC]/90 transition-colors font-semibold"
                >
                  Let&apos;s Talk Strategy
                </Link>
              </motion.div>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
