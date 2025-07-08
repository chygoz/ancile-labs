"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import WomanExpert from "@/public/woman-expert.webp";
import ManExpert from "@/public/man-expert.webp";
import MoustacheExpert from "@/public/moustache-expert.webp";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import GetStartedModal from "@/components/get-started-modal";

const ExpertiseShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const expertiseAreas = [
    {
      imageSrc: WomanExpert,
      imageAlt: "Professional in business attire",
      title: "IT Consulting & Corporate Trainings",
      buttonText: "Book Consultation",
      backgroundColor: "#A20F0F", // deep red
      serviceType: "tech-consulting",
    },
    {
      imageSrc: MoustacheExpert,
      imageAlt: "Professional in white shirt",
      title: "Scalable Talent Solutions",
      buttonText: "Need New Talent?",
      backgroundColor: "#330505", // dark burgundy
      serviceType: "talents-solution",
    },
    {
      imageSrc: ManExpert,
      imageAlt: "Professional in light blazer",
      title: "Custom Web App Development",
      buttonText: "Start Your Project",
      backgroundColor: "#E7ADB2", // pink
      serviceType: "software-development",
    },
  ];

  const handleExpertiseClick = (serviceType: string) => {
    setSelectedService(serviceType);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="bg-[#FDF5D9] py-12 sm:py-24">
        <Container className="overflow-hidden">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-3xl lg:rounded-[70px] overflow-hidden"
            style={{ backgroundColor: "#FDF5D9" }}
          >
            {expertiseAreas.map((expertise, index) => (
              <ExpertiseCard
                key={index}
                expertise={expertise}
                index={index}
                isInView={isInView}
                onButtonClick={() =>
                  handleExpertiseClick(expertise.serviceType)
                }
              />
            ))}
          </motion.div>
        </Container>
      </section>

      <div className="hidden">
        <GetStartedModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          defaultService={selectedService}
        />
      </div>
    </>
  );
};

interface ExpertiseCardProps {
  expertise: {
    imageSrc: string | StaticImageData;
    imageAlt: string;
    title: string;
    buttonText: string;
    backgroundColor: string;
    serviceType: string;
  };
  index: number;
  isInView: boolean;
  onButtonClick: () => void;
}

const ExpertiseCard = ({
  expertise,
  index,
  isInView,
  onButtonClick,
}: ExpertiseCardProps) => {
  const ref = useRef(null);
  const cardInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col overflow-hidden h-full gap-5"
    >
      <div className="relative w-full overflow-hidden">
        <div className="aspect-[467/372]">
          <Image
            src={expertise.imageSrc || "/placeholder.svg"}
            alt={expertise.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
      <div
        className="flex flex-col p-8 w-full"
        style={{
          backgroundColor: expertise.backgroundColor,
          minHeight: "240px",
        }}
      >
        <motion.h3
          className="text-[#FDF5D9] text-2xl sm:text-3xl font-bold mb-auto text-start"
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {expertise.title}
        </motion.h3>
        <motion.div
          className="transition-colors duration-200 mt-8 flex justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            cardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant={"pink"}
            className="hover:translate-y-[-3px] active:scale-[0.98] transition-transform rounded-full px-6"
            onClick={onButtonClick}
          >
            {expertise.buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExpertiseShowcase;
