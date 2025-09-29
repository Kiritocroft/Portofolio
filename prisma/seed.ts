import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash('admin', 12);
  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: { password },
    create: {
      email: 'admin@gmail.com',
      password,
    },
  });
  console.log({ user });

  // Clear existing data
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.about.deleteMany();

  // Seed skills
  const skills = [
    { name: "HTML", order: 1 },
    { name: "CSS", order: 2 },
    { name: "JavaScript", order: 3 },
    { name: "TypeScript", order: 4 },
    { name: "React", order: 5 },
    { name: "Next.js", order: 6 },
    { name: "Node.js", order: 7 },
    { name: "Prisma", order: 8 },
    { name: "MySQL", order: 9 },
    { name: "Tailwind CSS", order: 10 },
  ];

  await prisma.skill.createMany({ data: skills });

  // Seed experiences
  const experiences = [
    {
      title: "Junior Web Developer - BNSP",
      location: "YPT - Digiup Bootcamp",
      description: "Berhasil membuat RESTFUL API Untuk Dikonsumsi oleh Frontend. Berpartner dengan Rekan Rekan Digiup untuk membuat sebuah Projek Website untuk dipresentasikan ke mentor yayasan Digiup Telkom Indonesia. Berhasil Membuat fullstack application dengan Django Framework.",
      date: "2024",
      icon: "LuGraduationCap",
    },
    {
      title: "React Developer Apprentice",
      location: "Indosat Ooredoo Hutchison",
      description: "Berhasil Menyelesaikan 2 Module dari Bootcamp Indosat Hooredo. Membuat Project React dan Portfolio Coding Camp Bootcamp Indosat. Berhasil Lulus dari Bootcamp.",
      date: "2024",
      icon: "FaReact",
    },
    {
      title: "Frontend Web Developer",
      location: "DPC - Perempuan Indonesia maju Makassar",
      description: "Mendesign UI/UX Dari Website perempuan indonesia maju kota makassar. Berkolaborasi dengan RT-ACADEMY Group untuk membuat aplikasi Web Fullstack untuk Group PIM DPC Makassar. Merepresentasikan SMK Telkom Makassar dalam ajang Peringatan Hari Kartini di GCC Makassar.",
      date: "2025 - Present",
      icon: "CgWorkAlt",
    },
  ];

  await prisma.experience.createMany({ data: experiences });

  // Seed about
  await prisma.about.create({
    data: {
      content: "Saya adalah seorang siswa dari SMK Telkom Makassar yang memiliki passion besar dalam dunia teknologi dan pemrograman. Saya mengambil jurusan Rekayasa Perangkat Lunak (RPL) dan yang paling saya sukai dari coding adalah proses memecahkan masalah yang kompleks. Saya merasa tertantang ketika berhasil menemukan solusi kreatif untuk berbagai masalah. Teknologi yang saya kuasai meliputi React, Next.js, Node.js, TypeScript, dan MongoDB. Saya juga familiar dengan Prisma dan berbagai framework modern lainnya. Saya selalu antusias mempelajari teknologi baru dan saat ini sedang mencari kesempatan magang sebagai software developer."
    },
  });

  console.log("Seeding completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });