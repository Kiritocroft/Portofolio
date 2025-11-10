"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (linkName: string) => {
    setActiveSection(linkName as any);
    setTimeOfLastClick(Date.now());
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white/20 border-opacity-40 bg-white/80 dark:bg-[#1d1d20] bg-opacity-90 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[48rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 w-full sm:w-auto px-3 sm:px-0">
        {/* Logo Section */}
        <motion.div
          className="flex items-center flex-shrink-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Link href="#home" className="flex items-center group">
            <Image 
              src="/logo.png" 
              alt="Muh Nabil Athaillah Logo" 
              width={28} 
              height={28} 
              className="rounded-full transition-transform group-hover:scale-105 sm:w-8 sm:h-8" 
            /> 
            <span className="text-gray-700 dark:text-white/90 font-semibold text-sm ml-2 hidden sm:block transition-colors group-hover:text-gray-900 dark:group-hover:text-white"> 
              Muh Nabil Athaillah 
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center justify-center gap-0.5 text-[0.85rem] font-medium text-gray-600 dark:text-gray-400 ml-6">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-2.5 py-2.5 rounded-full transition-all duration-200 hover:text-gray-900 dark:hover:text-white/90",
                  {
                    "text-gray-900 dark:text-white/90": activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-200 dark:bg-[#2a2a2e] rounded-full absolute inset-0 -z-10"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden ml-auto p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white/90 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-[4.5rem] left-0 right-0 bg-white/95 dark:bg-[#1d1d20]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 sm:hidden z-50 max-h-[calc(100vh-5rem)] overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col py-3 px-3 space-y-1">
              {links.map((link, index) => (
                <motion.li
                  key={link.hash}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    className={clsx(
                      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      {
                        "text-gray-900 dark:text-white/90 bg-gray-100 dark:bg-gray-800": activeSection === link.name,
                        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50": activeSection !== link.name,
                      }
                    )}
                    href={link.hash}
                    onClick={() => handleLinkClick(link.name)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
