"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import Container from "@/components/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  title: string;
  description: string;
  backgroundColor: string;
}

interface ServiceDetailsSectionProps {
  title: string;
  description: string;
  services: Service[];
  image?: string;
}

const ServiceDetailsSection = ({
  title,
  description,
  services,
  image,
}: ServiceDetailsSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="bg-[#FDF5D9] py-16 lg:py-24">
      <Container>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
              <Image
                src={image ?? "placeholder.svg"}
                alt="Service illustration"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#330505]">
              {title}
            </h2>
            <p className="text-lg text-[#8A846F] leading-relaxed">
              {description}
            </p>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className={cn(
                "border-none shadow-lg rounded-none",
                index === 0 && "rounded-bl-4xl",
                index === 2 && "rounded-br-4xl"
              )}
              style={{
                backgroundColor: service.backgroundColor,
              }}
            >
              <CardHeader>
                <CardTitle className="text-[#FDF5D9] text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default ServiceDetailsSection;
