"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>Tentang saya</SectionHeading>
      <p className="mb-3">
        Saya adalah seorang siswa dari{" "}
        <span className="font-medium">SMK Telkom Makassar</span> yang memiliki
        passion besar dalam dunia teknologi dan pemrograman. Saya mengambil jurusan{" "}
        <span className="font-medium">Rekayasa Perangkat Lunak (RPL)</span> dan{" "}
        <span className="italic">yang paling saya sukai dari coding</span> adalah
        proses memecahkan masalah yang kompleks. Saya merasa <span className="underline">tertantang</span>{" "}
        ketika berhasil menemukan solusi kreatif untuk berbagai masalah. Teknologi yang saya
        kuasai meliputi{" "}
        <span className="font-medium">
          React, Next.js, Node.js, TypeScript, dan MongoDB
        </span>
        . Saya juga familiar dengan Prisma dan berbagai framework modern lainnya. Saya selalu{" "}
        <span className="font-medium">antusias mempelajari teknologi baru</span> dan saat ini sedang mencari{" "}
        <span className="font-medium">kesempatan magang</span> sebagai software developer.
      </p>

      <p>
        <span className="italic">Selain coding</span>, saya menikmati bermain
        game online, menonton anime, dan menghabiskan waktu dengan teman-teman. Saya juga suka{" "}
        <span className="font-medium">mempelajari hal-hal baru</span> di luar teknologi, seperti{" "}
        <span className="font-medium"> musik, dan gitar</span>. Saat ini
        saya sedang belajar bermain gitar.
      </p>
    </motion.section>
  );
}
