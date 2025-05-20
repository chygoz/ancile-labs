"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Container from "@/components/container";

const services = [
  "Infrastructure strategy",
  "Tech roadmapping",
  "IT staffing",
  "Talent outsourcing",
  "Web app design & dev",
  "Scalable architecture",
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#330505] overflow-hidden">
      <Container className="flex flex-col md:flex-row relative py-20">
        {/* Left side - Services list */}
        <div className="w-full md:w-1/2 py-16">
          <div className="h-full flex items-center">
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <ul className="space-y-6 text-2xl lg:text-4xl">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={
                      index === 0 ? "text-[#FDF5D9] mb-8" : "text-[#FDF5D980]"
                    }
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right side - Shield with maple leaf mask */}
        <div className="w-full md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0 md:h-full">
          <div className="h-full w-[100vw] bg-[#A20F0F] py-16 flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative w-full max-w-md aspect-[4/5] sm:ml-8 lg:ml-40"
            >
              {/* Shield outline */}
              <div className="absolute inset-0 z-10">
                <Image
                  src="/shield-outline.webp"
                  alt="Shield outline"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
