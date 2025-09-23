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
                
                {/* Tambahkan input lain di sini jika perlu */}

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
    </motion.div>
  );
}