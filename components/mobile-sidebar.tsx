"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import GetStartedModal from "./get-started-modal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  name: string;
  href: string;
}

interface ServiceItem {
  title: string;
  href: string;
  description: string;
}

interface MobileSidebarProps {
  navItems: NavItem[];
  serviceItems: ServiceItem[];
}

export default function MobileSidebar({
  navItems,
  serviceItems,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
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
              <nav className="flex flex-col space-y-2 px-5">
                {/* Company Link */}
                <Link
                  href="/company"
                  className={`text-white hover:text-[#EFD2DC] transition-colors py-2 ${
                    pathname === "/company"
                      ? "font-medium border-l-2 border-[#EFD2DC] pl-2"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Company
                </Link>

                {/* Services Collapsible */}
                <Collapsible
                  open={isServicesOpen}
                  onOpenChange={setIsServicesOpen}
                >
                  <div className="space-y-2">
                    {/* Services Main Link */}
                    <div className="flex items-center justify-between">
                      <Link
                        href="/services"
                        className={`text-white hover:text-[#EFD2DC] transition-colors py-2 flex-1 ${
                          pathname === "/services"
                            ? "font-medium border-l-2 border-[#EFD2DC] pl-2"
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        Services
                      </Link>
                      <CollapsibleTrigger className="text-white hover:text-[#EFD2DC] transition-colors p-1 cursor-pointer">
                        {isServicesOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </CollapsibleTrigger>
                    </div>

                    {/* Services Submenu */}
                    <CollapsibleContent className="space-y-1">
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-3 border-l border-[#4a0a0a] pl-4"
                          >
                            {serviceItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`block text-white/90 hover:text-[#EFD2DC] transition-colors ${
                                  pathname === item.href
                                    ? "font-medium text-[#EFD2DC]"
                                    : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="text-sm font-medium">
                                  {item.title}
                                </div>
                                <div className="text-xs text-white/70 mt-1 line-clamp-2">
                                  {item.description}
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Other Navigation Items */}
                {navItems.slice(1).map((item) => (
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
