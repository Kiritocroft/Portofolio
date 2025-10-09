"use client";

import React from "react";

export default function SectionDivider() {
  return (
    <div
      className="my-24 flex items-center justify-center opacity-0 animate-fadeIn"
      style={{ animationDelay: "0.125s" }}
    >
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full"></div>
      <div className="mx-4 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full"></div>
    </div>
  );
}
