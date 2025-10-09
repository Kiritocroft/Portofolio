"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { AboutSkeleton } from "./skeleton-loader";

export default function About() {
  const { ref } = useSectionInView("About");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/about", { 
          cache: "no-store",
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (!res.ok) throw new Error("Failed to fetch about content");
        const data = await res.json();
        setContent(typeof data?.content === "string" ? data.content : null);
      } catch (err: any) {
        setError(err.message || "Failed to load about content");
      } finally {
        // Add minimum loading time for smooth UX
        setTimeout(() => setLoading(false), 800);
      }
    };
    load();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <AboutSkeleton />;
  }

  return (
    <section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28 opacity-0 animate-fadeIn"
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      {error && (
        <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg opacity-0 animate-fadeIn">
          {error}
        </p>
      )}
      <p className="mb-3 whitespace-pre-line opacity-0 animate-fadeIn">
        {content || "Welcome to my portfolio. You can edit this text in the admin panel."}
      </p>
    </section>
  );
}
