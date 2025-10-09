"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  profileImage: string;
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
        <div className="sm:w-1/2 flex flex-col items-start text-left">
          <h1 className="mb-4 text-2xl font-medium !leading-[1.5] sm:text-4xl opacity-0 animate-fadeIn">
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
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 text-lg font-medium opacity-0 animate-fadeIn">
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

            <a
              className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
              href="/CV.pdf"
              download
            >
              Download CV{" "}
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>
          </div>
        </div>

        <div className="sm:w-1/2 flex flex-col items-center justify-center">
          <div className="relative hex-container">
            <div className="opacity-0 animate-scaleIn">
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
            </div>
            <span className="absolute bottom-0 right-0 text-4xl opacity-0 animate-scaleIn">
              👋
            </span>
          </div>
          {profile && (
            <h2 className="mt-4 text-2xl font-semibold opacity-0 animate-fadeIn">
              {profile.title}
            </h2>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 opacity-0 animate-fadeIn">
        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/nabil-athaillah"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Kiritocroft"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </div>
    </section>
  );
}
