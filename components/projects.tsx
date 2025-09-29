"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string; // stored as comma-separated in DB
  imageUrl: string;
}

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {loading && <p className="text-sm text-gray-500">Loading projects...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="text-sm text-gray-500">No projects found. Add some in the admin panel.</p>
        )}
        {!loading && !error && projects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags ? project.tags.split(",") : []}
            imageUrl={project.imageUrl || "/pim.png"}
          />
        ))}
      </div>
    </section>
  );
}
