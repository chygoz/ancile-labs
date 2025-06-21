"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/get-started-modal";
import { AnimatedHeading } from "@/components/common/animated-heading";

const TalentSolutionsHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full bg-[#330505] overflow-hidden pt-24">
      <div className="text-[#FDF5D9] relative z-10">
        <Container className="flex flex-col items-center justify-center gap-8 lg:gap-40 py-16 lg:py-24 text-center">
          <AnimatedHeading
            primaryText="SCALABLE TALENT"
            secondaryText="SOLUTIONS"
          />

          <motion.div
            className="w-full max-w-[640px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg mb-8 z-10">
              Scale your team with confidence. Our talent solutions connect you
              with skilled professionals who integrate seamlessly into your
              organization and contribute from day one. From contract staffing
              to permanent placements, we&apos;ve got your talent needs covered.
            </p>

            <Button variant={"pink"} onClick={() => setIsModalOpen(true)}>
              Find Talent
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

export default TalentSolutionsHero;
