"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

interface CertificateItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issueDate: string;
  issuer: string;
  order?: number | null;
}

export default function Certificates() {
  const { ref } = useSectionInView("Certificates");
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/certificates", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (err: any) {
        setError(err.message || "Failed to load certificates");
      }
    };
    load();
  }, []);

  return (
    <section
      id="certificates"
      ref={ref}
      className="relative mb-20 max-w-[64rem] scroll-mt-28 text-center sm:mb-40 opacity-0 animate-fadeIn"
    >
      {/* subtle bg effect */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-56 w-[80%] rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-3xl dark:from-emerald-500/15 dark:via-teal-500/15 dark:to-cyan-500/15" />
      </div>

      <SectionHeading>My Certificates</SectionHeading>
      {error && <p className="text-sm text-red-600 opacity-0 animate-fadeIn">{error}</p>}
      
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {certificates.map((certificate, index) => (
          <div
            key={certificate.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden opacity-0 animate-fadeIn hover:scale-[1.02] transition-all duration-300"
          >
            {/* gradient border accent */}
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative z-10 p-4 sm:p-6">
              <div 
                className="relative w-full h-40 sm:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden cursor-pointer group/image"
                onClick={() => setSelectedCertificate(certificate)}
              >
                <Image
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white/0 group-hover/image:text-white/80 text-sm font-medium transition-colors duration-300">
                    Click to enlarge
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                {certificate.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-3">
                {certificate.description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">{certificate.issuer}</span>
                <span className="text-gray-400">{certificate.issueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-size image */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close modal"
              >
                <HiX size={28} />
              </button>

              {/* Certificate info */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <h3 className="text-white text-lg font-semibold mb-1">
                  {selectedCertificate.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {selectedCertificate.issuer} • {selectedCertificate.issueDate}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-full h-[90vh] max-h-[800px]">
                <Image
                  src={selectedCertificate.imageUrl}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}