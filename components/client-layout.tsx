'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/admin');

  return (
    <>
      {!isAuthPage && (
        <>
          <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
          <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        </>
      )}
      
      <div className={!isAuthPage ? 'pt-28 sm:pt-36' : ''}>
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Footer />}
        {!isAuthPage && <ThemeSwitch />}
      </div>
    </>
  );
}
