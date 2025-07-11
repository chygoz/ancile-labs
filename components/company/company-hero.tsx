"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";

export default function CompanyHero() {
  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-24 flex flex-col">
      <div className="text-[#FDF5D9] flex-1">
        <Container className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-40 py-16 lg:py-24 h-full">
          {/* Left side - Heading */}

          <AnimatedHeading primaryText="WHO WE ARE" />

          {/* Right side - Text and Button */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8">
              We&apos;re a team of problem-solvers helping businesses grow
              through smart IT consulting, scalable talent, and modern web
              solutions — all built on trust and real expertise.
            </p>
            <Link
              href="#team"
              className="inline-block bg-[#EFD2DC] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#EFD2DC]/90 transition-colors font-semibold"
            >
              Meet The Team
            </Link>
          </motion.div>
        </Container>

        {/* Image Section - Similar to hero content container */}

        <div className="relative z-10 h-full">
          <motion.div
            className="w-full rounded-t-3xl h-[437px] "
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
                  src="/girl-glasses.webp"
                  alt="Ancile team members"
                  fill
                  className="not-sm:object-left object-cover rounded-t-3xl"
                  priority
                />
              </div>
            </Container>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
