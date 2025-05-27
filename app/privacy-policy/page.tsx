"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";

export default function PrivacyPolicy() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us.",
        "We automatically collect certain information about your device when you access our services, including your IP address, browser type, and usage patterns.",
        "We may collect information from third parties, such as business partners and service providers.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services",
        "To process transactions and send related information",
        "To send you technical notices, updates, and support messages",
        "To respond to your comments, questions, and customer service requests",
        "To communicate with you about products, services, and events",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
        "We may share information with trusted service providers who assist us in operating our website and conducting our business.",
        "We may disclose information when required by law or to protect our rights and safety.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "We use industry-standard encryption and security protocols.",
        "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You may opt out of receiving promotional communications from us.",
        "You can request a copy of the personal information we hold about you.",
        "You may request that we correct any inaccurate information.",
      ],
    },
    {
      title: "Cookies and Tracking",
      content: [
        "You can control cookie settings through your browser preferences.",
        "Some features of our service may not function properly if cookies are disabled.",
      ],
    },
  ];

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Individual section variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#330505] text-white overflow-hidden">
        <Container className="py-20" as="div">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <AnimatedHeading
                primaryText="Privacy Policy"
                className="text-[#FDF5D9] mb-6"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-[#FDF5D9] max-w-2xl mx-auto mb-8"
            >
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-white/60">Last updated: January 2025</p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="bg-[#FDF5D9] overflow-hidden">
        <Container className="py-16" as="div">
          <div className="max-w-3xl">
            {/* Introduction */}
            <motion.div
              ref={introRef}
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#330505] mb-6">
                Our Commitment to Privacy
              </h2>
              <p className="text-[#8A846F] text-lg leading-relaxed">
                At Ancile Canada Inc., we are committed to protecting your
                privacy and ensuring the security of your personal information.
                This Privacy Policy outlines how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                services.
              </p>
            </motion.div>

            {/* Policy Sections */}
            <motion.div
              ref={contentRef}
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="space-y-12"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={sectionVariants}
                  className="bg-white/50 rounded-2xl p-4 lg:p-8 backdrop-blur-sm"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#330505] mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={contentInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + itemIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className="text-[#8A846F] leading-relaxed flex items-start"
                      >
                        <span className="w-2 h-2 bg-[#330505] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Additional Information */}
              <motion.div
                variants={sectionVariants}
                className="bg-white/50 rounded-2xl p-4 lg:p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[#330505] mb-4">
                  Changes to This Policy
                </h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={contentInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-[#8A846F] leading-relaxed mb-4"
                >
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last updated&quot; date.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={contentInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-[#8A846F] leading-relaxed"
                >
                  Your continued use of our services after any modifications to
                  this Privacy Policy will constitute your acknowledgment of the
                  modifications and your consent to abide by the modified
                  Privacy Policy.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
