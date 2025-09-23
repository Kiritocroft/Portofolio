"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.035 * index,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="relative mb-28 max-w-[64rem] scroll-mt-28 text-center sm:mb-40"
    >
      {/* subtle bg effect */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-56 w-[80%] rounded-full bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl dark:from-fuchsia-500/15 dark:via-purple-500/15 dark:to-indigo-500/15" />
      </div>

      <SectionHeading>My skills</SectionHeading>
      <ul className="mt-6 flex flex-wrap justify-center gap-3 text-base text-gray-800 dark:text-gray-100">
        {skillsData.map((skill, index) => (
          <motion.li
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            custom={index}
            whileHover={{ y: -2, scale: 1.03 }}
            className="group relative rounded-2xl px-5 py-2.5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:bg-white dark:hover:bg-white/10"
          >
            {/* gradient border accent */}
            <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-fuchsia-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 dark:from-fuchsia-400 dark:via-purple-400 dark:to-indigo-400">
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
