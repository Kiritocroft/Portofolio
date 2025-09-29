"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch about content");
        const data = await res.json();
        setContent(typeof data?.content === "string" ? data.content : null);
      } catch (err: any) {
        setError(err.message || "Failed to load about content");
      }
    };
    load();
  }, []);

  const fallback = `Saya adalah seorang siswa dari SMK Telkom Makassar yang memiliki passion besar dalam dunia teknologi dan pemrograman. Saya mengambil jurusan Rekayasa Perangkat Lunak (RPL) dan paling saya sukai dari coding adalah proses memecahkan masalah yang kompleks. Teknologi yang saya kuasai meliputi React, Next.js, Node.js, TypeScript, dan MongoDB. Saya juga familiar dengan Prisma dan berbagai framework modern lainnya. Saya selalu antusias mempelajari teknologi baru dan saat ini sedang mencari kesempatan magang sebagai software developer.`;

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="mb-3 whitespace-pre-line">
        {content ?? fallback}
      </p>
    </motion.section>
  );
}
