"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingScreen from "@/components/loading-screen";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showPageLoading: () => void;
  hidePageLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loading for 2.5 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes and page navigation
  useEffect(() => {
    const handleStart = () => setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    // Listen for navigation events
    window.addEventListener("beforeunload", handleStart);
    
    return () => {
      window.removeEventListener("beforeunload", handleStart);
    };
  }, []);

  const showPageLoading = () => setIsPageLoading(true);
  const hidePageLoading = () => setIsPageLoading(false);

  const contextValue: LoadingContextType = {
    isLoading: isLoading || isPageLoading,
    setIsLoading,
    showPageLoading,
    hidePageLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {(isLoading || isPageLoading) && <LoadingScreen />}
      {!isLoading && children}
    </LoadingContext.Provider>
  );
}