"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Rogers from "@/public/rogers.svg";
import RBC from "@/public/rbc.svg";
import Dollarama from "@/public/dollarama.svg";
import CIBC from "@/public/cibc.svg";
import BMO from "@/public/bmo.svg";
import Fido from "@/public/fido.svg";
import Telus from "@/public/telus.svg";
import Manulife from "@/public/manulife.svg";
import Scotia from "@/public/scotia.svg";
import Imperial from "@/public/imperial.svg";
import Sunlife from "@/public/sunlife.svg";
import RB from "@/public/rb.svg";
import Freshslice from "@/public/freshslice.svg";
import Delta from "@/public/delta.svg";

import { Button } from "@/components/ui/button";

interface LogosMarqueeProps {
  animated?: boolean;
}

const LogosMarquee = ({ animated = true }: LogosMarqueeProps) => {
  const companyLogos = [
    { name: "Rogers", src: Rogers },
    { name: "RBC", src: RBC },
    { name: "Dollarama", src: Dollarama },
    { name: "CIBC", src: CIBC },
    { name: "BMO", src: BMO },
    { name: "Fido", src: Fido },
    { name: "Telus", src: Telus },
    { name: "Manulife", src: Manulife },
    { name: "Scotiabank", src: Scotia },
    { name: "Imperial", src: Imperial },
    { name: "Sunlife", src: Sunlife },
    { name: "RB", src: RB },
    { name: "Freshslice", src: Freshslice },
    { name: "Delta", src: Delta },
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
    <section
      className={`bg-[#FDF5D9] overflow-hidden relative space-y-7 ${
        !animated
          ? "min-h-[400px] flex flex-col items-center justify-center"
          : ""
      }`}
    >
      <div className="relative overflow-hidden mb-8">
        {/* Only show gradient overlays when animated */}
        {animated && (
          <>
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#FDF5D9] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#FDF5D9] to-transparent z-10"></div>
          </>
        )}

        <div className="relative overflow-hidden mb-4">
          {animated ? (
            // Animated marquee version
            <div className="flex whitespace-nowrap animate-marquee-rtl">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div
                  key={index}
                  className="mx-4 md:mx-8 flex items-center w-[162px] h-[62px]"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    className="object-contain w-[182px] h-[62px]"
                    width={182}
                    height={62}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Static version - single row, centered
            <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 px-4">
              {companyLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center w-[120px] h-[50px] md:w-[140px] md:h-[60px]"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    className="object-contain w-full h-full"
                    width={140}
                    height={60}
                  />
                </div>
              ))}
            </div>
          )}
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
          <Button variant={"pink"} className="h-12">
            Ready to Begin
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LogosMarquee;
