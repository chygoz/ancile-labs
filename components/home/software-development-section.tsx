"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Container from "@/components/container";
import { Button } from "../ui/button";

export default function SoftwareDevelopmentSection() {
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left lg:pr-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#330505] mb-4">
              We Develop
            </h2>
            <p className="text-[#8A846F]">
              Modern web applications tailored to <br /> your business goals.
            </p>
          </motion.div>

          {/* Center Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="relative aspect-[478/437] w-full rounded-3xl overflow-hidden">
              <Image
                src="/software.webp"
                alt="Software application interface"
                fill
                className="object-cover"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
              >
                <Button variant={"pink"}>Start Your Project</Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center lg:text-left lg:pl-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#330505] mb-4">
              Software
            </h2>
            <p className="text-[#8A846F]">
              Web apps that aren't just Pretty — they <br /> perform.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
