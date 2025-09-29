"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

interface ProfileData {
  id?: number;
  name: string;
  title: string;
  description: string;
  location?: string;
  status?: string | null;
  edu_major?: string | null;
  edu_university?: string | null;
  edu_graduation_year?: number | null;
  profileImage?: string | null;
  backgroundGradient?: string | null;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string; // comma separated in DB
  imageUrl: string;
}

interface SkillItem { 
  id: string; 
  name: string; 
  order?: number | null 
}

interface ExperienceItem { 
  id: string; 
  title: string; 
  location: string; 
  description: string; 
  date: string;
  icon: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<ProfileData>({
    name: "",
    title: "",
    description: "",
    location: "",
    status: "",
    edu_major: "",
    edu_university: "",
    edu_graduation_year: undefined,
    profileImage: "",
    backgroundGradient: "",
  });
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Projects state (must be declared before any conditional return)
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projLoading, setProjLoading] = useState<boolean>(false);
  const [projMessage, setProjMessage] = useState<string | null>(null);
  const [projError, setProjError] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<ProjectItem, "id">>({
    title: "",
    description: "",
    tags: "",
    imageUrl: "/pim.png",
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // About state
  const [aboutContent, setAboutContent] = useState<string>("");
  const [aboutMessage, setAboutMessage] = useState<string | null>(null);
  const [aboutError, setAboutError] = useState<string | null>(null);

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [skillName, setSkillName] = useState<string>("");
  const [skillOrder, setSkillOrder] = useState<string>("");
  const [skillsMessage, setSkillsMessage] = useState<string | null>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsLoading, setSkillsLoading] = useState<boolean>(false);

  // Experiences state
  const [exps, setExps] = useState<ExperienceItem[]>([]);
  const [expForm, setExpForm] = useState<ExperienceItem>({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });
  const [expMessage, setExpMessage] = useState<string | null>(null);
  const [expError, setExpError] = useState<string | null>(null);
  const [expLoading, setExpLoading] = useState<boolean>(false);

  // Load profile
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) return;
      const data = await res.json();
      setForm((f) => ({ ...f, ...data }));
      if (data?.profileImage) setPreview(data.profileImage);
    };
    load();
  }, []);

  // Load projects list
  useEffect(() => {
    const loadProjects = async () => {
      setProjLoading(true);
      setProjMessage(null);
      setProjError(null);
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setProjError(err.message || "Failed to load projects");
      } finally {
        setProjLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Load About, Skills, and Experiences
  useEffect(() => {
    const loadAll = async () => {
      // About
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.content === "string") setAboutContent(data.content);
        }
      } catch {}
      // Skills
      try {
        setSkillsLoading(true);
        const res = await fetch("/api/skills", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setSkills(data);
        }
      } catch (err: any) {
        setSkillsError(err.message || "Failed to load skills");
      } finally {
        setSkillsLoading(false);
      }
      // Experiences
      try {
        const res = await fetch("/api/experiences", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setExps(data);
        }
      } catch {}
    };
    loadAll();
  }, []);

  if (status === "loading") {
    return <p className="px-6 py-10">Memeriksa sesi...</p>;
  }
  if (!session) {
    return <p className="px-6 py-10">Anda harus login untuk mengakses halaman ini.</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Image upload failed");
      }

      const data = await res.json();
      const imageUrl = data.path;

      setPreview(imageUrl);
      setForm((f) => ({ ...f, profileImage: imageUrl }));
      setMessage("Image uploaded successfully!");
    } catch (err: any) {
      setMessage(err.message || "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  const clearPhoto = () => {
    setPreview(undefined);
    setForm((f) => ({ ...f, profileImage: "" }));
  };

  const useDefaultPhoto = () => {
    const url = "/pp.jpg";
    setPreview(url);
    setForm((f) => ({ ...f, profileImage: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setMessage("Tersimpan!");
    } catch (err: any) {
      setMessage(err.message || "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  // Projects handlers
  const handleProjectFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm((pf) => ({ ...pf, [name]: value }));
  };

  const refreshProjects = async () => {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {}
  };

  const submitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjLoading(true);
    setProjMessage(null);
    setProjError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectForm,
          tags: projectForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      setProjMessage("Project created");
      setProjectForm({ title: "", description: "", tags: "", imageUrl: "/pim.png" });
      await refreshProjects();
    } catch (err: any) {
      setProjError(err.message || "Failed to create project");
    } finally {
      setProjLoading(false);
    }
  };

  const startEditProject = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjectForm({ title: p.title, description: p.description, tags: p.tags, imageUrl: p.imageUrl || "/pim.png" });
    setProjMessage(null);
    setProjError(null);
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({ title: "", description: "", tags: "", imageUrl: "/pim.png" });
  };

  const submitUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId) return;
    setProjLoading(true);
    setProjMessage(null);
    setProjError(null);
    try {
      const res = await fetch(`/api/projects/${editingProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectForm,
          tags: projectForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      setProjMessage("Project updated");
      cancelEditProject();
      await refreshProjects();
    } catch (err: any) {
      setProjError(err.message || "Failed to update project");
    } finally {
      setProjLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setProjLoading(true);
    setProjMessage(null);
    setProjError(null);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjMessage("Project deleted");
      await refreshProjects();
    } catch (err: any) {
      setProjError(err.message || "Failed to delete project");
    } finally {
      setProjLoading(false);
    }
  };

  // About handlers
  const saveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setAboutMessage(null);
    setAboutError(null);
    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: aboutContent }),
      });
      if (!res.ok) throw new Error("Failed to save about");
      setAboutMessage("About saved");
    } catch (err: any) {
      setAboutError(err.message || "Failed to save about");
    }
  };

  // Skills handlers
  const refreshSkills = async () => {
    try {
      const res = await fetch("/api/skills", { cache: "no-store" });
      if (res.ok) setSkills(await res.json());
    } catch {}
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setSkillsMessage(null);
    setSkillsError(null);
    setSkillsLoading(true);
    try {
      const orderVal = skillOrder.trim() === "" ? null : Number(skillOrder);
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skillName, order: orderVal }),
      });
      if (!res.ok) throw new Error("Failed to add skill");
      setSkillsMessage("Skill added");
      setSkillName("");
      setSkillOrder("");
      await refreshSkills();
    } catch (err: any) {
      setSkillsError(err.message || "Failed to add skill");
    } finally {
      setSkillsLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      await refreshSkills();
    } catch (err: any) {
      setSkillsError(err.message || "Failed to delete skill");
    }
  };

  // Experiences handlers
  const refreshExperiences = async () => {
    try {
      const res = await fetch("/api/experiences", { cache: "no-store" });
      if (res.ok) setExps(await res.json());
    } catch {}
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpForm((f) => ({ ...f, [name]: value }));
  };

  const addExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setExpMessage(null);
    setExpError(null);
    setExpLoading(true);
    try {
      const { title, location, description, date, icon } = expForm;
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location, description, date, icon }),
      });
      if (!res.ok) throw new Error("Failed to add experience");
      setExpMessage("Experience added");
      setExpForm({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });
      await refreshExperiences();
    } catch (err: any) {
      setExpError(err.message || "Failed to add experience");
    } finally {
      setExpLoading(false);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete experience");
      await refreshExperiences();
    } catch (err: any) {
      setExpError(err.message || "Failed to delete experience");
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your profile information and settings.</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${message.includes("Gagal") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Foto Profil */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Profile Picture</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  )}
                </div>
                <div className="flex space-x-2">
                  <label className="cursor-pointer px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <span>Upload</span>
                    <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
                  </label>
                  <button type="button" onClick={useDefaultPhoto} className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    Default
                  </button>
                  {preview && (
                    <button type="button" onClick={clearPhoto} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Input */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-6">Personal Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={form.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jabatan/Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={form.title || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Sambutan</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={form.description || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>

      {/* Projects Management */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Projects Management</h3>

        {projMessage && (
          <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800">{projMessage}</div>
        )}
        {projError && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800">{projError}</div>
        )}

        <form onSubmit={editingProjectId ? submitUpdateProject : submitNewProject} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={projectForm.title}
                onChange={handleProjectFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={projectForm.imageUrl}
                onChange={handleProjectFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleProjectFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (dipisahkan koma)</label>
            <input
              type="text"
              name="tags"
              value={projectForm.tags}
              onChange={handleProjectFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              disabled={projLoading}
            >
              {editingProjectId ? (projLoading ? "Updating..." : "Update Project") : (projLoading ? "Creating..." : "Create Project")}
            </button>
            {editingProjectId && (
              <button type="button" onClick={cancelEditProject} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h4 className="text-md font-semibold mb-3">Existing Projects</h4>
          {projLoading && <p className="text-sm text-gray-500">Loading...</p>}
          {!projLoading && projects.length === 0 && (
            <p className="text-sm text-gray-500">No projects yet.</p>
          )}
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tags: {p.tags}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEditProject(p)} className="px-3 py-1.5 text-sm rounded-md bg-yellow-500 text-white hover:bg-yellow-600">Edit</button>
                  <button onClick={() => deleteProject(p.id)} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* About Management */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">About Management</h3>
        {aboutMessage && <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800">{aboutMessage}</div>}
        {aboutError && <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800">{aboutError}</div>}
        <form onSubmit={saveAbout} className="space-y-4">
          <textarea
            name="about"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save About</button>
        </form>
      </div>

      {/* Skills Management */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Skills Management</h3>
        {skillsMessage && <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800">{skillsMessage}</div>}
        {skillsError && <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800">{skillsError}</div>}
        <form onSubmit={addSkill} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skill name</label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order (optional)</label>
              <input
                type="number"
                value={skillOrder}
                onChange={(e) => setSkillOrder(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={skillsLoading}>{skillsLoading ? "Adding..." : "Add Skill"}</button>
        </form>
        <div className="mt-6">
          <ul className="space-y-3">
            {skills.map((s) => (
              <li key={s.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-between">
                <span>{s.name}{typeof s.order === "number" ? ` (order: ${s.order})` : ""}</span>
                <button onClick={() => deleteSkill(s.id)} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience Management */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Experience Management</h3>
        {expMessage && <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800">{expMessage}</div>}
        {expError && <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800">{expError}</div>}
        <form onSubmit={addExperience} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input type="text" name="title" value={expForm.title} onChange={handleExpChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input type="text" name="location" value={expForm.location} onChange={handleExpChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea name="description" value={expForm.description} onChange={handleExpChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input type="text" name="date" value={expForm.date} onChange={handleExpChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
              <select name="icon" value={expForm.icon} onChange={handleExpChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option value="CgWorkAlt">Work (Default)</option>
                <option value="FaReact">React</option>
                <option value="LuGraduationCap">Graduation</option>
              </select>
            </div>
          </div>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={expLoading}>{expLoading ? "Adding..." : "Add Experience"}</button>
        </form>
        <div className="mt-6">
          <ul className="space-y-3">
            {exps.map((e) => (
              <li key={e.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{e.location} — {e.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Icon: {e.icon}</p>
                </div>
                <button onClick={() => deleteExperience(e.id)} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </motion.div>
  );
}