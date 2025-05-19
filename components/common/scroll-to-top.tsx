"use client";

import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button after scrolling down 300px
      setIsVisible(window.scrollY > 600);
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
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-4 rounded-full cursor-pointer lg:bottom-8 right-4 lg:right-8 z-50",
            "border-2 border-white/20 p-3",
            "bg-[#FDF5D9] backdrop-blur-sm cursor-pointer",
            "text-white",
            "transition-colors",
            "hover:bg-[#FDF5D9]/80 hover:border-white/10",
            "group"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 text-[#A20F0F]" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
