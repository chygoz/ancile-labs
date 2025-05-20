"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import SirBlack from "@/public/sir-black.webp";
import WhiteWoman from "@/public/white-woman.webp";
import Moustach from "@/public/moustach.webp";
import Slash from "@/public/slash-vector.svg";
import Container from "@/components/container";

interface TeamMember {
  image: string | StaticImageData;
  alt: string;
  isSlash?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    image: SirBlack,
    alt: "Professional team member in business attire",
  },
  {
    image: Slash,
    alt: "Red diagonal element",
    isSlash: true,
  },
  {
    image: WhiteWoman,
    alt: "Professional team member in business attire",
  },
  {
    image: Moustach,
    alt: "Professional team member in business attire",
  },
];

export default function TeamShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#FDF5D9]">
      <Container className="py-16" as="div">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                className={`relative z-10 ${
                  member.isSlash
                    ? "w-[150px] h-[150px] lg:w-[280px] lg:h-[280px]"
                    : "w-[150px] h-[150px] lg:w-[280px] lg:h-[280px]"
                }`}
              >
                {member.isSlash ? (
                  // For the slash/diagonal element
                  <div className="w-full h-full relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.alt}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  // For team member photos
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
