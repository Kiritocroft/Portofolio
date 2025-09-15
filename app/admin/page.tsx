"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/login', redirect: true });
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
       <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
       <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
      
      <div className="text-center bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
        <p className="text-lg mb-8">This is the protected admin page.</p>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 disabled:bg-red-400"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </main>
  );
}