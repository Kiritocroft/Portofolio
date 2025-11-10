import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import pimImg from "@/public/pim.png";


export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Certificates",
    hash: "#certificates",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Junior Web Developer - BNSP",
    location: "YPT - Digiup Bootcamp",
    description:
      "Berhasil membuat RESTFUL API Untuk Dikonsumsi oleh Frontend. Berpartner dengan Rekan Rekan Digiup untuk membuat sebuah Projek Website untuk dipresentasikan ke mentor yayasan Digiup Telkom Indonesia. Berhasil Membuat fullstack application dengan Django Framework.",
    icon: React.createElement(LuGraduationCap),
    date: "2024",
  },
  {
    title: "React Developer Apprentice",
    location: "Indosat Ooredoo Hutchison",
    description:
      "Berhasil Menyelesaikan 2 Module dari Bootcamp Indosat Hooredo. Membuat Project React dan Portfolio Coding Camp Bootcamp Indosat. Berhasil Lulus dari Bootcamp.",
    icon: React.createElement(FaReact),
    date: "2024",
  },
  {
    title: "Frontend Web Developer",
    location: "DPC - Perempuan Indonesia maju Makassar",
    description:
      "Mendesign UI/UX Dari Website perempuan indonesia maju kota makassar. Berkolaborasi dengan RT-ACADEMY Group untuk membuat aplikasi Web Fullstack untuk Group PIM DPC Makassar. Merepresentasikan SMK Telkom Makassar dalam ajang Peringatan Hari Kartini di GCC Makassar.",
    icon: React.createElement(CgWorkAlt),
    date: "2025 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "PIM - Perempuan Indonesia Maju",
    description:
      "I worked as a frontend developer on this startup project with my team for 6 month. Users can know about PIM.",
    tags: ["React", "Next.js", "Tailwind", "Prisma", "Frame-motion"],
    imageUrl: pimImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "GraphQL",
  "Python",
  "Django",
  "Framer Motion",
] as const;
