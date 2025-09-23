"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

interface ProfileData {
  name: string;
  title: string;
  description: string;
  profileImage: string;  // Ubah dari imageUrl ke profileImage
}

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[75rem] sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
        {/* Left Column - Text Content */}
        <div className="sm:w-1/2 flex flex-col items-start text-left">
          {/* Menghapus komponen FadeIn */}
            <motion.h1
              className="mb-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {profile ? (
              <>
                <span className="font-bold">{profile.name}</span>
                <br />
                <span className="text-lg sm:text-2xl mt-2">{profile.description}</span>
              </>
            ) : (
              <>
                <span className="font-bold">Welcome To My Portfolio</span>
                <br />
                <span className="text-lg sm:text-2xl">
                  Passionate about creating beautiful and functional web applications
                  with modern technologies.
                </span>
              </>
            )}
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-start gap-4 text-lg font-medium"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
            }}
          >
            {/* Menghapus komponen Bounce */}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
            >
              Contact me here{" "}
              <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
            </Link>

            {/* Menghapus komponen Bounce */}
            <a
              className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
              href="/CV.pdf"
              download
            >
              Download CV{" "}
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>
          </motion.div>
        </div>

        {/* Right Column - Image and Title */}
        <div className="sm:w-1/2 flex flex-col items-center justify-center">
          <div className="relative hex-container">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.95 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
            >
              <Image
                src={profile ? profile.profileImage : "/pp.jpg"}
                alt={profile ? `${profile.name} portrait` : "Portrait"}
                width="250"
                height="260"
                quality="95"
                priority={true}
                className="hex-image"
                style={{
                  objectFit: profile && profile.profileImage.includes('qr') ? 'contain' : 'cover',
                  backgroundColor: profile && profile.profileImage.includes('qr') ? 'white' : 'transparent',
                  padding: profile && profile.profileImage.includes('qr') ? '10px' : '0',
                }}
              />
            </motion.div>
            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              👋
            </motion.span>
          </div>
          {profile && (
            <motion.h2
                className="mt-4 text-2xl font-semibold"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {profile.title}
            </motion.h2>
          )}
        </div>
      </div>

      {/* Social Links - Moved below the two columns */}
      <motion.div
        className="flex items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
        }}
      >
        {/* Menghapus komponen Bounce */}
        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/nabil-athaillah"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        {/* Menghapus komponen Bounce */}
        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Kiritocroft"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
