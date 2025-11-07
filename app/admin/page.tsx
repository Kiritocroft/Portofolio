"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Skill Item Component
function SortableSkillItem({ 
  skill, 
  editingSkillId, 
  editSkillName, 
  setEditSkillName, 
  updateSkill, 
  cancelEditSkill, 
  startEditSkill, 
  deleteSkill, 
  skillsLoading 
}: {
  skill: SkillItem;
  editingSkillId: string | null;
  editSkillName: string;
  setEditSkillName: (name: string) => void;
  updateSkill: (id: string) => void;
  cancelEditSkill: () => void;
  startEditSkill: (skill: SkillItem) => void;
  deleteSkill: (id: string) => void;
  skillsLoading: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
    >
      {editingSkillId === skill.id ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skill name</label>
            <input
              type="text"
              value={editSkillName}
              onChange={(e) => setEditSkillName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => updateSkill(skill.id)} 
              disabled={skillsLoading}
              className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {skillsLoading ? "Saving..." : "Save"}
            </button>
            <button 
              onClick={cancelEditSkill}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
            >
              ⋮⋮
            </div>
            <span>{skill.name}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => startEditSkill(skill)} 
              className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteSkill(skill.id)} 
              className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function SortableProjectItem({ 
  project, 
  editingProjectId, 
  projectForm, 
  handleProjectFormChange, 
  submitUpdateProject, 
  cancelEditProject, 
  startEditProject, 
  deleteProject, 
  projectsLoading 
}: {
  project: ProjectItem;
  editingProjectId: string | null;
  projectForm: Omit<ProjectItem, "id">;
  handleProjectFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitUpdateProject: (e: React.FormEvent) => void;
  cancelEditProject: () => void;
  startEditProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  projectsLoading: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
    >
      {editingProjectId === project.id ? (
        <form onSubmit={submitUpdateProject} className="space-y-3">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleProjectFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={projectForm.tags}
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
          <div className="flex space-x-2">
            <button 
              type="submit" 
              disabled={projectsLoading}
              className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {projectsLoading ? "Saving..." : "Save"}
            </button>
            <button 
              type="button"
              onClick={cancelEditProject}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center">
          <div 
            {...listeners}
            className="mr-3 p-2 cursor-move text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            title="Drag to reorder"
          >
            ⋮⋮
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{project.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Tags: {project.tags}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button 
              onClick={() => startEditProject(project)} 
              className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteProject(project.id)} 
              className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function SortableExperienceItem({ 
  experience, 
  editingExpId, 
  editExpForm, 
  handleEditExpFormChange, 
  submitUpdateExperience, 
  cancelEditExperience, 
  startEditExperience, 
  deleteExperience, 
  expLoading 
}: {
  experience: ExperienceItem;
  editingExpId: string | null;
  editExpForm: ExperienceItem;
  handleEditExpFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  submitUpdateExperience: (e: React.FormEvent) => void;
  cancelEditExperience: () => void;
  startEditExperience: (experience: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  expLoading: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
    >
      {editingExpId === experience.id ? (
        <form onSubmit={submitUpdateExperience} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={editExpForm.title}
              onChange={handleEditExpFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={editExpForm.location}
              onChange={handleEditExpFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={editExpForm.description}
              onChange={handleEditExpFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="text"
              name="date"
              value={editExpForm.date}
              onChange={handleEditExpFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
            <select
              name="icon"
              value={editExpForm.icon}
              onChange={handleEditExpFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="CgWorkAlt">Work</option>
              <option value="FaGraduationCap">Education</option>
              <option value="LuGraduationCap">Graduation</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button 
              type="submit" 
              disabled={expLoading}
              className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {expLoading ? "Saving..." : "Save"}
            </button>
            <button 
              type="button"
              onClick={cancelEditExperience}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center">
          <div 
            {...listeners}
            className="mr-3 p-2 cursor-move text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            title="Drag to reorder"
          >
            ⋮⋮
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{experience.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{experience.location}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{experience.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{experience.date} • {experience.icon}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button 
              onClick={() => startEditExperience(experience)} 
              className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteExperience(experience.id)} 
              className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

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
  link?: string;
}

interface SkillItem { 
  id: string; 
  name: string; 
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
    link: "",
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectImageMode, setProjectImageMode] = useState<'url' | 'upload'>('url');
  const [projectImagePreview, setProjectImagePreview] = useState<string>("/pim.png");

  // About state
  const [aboutContent, setAboutContent] = useState<string>("");
  const [aboutMessage, setAboutMessage] = useState<string | null>(null);
  const [aboutError, setAboutError] = useState<string | null>(null);

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [skillName, setSkillName] = useState<string>("");
  const [skillsMessage, setSkillsMessage] = useState<string | null>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsLoading, setSkillsLoading] = useState<boolean>(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editSkillName, setEditSkillName] = useState<string>("");

  // Experiences state
  const [exps, setExps] = useState<ExperienceItem[]>([]);
  const [expForm, setExpForm] = useState<ExperienceItem>({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });
  const [expMessage, setExpMessage] = useState<string | null>(null);
  const [expError, setExpError] = useState<string | null>(null);
  const [expLoading, setExpLoading] = useState<boolean>(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editExpForm, setEditExpForm] = useState<ExperienceItem>({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Drag and drop handlers
  const handleSkillDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newSkills = [...skills];
      const oldIndex = newSkills.findIndex((item) => item.id === active.id);
      const newIndex = newSkills.findIndex((item) => item.id === over.id);
      
      const reorderedSkills = arrayMove(newSkills, oldIndex, newIndex);
      setSkills(reorderedSkills);

      // Save new order to database
      try {
        await fetch('/api/skills/reorder', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skillIds: reorderedSkills.map(skill => skill.id) })
        });
      } catch (error) {
        console.error('Failed to save skill order:', error);
        // Revert on error
        setSkills(skills);
      }
    }
  };

  const handleProjectDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newProjects = [...projects];
      const oldIndex = newProjects.findIndex((item) => item.id === active.id);
      const newIndex = newProjects.findIndex((item) => item.id === over.id);
      
      const reorderedProjects = arrayMove(newProjects, oldIndex, newIndex);
      setProjects(reorderedProjects);

      // Save new order to database
      try {
        await fetch('/api/projects/reorder', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectIds: reorderedProjects.map(project => project.id) })
        });
      } catch (error) {
        console.error('Failed to save project order:', error);
        // Revert on error
        setProjects(projects);
      }
    }
  };

  const handleExperienceDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newExps = [...exps];
      const oldIndex = newExps.findIndex((item) => item.id === active.id);
      const newIndex = newExps.findIndex((item) => item.id === over.id);
      
      const reorderedExps = arrayMove(newExps, oldIndex, newIndex);
      setExps(reorderedExps);

      // Save new order to database
      try {
        await fetch('/api/experiences/reorder', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ experienceIds: reorderedExps.map(exp => exp.id) })
        });
      } catch (error) {
        console.error('Failed to save experience order:', error);
        // Revert on error
        setExps(exps);
      }
    }
  };

  // Generic drag end handler
  const handleDragEnd = (event: DragEndEvent, type: 'skill' | 'project' | 'experience') => {
    switch (type) {
      case 'skill':
        handleSkillDragEnd(event);
        break;
      case 'project':
        handleProjectDragEnd(event);
        break;
      case 'experience':
        handleExperienceDragEnd(event);
        break;
    }
  };

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
    if (name === 'imageUrl') {
      setProjectImagePreview(value);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProjLoading(true);
    setProjMessage("Uploading image...");

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

      setProjectImagePreview(imageUrl);
      setProjectForm((pf) => ({ ...pf, imageUrl }));
      setProjMessage("Image uploaded successfully");
    } catch (err: any) {
      setProjError(err.message || "Image upload failed");
    } finally {
      setProjLoading(false);
    }
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
      setProjectForm({ title: "", description: "", tags: "", imageUrl: "/pim.png", link: "" });
      setProjectImagePreview("/pim.png");
      await refreshProjects();
    } catch (err: any) {
      setProjError(err.message || "Failed to create project");
    } finally {
      setProjLoading(false);
    }
  };

  const startEditProject = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjectForm({ title: p.title, description: p.description, tags: p.tags, imageUrl: p.imageUrl || "/pim.png", link: p.link || "" });
    setProjectImagePreview(p.imageUrl || "/pim.png");
    setProjMessage(null);
    setProjError(null);
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({ title: "", description: "", tags: "", imageUrl: "/pim.png", link: "" });
    setProjectImagePreview("/pim.png");
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
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skillName }),
      });
      if (!res.ok) throw new Error("Failed to add skill");
      setSkillsMessage("Skill added");
      setSkillName("");
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

  const startEditSkill = (skill: SkillItem) => {
    setEditingSkillId(skill.id);
    setEditSkillName(skill.name);
  };

  const cancelEditSkill = () => {
    setEditingSkillId(null);
    setEditSkillName("");
  };

  const updateSkill = async (id: string) => {
    setSkillsMessage(null);
    setSkillsError(null);
    setSkillsLoading(true);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editSkillName }),
      });
      if (!res.ok) throw new Error("Failed to update skill");
      setSkillsMessage("Skill updated");
      setEditingSkillId(null);
      setEditSkillName("");
      await refreshSkills();
    } catch (err: any) {
      setSkillsError(err.message || "Failed to update skill");
    } finally {
      setSkillsLoading(false);
    }
  };

  // Experiences handlers
  const refreshExperiences = async () => {
    try {
      const res = await fetch("/api/experiences", { cache: "no-store" });
      if (res.ok) setExps(await res.json());
    } catch {}
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const startEditExp = (exp: ExperienceItem) => {
    setEditingExpId(exp.id);
    setEditExpForm({ ...exp });
  };

  const cancelEditExp = () => {
    setEditingExpId(null);
    setEditExpForm({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });
  };

  const handleEditExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditExpForm((f) => ({ ...f, [name]: value }));
  };

  const updateExp = async (id: string) => {
    setExpMessage(null);
    setExpError(null);
    setExpLoading(true);
    try {
      const { title, location, description, date, icon } = editExpForm;
      const res = await fetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location, description, date, icon }),
      });
      if (!res.ok) throw new Error("Failed to update experience");
      setExpMessage("Experience updated");
      setEditingExpId(null);
      setEditExpForm({ id: "", title: "", location: "", description: "", date: "", icon: "CgWorkAlt" });
      await refreshExperiences();
    } catch (err: any) {
      setExpError(err.message || "Failed to update experience");
    } finally {
      setExpLoading(false);
    }
  };

  const submitUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpId) return;
    setExpLoading(true);
    setExpMessage(null);
    setExpError(null);
    try {
      const res = await fetch(`/api/experiences/${editingExpId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editExpForm),
      });
      if (!res.ok) throw new Error("Failed to update experience");
      setExpMessage("Experience updated");
      cancelEditExp();
      await refreshExperiences();
    } catch (err: any) {
      setExpError(err.message || "Failed to update experience");
    } finally {
      setExpLoading(false);
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Image</label>
              
              {/* Toggle buttons */}
              <div className="flex mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setProjectImageMode('url')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    projectImageMode === 'url'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  URL Link
                </button>
                <button
                  type="button"
                  onClick={() => setProjectImageMode('upload')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    projectImageMode === 'upload'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Upload File
                </button>
              </div>

              {/* URL Input */}
              {projectImageMode === 'url' && (
                <input
                  type="text"
                  name="imageUrl"
                  value={projectForm.imageUrl}
                  onChange={handleProjectFormChange}
                  placeholder="https://example.com/image.jpg"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              )}

              {/* File Upload */}
              {projectImageMode === 'upload' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              )}

              {/* Image Preview */}
              {projectImagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <img
                    src={projectImagePreview}
                    alt="Project preview"
                    className="w-32 h-20 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                    onError={(e) => {
                      e.currentTarget.src = "/pim.png";
                    }}
                  />
                </div>
              )}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Link (URL)</label>
            <input
              type="text"
              name="link"
              value={projectForm.link || ""}
              onChange={handleProjectFormChange}
              placeholder="https://example.com/project"
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleProjectDragEnd}
          >
            <SortableContext items={projects} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                {projects.map((project) => (
                  <SortableProjectItem
                    key={project.id}
                    project={project}
                    editingProjectId={editingProjectId}
                    projectForm={projectForm}
                    handleProjectFormChange={handleProjectFormChange}
                    submitUpdateProject={submitUpdateProject}
                    cancelEditProject={cancelEditProject}
                    startEditProject={startEditProject}
                    deleteProject={deleteProject}
                    projectsLoading={projLoading}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skill name</label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={skillsLoading}>{skillsLoading ? "Adding..." : "Add Skill"}</button>
        </form>
        <div className="mt-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleSkillDragEnd}
          >
            <SortableContext items={skills} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                {skills.map((skill) => (
                  <SortableSkillItem
                    key={skill.id}
                    skill={skill}
                    editingSkillId={editingSkillId}
                    editSkillName={editSkillName}
                    setEditSkillName={setEditSkillName}
                    updateSkill={updateSkill}
                    cancelEditSkill={cancelEditSkill}
                    startEditSkill={startEditSkill}
                    deleteSkill={deleteSkill}
                    skillsLoading={skillsLoading}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
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
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'experience')}
          >
            <SortableContext items={exps.map(e => e.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                {exps.map((e) => (
                  <SortableExperienceItem
                    key={e.id}
                    experience={e}
                    editingExpId={editingExpId}
                    editExpForm={editExpForm}
                    handleEditExpFormChange={handleEditExpChange}
                    submitUpdateExperience={submitUpdateExperience}
                    cancelEditExperience={cancelEditExp}
                    startEditExperience={startEditExp}
                    deleteExperience={deleteExperience}
                    expLoading={expLoading}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      </div>

    </motion.div>
  );
}