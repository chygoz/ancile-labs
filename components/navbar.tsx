"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/container";
import MobileSidebar from "@/components/mobile-sidebar";
import GetStartedModal from "@/components/get-started-modal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Company", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Contact us", href: "#contact" },
    { name: "Careers", href: "https://career.ancilecanadainc.com" },
  ];

  return (
    <header
      className={`h-[106px] fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#330505]/95 shadow-md" : "bg-[#330505]"
      }`}
    >
      <Container className="py-5 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Sidebar */}
          <div className="md:hidden mr-4">
            <MobileSidebar navItems={navItems} />
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo.png"
                alt="Ancile Logo"
                width={62}
                height={62}
                className="mr-2"
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
        </div>

        <nav className="hidden md:flex items-center space-x-8">
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

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="hidden md:block"
        >
          <GetStartedModal />
        </motion.div>
      </Container>
    </header>
  );
}
