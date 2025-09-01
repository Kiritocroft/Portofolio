"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error on new submission
    // Ganti dengan logika otentikasi Anda yang sebenarnya
    if (password === 'admin' && email === 'admin@gmail.com') {
      document.cookie = "isLoggedIn=true; path=/";
      router.push('/admin');
    } else {
      setError('Email atau password salah.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
       <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
       <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center text-white">
          Admin Login
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/30 text-white p-3 rounded-lg text-center text-sm"
            >
              {error}
            </motion.p>
          )}
          <motion.div variants={itemVariants}>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-white/80 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="masukkan email"
              required
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-white/80 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="admin"
              required
            />
          </motion.div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}