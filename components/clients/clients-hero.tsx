"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import BusinessWoman from "@/public/woman-shake.webp";
import BusinessMan from "@/public/man-shake.webp";
import DoubleAngle from "@/public/double-angle.svg";
import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { buttonVariants } from "../ui/button";

const ClientsHero = () => {
  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-16 md:pt-20 lg:pt-24">
      {/* Image Section */}
      <Container className="relative flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 md:gap-0">
        <motion.div
          className="rounded-full z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={BusinessWoman || "/placeholder.svg"}
            alt="business-woman"
            className="rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] object-cover"
          />
        </motion.div>

        <div className="absolute left-0 -top-5 right-0 mx-auto w-full max-w-[833px] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src={DoubleAngle || "/placeholder.svg"}
              alt="double-angle"
              className="object-contain object-center w-full"
            />
          </motion.div>
        </div>

        <motion.div
          className="rounded-full z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={BusinessMan || "/placeholder.svg"}
            alt="business-man"
            className="rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] object-cover"
          />
        </motion.div>
      </Container>

      {/* Text Section */}
      <div className="text-[#FDF5D9]">
        <Container className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-40 py-16 lg:py-24">
          {/* Left side - Heading */}
          <div className="w-full lg:w-auto text-center lg:text-left">
            <AnimatedHeading
              primaryText="Clients &"
              secondaryText="Collaborations"
            />
          </div>

          {/* Right side - Text and Button */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8 text-center lg:text-left">
              From fast-growing startups to established enterprises, our clients
              count on Ancile Inc. to deliver sharp strategy, dependable talent,
              and reliable technology — every step of the way.
            </p>
            <div className="text-center lg:text-left">
              <Link
                href="#contact"
                className={` !rounded-full px-6 ${buttonVariants({
                  variant: "pink",
                })}`}
              >
                Let&apos;s Talk Strategy
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default ClientsHero;
