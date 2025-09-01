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
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Saya adalah siswa dari{" "}
        <span className="font-medium">SMK Telkom Makassar</span>, yang memiliki
        minat besar dalam dunia pemrograman. Saya mengambil jurusan{" "}
        <span className="font-medium">Rekayasa Perangkat Lunak</span>.{" "}
        <span className="italic">Bagian favorit saya dalam pemrograman</span> adalah
        aspek pemecahan masalah. Saya sangat <span className="underline">suka</span>{" "}
        ketika berhasil menemukan solusi dari sebuah masalah. Teknologi utama yang saya
        pelajari adalah{" "}
        <span className="font-medium">
          React, Next.js, Node.js, dan MongoDB
        </span>
        . Saya juga familiar dengan TypeScript dan Prisma. Saya selalu bersemangat untuk
        mempelajari teknologi-teknologi baru. Saat ini saya sedang mencari{" "}
        <span className="font-medium">kesempatan magang</span> sebagai pengembang
        perangkat lunak.
      </p>

      <p>
        <span className="italic">Di luar kegiatan coding</span>, saya suka bermain
        game, menonton film, dan bermain dengan teman-teman. Saya juga senang{" "}
        <span className="font-medium">mempelajari hal-hal baru</span>. Saat ini
        saya sedang mempelajari{" "}
        <span className="font-medium">sejarah dan teknologi terbaru</span>. Saya
        juga sedang belajar bermain gitar.
      </p>
    </motion.section>
  );
}
