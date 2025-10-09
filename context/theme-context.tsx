"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  actualTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    if (!mounted) return;
    
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "dark") {
      setTheme("system");
      localStorage.setItem("theme", "system");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const updateActualTheme = (themeMode: Theme) => {
    if (!mounted) return;

    let isDark = false;

    if (themeMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = themeMode === "dark";
    }

    setActualTheme(isDark ? "dark" : "light");

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme from localStorage (runs once on mount)
  useEffect(() => {
    setMounted(true);
    const localTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = localTheme || "system";

    setTheme(initialTheme);
    updateActualTheme(initialTheme);
  }, []);

  // Keep actualTheme in sync when theme changes
  useEffect(() => {
    if (mounted) {
      updateActualTheme(theme);
    }
  }, [theme, mounted]);

  // Listen for system theme changes and only react when current theme is 'system'
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        updateActualTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        actualTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
