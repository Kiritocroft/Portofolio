"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { ProjectsSkeleton } from "./skeleton-loader";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/projects", { 
          cache: "no-store",
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        // Add minimum loading time for smooth UX
        setTimeout(() => setLoading(false), 1000);
      }
    };
    load();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <ProjectsSkeleton />;
  }

  return (
    <section 
      ref={ref} 
      id="projects" 
      className="scroll-mt-28 mb-28 opacity-0 animate-fadeIn"
    >
      <SectionHeading>My projects</SectionHeading>
      {error && (
        <p className="text-sm text-red-600 text-center mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md mx-auto opacity-0 animate-fadeIn">
          {error}
        </p>
      )}
      {projects.length === 0 && !error && (
        <p className="text-center text-gray-500 py-8 opacity-0 animate-fadeIn">
          No projects found. Add some projects in the admin panel.
        </p>
      )}
      <div>
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Project {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
