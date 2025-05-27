"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { AnimatedSplit } from "@/components/common/animated-split";

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

      <Container className="relative z-10 h-full flex items-end justify-center">
        {/* Content Container */}
        <motion.div
          className="bg-[#B30000] text-white p-6 md:p-12 rounded-t-3xl shadow-xl"
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
          <AnimatedSplit />
        </motion.div>
      </Container>
    </section>
  );
}
