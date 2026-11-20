"use client";

import { Button } from "@/components/tailadmin/ui/button";
import { useTheme } from "@/components/tailadmin/context/theme-context";
import { MoonIcon, SunIcon } from "@/components/tailadmin/icons";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className="relative"
      aria-label="Alihkan tema gelap atau terang"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
