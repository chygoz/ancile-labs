"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ThumbsUo from "@/public/thumbs.webp";

export default function Approval() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full pt-12 lg:pt-24 overflow-hidden  bg-[#FDF5D9]"
    >
      <div className="relative w-full">
        <motion.div
          initial={{ scale: 1.05, opacity: 0.9 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0.9 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="aspect-auto w-full h-[452px] relative"
        >
          <Image
            src={ThumbsUo}
            alt="BreathingAssitance treatment"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
