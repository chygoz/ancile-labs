"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import RedSquish from "@/public/red-squish.svg";
import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { buttonVariants } from "../ui/button";

const ServicesHero = () => {
  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={RedSquish}
          alt="red-line"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="text-[#FDF5D9] relative z-10">
        <Container className="flex flex-col items-center justify-center gap-8 lg:gap-40 py-16 lg:py-24 text-center">
          <AnimatedHeading primaryText="SERVICES WE OFFER" />

          {/* Right side - Text and Button */}
          <motion.div
            className="w-full max-w-[640px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8 z-10">
              Whether you&apos;re launching a product, scaling your team, or
              modernizing your tech, Ancile Inc. offers tailored solutions that
              move you forward — faster, smarter, and with less stress.
            </p>
            <Link
              href="#contact"
              className={` !rounded-full px-6 ${buttonVariants({
                variant: "pink",
              })}`}
            >
              Book Consultation
            </Link>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default ServicesHero;
