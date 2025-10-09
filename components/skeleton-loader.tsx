"use client";

import React from "react";
import { motion } from "framer-motion";

// Base Skeleton Component
const SkeletonBase = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <motion.div
    className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg ${className}`}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{
      backgroundSize: "200% 100%",
    }}
  >
    {children}
  </motion.div>
);

// About Section Skeleton
export const AboutSkeleton = () => (
  <motion.section
    className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-8">
      <SkeletonBase className="h-8 w-32 mx-auto mb-4" />
    </div>
    <div className="space-y-3">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-5/6 mx-auto" />
      <SkeletonBase className="h-4 w-4/5 mx-auto" />
      <SkeletonBase className="h-4 w-3/4 mx-auto" />
    </div>
  </motion.section>
);

// Projects Section Skeleton
export const ProjectsSkeleton = () => (
  <motion.section
    className="scroll-mt-28 mb-28"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center mb-8">
      <SkeletonBase className="h-8 w-40 mx-auto" />
    </div>
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="group mb-3 sm:mb-8 last:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="bg-gray-100 dark:bg-white/10 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
            <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
              <SkeletonBase className="h-6 w-3/4 mb-2" />
              <div className="space-y-2 mb-4">
                <SkeletonBase className="h-3 w-full" />
                <SkeletonBase className="h-3 w-5/6" />
                <SkeletonBase className="h-3 w-4/5" />
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {[...Array(4)].map((_, j) => (
                  <SkeletonBase key={j} className="h-6 w-16" />
                ))}
              </div>
            </div>
            <SkeletonBase className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] h-[19.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 group-even:right-[initial] group-even:-left-40" />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

// Skills Section Skeleton
export const SkillsSkeleton = () => (
  <motion.section
    className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-8">
      <SkeletonBase className="h-8 w-32 mx-auto" />
    </div>
    <div className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <SkeletonBase className="h-12 w-20 rounded-xl" />
        </motion.div>
      ))}
    </div>
  </motion.section>
);

// Experience Section Skeleton
export const ExperienceSkeleton = () => (
  <motion.section
    className="scroll-mt-28 mb-28 sm:mb-40"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center mb-8">
      <SkeletonBase className="h-8 w-40 mx-auto" />
    </div>
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="flex gap-x-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <SkeletonBase className="w-12 h-12 rounded-full" />
            {i < 2 && <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 mt-4" />}
          </div>
          <div className="flex-1 pb-8">
            <SkeletonBase className="h-5 w-48 mb-2" />
            <SkeletonBase className="h-4 w-32 mb-1" />
            <SkeletonBase className="h-3 w-24 mb-3" />
            <div className="space-y-2">
              <SkeletonBase className="h-3 w-full" />
              <SkeletonBase className="h-3 w-5/6" />
              <SkeletonBase className="h-3 w-4/5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

// Contact Section Skeleton
export const ContactSkeleton = () => (
  <motion.section
    className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-8">
      <SkeletonBase className="h-8 w-32 mx-auto mb-4" />
      <SkeletonBase className="h-4 w-64 mx-auto" />
    </div>
    <div className="space-y-4">
      <SkeletonBase className="h-12 w-full rounded-lg" />
      <SkeletonBase className="h-32 w-full rounded-lg" />
      <SkeletonBase className="h-12 w-32 mx-auto rounded-lg" />
    </div>
  </motion.section>
);

// Generic Loading Spinner
export const LoadingSpinner = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Text Loading with Dots
export const LoadingText = ({ text = "Loading", className = "" }: { text?: string; className?: string }) => (
  <motion.div className={`flex items-center space-x-1 ${className}`}>
    <span className="text-gray-600 dark:text-gray-400">{text}</span>
    <div className="flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-gray-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);