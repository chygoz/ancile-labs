"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ScrollToTop from "./common/scroll-to-top";

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { name: "Company", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Contact us", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#330505] text-white py-8 px-4 relative">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
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

        <nav className="flex mb-10 flex-wrap items-center justify-center gap-x-8 gap-y-4">
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

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-[#8A846F]">
          Copyright © {new Date().getFullYear()} Ancile Inc. Designed &
          Developed by Cbayt Studio
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
