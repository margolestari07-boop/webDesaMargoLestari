"use client";

import { useEffect, useState } from "react";

const materialIconClass = "material-symbols-outlined";

/**
 * Toggle night mode untuk halaman publik. Memakai kunci localStorage
 * yang sama dengan ThemeProvider admin ("theme-mode"/"theme") supaya
 * preferensi konsisten antara halaman publik dan area admin.
 * Script anti-flash di layout root sudah memasang class .dark sebelum
 * paint; komponen ini hanya menyinkronkan ikon dan menangani klik.
 */
function resolveDark(): boolean {
  const mode =
    localStorage.getItem("theme-mode") ??
    localStorage.getItem("theme") ??
    "light";
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute(
    "data-color-scheme",
    dark ? "dark" : "light",
  );
}

export function ThemeToggle() {
  // Lazy initializer seperti ThemeProvider admin: preferensi dibaca
  // sekali saat render pertama, effect hanya dipakai untuk efek samping
  // murni (menulis class .dark), bukan setState.
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return resolveDark();
  });

  useEffect(() => {
    applyDark(dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme-mode", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
    applyDark(next);
  };

  return (
    <button
      aria-label={dark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      aria-pressed={dark}
      className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
      onClick={toggle}
      suppressHydrationWarning
      title={dark ? "Mode terang" : "Mode gelap"}
      type="button"
    >
      <span
        aria-hidden="true"
        className={`${materialIconClass} text-[20px]`}
        suppressHydrationWarning
      >
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
