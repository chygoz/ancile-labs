"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/get-started-modal";
import { AnimatedHeading } from "@/components/common/animated-heading";

const ITConsultingHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-24">
      {/* Background Image */}

      {/* Red design element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-32 bg-[#A20F0F] transform -skew-y-2 opacity-80"></div>
        </div>
      </div>

      <div className="text-[#FDF5D9] relative z-10">
        <Container className="flex flex-col items-center justify-center gap-8 lg:gap-40 py-16 lg:py-24 text-center">
          <AnimatedHeading
            primaryText="IT CONSULTING &"
            secondaryText="CORPORATE TRAININGS"
          />

          <motion.div
            className="w-full max-w-[640px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8 z-10">
              Transform your business with strategic IT guidance and empower
              your team with cutting-edge skills. Our consulting services and
              training programs are designed to accelerate your digital
              transformation journey.
            </p>

            <Button variant={"pink"} onClick={() => setIsModalOpen(true)}>
              Book Consultation
            </Button>
          </motion.div>
        </Container>
      </div>

      <div className="hidden">
        <GetStartedModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </section>
  );
};

export default ITConsultingHero;
