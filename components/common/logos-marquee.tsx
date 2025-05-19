"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Barter from "@/public/barter-logo.svg";
import { Button } from "@/components/ui/button";

const LogosMarquee = () => {
  const companyLogos = [
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
    { name: "Bosch", src: Barter },
  ];

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="bg-[#FDF5D9] overflow-hidden relative py-20 space-y-7">
      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#FDF5D9] to-transparent z-10"></div>

      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#FDF5D9] to-transparent z-10"></div>

      <div className="relative overflow-hidden mb-8">
        <div className="flex whitespace-nowrap animate-marquee-rtl">
          {/* First set of logos */}
          {[...companyLogos, ...companyLogos].map((logo, index) => (
            <div key={index} className="mx-4 md:mx-8 flex items-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.name}
                className="object-contain w-full shrink not-sm:min-w-12"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-4">
        <motion.p
          className="text-[#8A846F] font-medium text-base lg:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={textVariants}
        >
          2000+ businesses across the globe run <br /> on our platform
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, margin: "-50px" }}
          variants={buttonVariants}
        >
          <Button variant={"pink"}>Ready to Begin</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LogosMarquee;
