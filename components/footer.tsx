"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
  const pathname = usePathname();
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const navItems = [
    { name: "Company", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Contact us", href: "#contact" },
    { name: "Privacy policy", href: "/privacy-policy" },
  ];

  // Show scroll button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrollVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#330505] text-white relative">
      {/* Header section with logo and navigation */}
      <div className="border-b border-white/10 py-8">
        <Container className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo.svg"
                alt="Ancile Logo"
                width={50}
                height={50}
                className="mr-3"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white font-bold flex flex-col"
            >
              <span className="text-2xl">Ancile</span>
              <span className="text-sm -mt-1 self-end">Canada</span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-content-center gap-y-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`text-white hover:underline underline-offset-6 hover:text-gray-200 transition-colors font-medium ${
                    pathname === item.href ? "underline" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </Container>
      </div>

      {/* Main content section */}
      <div className="py-12 px-4">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Address */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg text-white">Ancile Canada HQ</h3>
            <div className="text-[#8A846F] text-lg space-y-1">
              <p>3665 Kingsway Suite</p>
              <p>300, Vancouver, BC</p>
              <p>V5R 5W2.</p>
            </div>
          </motion.div>

          {/* Right side - Connect message and social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-white leading-relaxed">
              {
                "Let's stay connected. Whether you're exploring how we can work together or simply want to follow our journey, we're just a message or a click away — and always glad to hear from you."
              }
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Copyright section */}
      <div className="py-6 px-4 bg-[#290303]">
        <div className="container mx-auto text-center">
          <p className="text-sm text-[#8A846F]">
            Copyright © {new Date().getFullYear()} Ancile inc. Designed &
            Developed by Cbayt Studio
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {isScrollVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="absolute bottom-32 lg:bottom-3 right-6 bg-[#FDF5D9] hover:bg-[#FDF5D9]/90 rounded-full p-3 shadow-lg transition-colors group"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5 text-[#330505] group-hover:text-[#A20F0F] transition-colors" />
            <span className="sr-only">Scroll to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
