"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      className="my-24 flex items-center justify-center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    >
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full"></div>
      <div className="mx-4 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full"></div>
    </motion.div>
  );
}
