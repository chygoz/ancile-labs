"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Container from "@/components/container";
import MobileSidebar from "@/components/mobile-sidebar";
import GetStartedModal from "@/components/get-started-modal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    { name: "Clients", href: "/clients" },
    { name: "Careers", href: "/careers" },
    { name: "Contact us", href: "#contact" },
  ];

  const serviceItems = [
    {
      title: "Services",
      href: "/services",
      description:
        "Explore our range of expert solutions designed to drive growth, enhance efficiency, and support your business objectives.",
    },
    {
      title: "IT Consulting & Corporate Trainings",
      href: "/services/it-consulting",
      description:
        "Strategic IT guidance and team training to accelerate your digital transformation journey.",
    },
    {
      title: "Scalable Talent Solutions",
      href: "/services/talent-solutions",
      description:
        "Connect with skilled professionals who integrate seamlessly into your organization.",
    },
    {
      title: "Custom Software Development",
      href: "/services/software-development",
      description:
        "Build powerful, scalable software applications that solve real business problems.",
    },
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
            <MobileSidebar navItems={navItems} serviceItems={serviceItems} />
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
          {/* Company Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Link
              href="/company"
              className={`text-white hover:underline underline-offset-6 hover:text-gray-200 transition-colors font-medium ${
                pathname === "/company" ? "underline" : ""
              }`}
            >
              Company
            </Link>
          </motion.div>

          {/* Services Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-inherit text-white hover:!bg-black/25 hover:text-gray-200 focus:bg-black/25  focus:text-white data-[active]:bg-black/25 data-[state=open]:bg-black/25 font-medium data-[state=open]:text-gray-200 cursor-pointer",
                      pathname.startsWith("/services")
                        ? "underline underline-offset-6"
                        : ""
                    )}
                  >
                    <Link
                      href="/services"
                      className="flex items-center font-medium text-base"
                    >
                      Services
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-[#330505] !border-[#330505] text-white">
                    <div className="w-[500px] p-4 bg-[#330505]/95 rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        {serviceItems.map((item) => (
                          <NavigationMenuLink key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:!bg-black/25 focus:bg-bg-black/25 group text-white"
                            >
                              <div className="text-sm font-medium leading-none group-hover:text-white transition-colors">
                                {item.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-[#8A846F] mt-1">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          {/* Other Navigation Items */}
          {navItems.slice(1).map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
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
