"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("aurora-theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.style.backgroundColor = '#FAF7F2';
        document.documentElement.style.color = '#2C2621';
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.style.backgroundColor = '#030303';
        document.documentElement.style.color = '#e0e0e0';
      }
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.backgroundColor = '#030303';
      document.documentElement.style.color = '#e0e0e0';
    }

    // Enable smooth transitions only AFTER initial paint is complete
    const timeout = setTimeout(() => {
      document.body?.classList.add("theme-transition");
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("aurora-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.style.backgroundColor = '#FAF7F2';
      document.documentElement.style.color = '#2C2621';
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.style.backgroundColor = '#030303';
      document.documentElement.style.color = '#e0e0e0';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
