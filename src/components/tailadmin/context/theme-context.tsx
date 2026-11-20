"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

type ThemeContextType = {
  theme: ResolvedTheme; // Resolved theme actually active ("light" or "dark")
  themeMode: ThemeMode; // The configured preference ("light", "dark", or "auto")
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Diadaptasi dari template asli: template membaca preferensi tersimpan di
// dalam useEffect (setState sinkron di dalam effect), yang ditolak aturan
// lint react-hooks/set-state-in-effect. Di sini preferensi dibaca sekali
// lewat lazy initializer, tema aktif diturunkan dari preferensi (bukan
// state terpisah), dan effect hanya dipakai untuk efek samping murni
// (tulis localStorage, kelas .dark di <html>, listener media query).
function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
  const legacySavedTheme = localStorage.getItem(
    "theme",
  ) as ResolvedTheme | null;
  return savedMode || (legacySavedTheme as ThemeMode) || "light";
}

function readPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(readStoredMode);
  const [prefersDark, setPrefersDark] = useState<boolean>(readPrefersDark);

  const theme: ResolvedTheme =
    themeMode === "auto" ? (prefersDark ? "dark" : "light") : themeMode;

  useEffect(() => {
    localStorage.setItem("theme-mode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (themeMode !== "auto") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setPrefersDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-color-scheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-color-scheme", "light");
    }
  }, [theme]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const toggleTheme = () => {
    setThemeModeState(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, setThemeMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
