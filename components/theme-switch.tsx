"use client";

import { useTheme } from "@/context/theme-context";
import React, { useState } from "react";
import { BsMoon, BsSun, BsLaptop } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <BsSun className="text-yellow-500" />;
      case "dark":
        return <BsMoon className="text-blue-400" />;
      case "system":
        return <BsLaptop className="text-gray-600 dark:text-gray-300" />;
      default:
        return <BsSun />;
    }
  };

  const getTooltipText = () => {
    switch (theme) {
      case "light":
        return "Mode Terang";
      case "dark":
        return "Mode Gelap";
      case "system":
        return "Ikuti Sistem";
      default:
        return "Mode Terang";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
          >
            {getTooltipText()}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 relative overflow-hidden"
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {getIcon()}
        </motion.div>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full opacity-0"
          whileTap={{
            scale: [0, 1.5],
            opacity: [0.3, 0],
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    </div>
  );
}
