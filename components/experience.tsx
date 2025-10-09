"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  icon: string;
}

// Icon mapping
const iconMap: { [key: string]: React.ReactElement } = {
  CgWorkAlt: React.createElement(CgWorkAlt),
  FaReact: React.createElement(FaReact),
  LuGraduationCap: React.createElement(LuGraduationCap),
};

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { actualTheme } = useTheme();
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/experiences", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Failed to load experiences");
      }
    };
    load();
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40 opacity-0 animate-fadeIn">
      <SectionHeading>My experience</SectionHeading>
      {error && <p className="text-sm text-red-600 opacity-0 animate-fadeIn">{error}</p>}
      <VerticalTimeline lineColor="">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  actualTheme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
              }}
              contentArrowStyle={{
                borderRight:
                  actualTheme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              icon={iconMap[item.icon] || iconMap["CgWorkAlt"]}
              iconStyle={{
                background:
                  actualTheme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
