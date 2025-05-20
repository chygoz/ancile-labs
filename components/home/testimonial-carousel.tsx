"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import Barter from "@/public/barter-logo.svg";
import Container from "@/components/container";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  logo: string | StaticImageData;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We needed to quickly scale our dev team for a tight product deadline, and Ancile delivered. The engineers they brought on were not only skilled but blended seamlessly with our in-house team. It felt more like a partnership than outsourcing.",
    author: "Sarah McAllister",
    position: "Product Lead at",
    company: "BrightLayer Tech",
    logo: Barter,
  },
  {
    quote:
      "Ancile helped us transform our digital presence with expert developers who understood our vision from day one. Their team integrated perfectly with ours, delivering exceptional results ahead of schedule.",
    author: "Michael Chen",
    position: "CTO at",
    company: "Nexus Innovations",
    logo: Barter,
  },
  {
    quote:
      "Finding qualified developers was our biggest challenge until we partnered with Ancile. Their talent pool is exceptional, and their onboarding process meant our new team members were productive from week one.",
    author: "Jessica Rivera",
    position: "Engineering Director at",
    company: "Quantum Solutions",
    logo: Barter,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-[#F7ECC7] overflow-hidden">
      <Container className="py-16" as="div">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative not-sm:px-12"
        >
          {/* Fixed height wrapper for the entire testimonial content */}
          <div className="flex flex-col items-center text-center h-full lg:h-[350px] justify-between">
            {/* Logo section with fixed height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-16 flex items-center"
            >
              <Image
                src={currentTestimonial.logo || "/placeholder.svg"}
                alt="Company logo"
                className="h-10 mx-auto"
              />
            </motion.div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center py-10 justify-center lg:max-h-[180px]"
            >
              <p className="text-[#8A846F] text-lg lg:text-2xl leading-relaxed max-w-3xl">
                {currentTestimonial.quote}
              </p>
            </motion.div>

            <motion.div
              key={`author-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-24 flex flex-col justify-center"
            >
              <p className="font-bold text-lg xl:text-xl text-[#330505]">
                {currentTestimonial.author}
              </p>
              <p className="text-[#8A846F] font-medium">
                {currentTestimonial.position} {currentTestimonial.company}
              </p>
            </motion.div>
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-between w-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-dashed border-[#330505B2] flex items-center justify-center bg-transparent text-[#330505] hover:bg-[#F7ECC7]/80 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-dashed border-[#330505B2] flex items-center justify-center bg-transparent text-[#330505] hover:bg-[#F7ECC7]/80 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
