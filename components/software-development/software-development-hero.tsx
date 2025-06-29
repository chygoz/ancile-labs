"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/get-started-modal";

const SoftwareDevelopmentHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-dvh w-full bg-[#330505] overflow-hidden pt-24">
      {/* Pink design element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/3 right-0 w-2/3 h-40 bg-[#A20F0F] transform skew-y-2 opacity-60"></div>
        </div>
      </div>

      <div className="text-[#FDF5D9] relative z-10">
        <Container className="flex flex-col items-center justify-center gap-8 lg:gap-40 py-16 lg:py-24 text-center">
          <AnimatedHeading
            primaryText="CUSTOM WEB APP"
            secondaryText="DEVELOPMENT"
          />

          <motion.div
            className="w-full max-w-[640px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8 z-10">
              Bring your vision to life with custom web applications that drive
              results. From concept to deployment, we create scalable,
              user-friendly solutions that solve real business problems and grow
              with your success.
            </p>

            <Button variant={"pink"} onClick={() => setIsModalOpen(true)}>
              Start Your Project
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

export default SoftwareDevelopmentHero;
