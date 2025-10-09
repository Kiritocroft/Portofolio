"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

interface SkillItem { id: string; name: string; order?: number | null }

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/skills", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setSkills(data);
      } catch (err: any) {
        setError(err.message || "Failed to load skills");
      }
    };
    load();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative mb-28 max-w-[64rem] scroll-mt-28 text-center sm:mb-40 opacity-0 animate-fadeIn"
    >
      {/* subtle bg effect */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-56 w-[80%] rounded-full bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl dark:from-fuchsia-500/15 dark:via-purple-500/15 dark:to-indigo-500/15" />
      </div>

      <SectionHeading>My skills</SectionHeading>
      {error && <p className="text-sm text-red-600 opacity-0 animate-fadeIn">{error}</p>}
      <ul className="mt-6 flex flex-wrap justify-center gap-3 text-base text-gray-800 dark:text-gray-100">
        {skills.map((skill, index) => (
          <li
            key={skill.id}
            style={{ animationDelay: `${index * 0.035}s` }}
            className="group relative rounded-2xl px-5 py-2.5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:bg-white dark:hover:bg-white/10 opacity-0 animate-fadeIn hover:translate-y-[-2px] hover:scale-[1.03] transition-transform"
          >
            {/* gradient border accent */}
            <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-fuchsia-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 dark:from-fuchsia-400 dark:via-purple-400 dark:to-indigo-400">
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
