"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Tej from "@/public/tej-kumar.jpeg";
import SirBlack from "@/public/sir-black.webp";
import WhiteWoman from "@/public/white-woman.webp";
import Moustach from "@/public/moustach.webp";
import AncilWoman1 from "@/public/ancil-woman-3.webp";
import AncilWoman2 from "@/public/ancile-woman-1.webp";
import Dude from "@/public/dude.webp";

import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string | StaticImageData;
}

// Sample team members data - replace with your actual data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Tej Kovelamudi",
    position: "Founder and President",
    company: "Ancile Canada Inc",
    image: Tej,
  },
  {
    id: 2,
    name: "Sarah McAllister",
    position: "Product Lead",
    company: "BrightLayer Tech",
    image: WhiteWoman,
  },
  {
    id: 3,
    name: "Sarah McAllister",
    position: "Product Lead",
    company: "BrightLayer Tech",
    image: Moustach,
  },
  {
    id: 4,
    name: "Sarah McAllister",
    position: "Product Lead",
    company: "BrightLayer Tech",
    image: AncilWoman1,
  },
  {
    id: 5,
    name: "Sarah McAllister",
    position: "Product Lead",
    company: "BrightLayer Tech",
    image: Dude,
  },
  {
    id: 6,
    name: "Sarah McAllister",
    position: "Product Lead",
    company: "BrightLayer Tech",
    image: AncilWoman2,
  },
];

export default function AncileFaces() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="bg-[#FDF5D9] py-16 md:py-24">
      <Container>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-12"
        >
          <div className="mb-12 lg:mb-24">
            <AnimatedHeading primaryText="Meet the faces of Ancile Canada Inc." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="relative w-[280px] h-[280px] rounded-full overflow-hidden mb-4 shadow-md"
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    borderColor: "#f8f0d3",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </motion.div>
                <motion.h3
                  className="text-lg font-bold text-[#3A1C1C]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  className="text-sm text-[#5A3C3C]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  {member.position} at {member.company}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
