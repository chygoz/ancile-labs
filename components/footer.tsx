"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
  const pathname = usePathname();
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const navItems = [
    { name: "Company", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Careers", href: "/careers" },
    { name: "Contact us", href: "#contact" },
  ];

  const locations = [
    {
      name: "Canada",
      address: "3665 Kingsway,\n Suite 300\nVancouver, BC\n V5R 5W2",
      email: "Info@ancilecanadainc.com",
    },
    {
      name: "USA",
      address: "1850 Del Paso Rd, Ste# 3\nSacramento, CA 95834",
      email: "Info@ancilecanadainc.com",
    },
    {
      name: "India",
      address: "4-60, R Number C5\nChodavaram, Andhra Pradesh\n India-521139",
      email: "Info@ancilecanadainc.com",
    },
  ];

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
                src="/logo.png"
                alt="Ancile Logo"
                width={42}
                height={42}
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
          {/* Left side - Locations with tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-white" />
              <h3 className="text-lg text-white">Our Locations</h3>
            </div>
            {/* Location tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {locations.map((location, index) => (
                <button
                  key={location.name}
                  onClick={() => setSelectedLocation(index)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                    selectedLocation === index
                      ? "bg-white text-[#330505]"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
            {/* Selected location address and email */}
            <motion.div
              key={selectedLocation}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#8A846F] text-lg"
            >
              <p className="whitespace-pre-line">
                {locations[selectedLocation].address}
              </p>
              {locations[selectedLocation].email && (
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${locations[selectedLocation].email}`}
                    className="text-white hover:underline"
                  >
                    {locations[selectedLocation].email}
                  </a>
                </p>
              )}
            </motion.div>
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
            <Link
              href={"/privacy-policy"}
              className={`text-white hover:underline underline-offset-6 hover:text-gray-200 transition-colors font-medium ${
                pathname === "/privacy-policy" ? "underline" : ""
              }`}
            >
              Privacy policy
            </Link>
          </motion.div>
        </Container>
      </div>
      {/* Copyright section */}
      <div className="py-6 px-4 bg-[#290303]">
        <div className="container mx-auto text-center">
          <p className="text-sm text-[#8A846F]">
            Copyright © {new Date().getFullYear()} Ancile Canada Inc. Designed &
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
