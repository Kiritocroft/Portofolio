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
  const [theme, setTheme] = useState<Theme>("system");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else if (theme === "dark") {
      setTheme("system");
      window.localStorage.setItem("theme", "system");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  };

  const updateActualTheme = (themeMode: Theme) => {
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
    const localTheme = window.localStorage.getItem("theme") as Theme | null;
    const initialTheme = localTheme || "system";

    setTheme(initialTheme);
    updateActualTheme(initialTheme);
  }, []);

  // Keep actualTheme in sync when theme changes
  useEffect(() => {
    updateActualTheme(theme);
  }, [theme]);

  // Listen for system theme changes and only react when current theme is 'system'
  useEffect(() => {
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
  }, [theme]);

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
