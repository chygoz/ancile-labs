"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import BreathingAssistanceImage from "@/public/images/breathing-assistance.webp";

export default function BreathingAssistance() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section ref={sectionRef} className="w-full overflow-hidden">
      <div className="relative w-full">
        <motion.div
          initial={{ scale: 1.05, opacity: 0.9 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0.9 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="aspect-video w-full relative"
        >
          <Image
            src={BreathingAssistanceImage}
            alt="BreathingAssitance treatment"
            fill
            className="object-cover"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#9EAD77",
              mixBlendMode: "color",
              opacity: 0.9,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
