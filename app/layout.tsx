import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import AuthProvider from '@/components/auth-provider';
import ClientLayout from '@/components/client-layout';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muhammad Nabil Athaillah | Personal Portfolio",
  description: "Muhammad Nabil Athaillah is a student full-stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
        {/* Prevent theme flash on first paint */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `
            try {
              const ls = localStorage.getItem('theme');
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const shouldDark = ls === 'dark' || (ls === 'system' && systemDark) || (!ls && systemDark);
              if (shouldDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          `,
        }} />
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <AuthProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
              <Toaster position="top-right" />
            </AuthProvider>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
