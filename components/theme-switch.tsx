"use client";

import { useTheme } from "@/context/theme-context";
import React, { useState } from "react";
import { BsMoon, BsSun, BsLaptop } from "react-icons/bs";

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
        return "Light Mode";
      case "dark":
        return "Dark Mode";
      case "system":
        return "Follow System";
      default:
        return "Light Mode";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {getTooltipText()}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
      )}
      
      <button
        className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="transition-transform duration-300">
          {getIcon()}
        </div>
      </button>
    </div>
  );
}
