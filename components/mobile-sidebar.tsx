"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import GetStartedModal from "./get-started-modal";

interface NavItem {
  name: string;
  href: string;
}

export default function MobileSidebar({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-white focus:outline-none cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-[#330505] z-50 md:hidden flex flex-col"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-5 border-b border-[#4a0a0a]">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/logo.png"
                  alt="Ancile Logo"
                  width={62}
                  height={62}
                  className="mr-2"
                />
                <div className="text-white font-bold flex flex-col">
                  <span className="text-xl">Ancile</span>
                  <span className="text-xs -mt-1 self-end">Canada</span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white focus:outline-none hover:text-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col space-y-4 px-5">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-white hover:text-[#EFD2DC] transition-colors py-2 ${
                      pathname === item.href
                        ? "font-medium border-l-2 border-[#EFD2DC] pl-2"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Sidebar footer */}
            <div className="p-5 border-t border-[#4a0a0a]">
              <GetStartedModal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
