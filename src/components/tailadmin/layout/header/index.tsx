"use client";

import { Button } from "@/components/tailadmin/ui/button";
import { useSidebar } from "@/components/tailadmin/ui/sidebar";
import Link from "next/link";
import {
  EyeIcon,
  HorizontalDotsIcon,
  MenuTwoIcon,
  XIcon,
} from "@/components/tailadmin/icons";
import ThemeToggleButton from "@/components/tailadmin/layout/header/theme-toggler";
import UserDropdown from "@/components/tailadmin/layout/header/user-dropdown";
import { cn } from "@/components/tailadmin/utils";
import { useState } from "react";

// Header TailAdmin asli (src/layout/app-layout/header/index.tsx), diadaptasi
// untuk panel Desa:
// - Teks diterjemahkan ke Bahasa Indonesia (template memakai next-intl).
// - Kolom pencarian dan dropdown notifikasi template TIDAK dipakai: keduanya
//   tidak punya fungsi di panel ini dan tidak boleh jadi hiasan mati.
// - Ditambah tautan "Lihat situs" (fungsional, membuka halaman publik) dan
//   logo teks Desa untuk tampilan seluler, menggantikan file logo TailAdmin.
export default function AppHeader({
  logoutAction,
}: {
  logoutAction: () => Promise<void>;
}) {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { openMobile, toggleSidebar } = useSidebar();

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full shrink-0 border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        {/* Left side content */}
        <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 xl:py-4 dark:border-gray-800">
          <Button
            variant="outline"
            size="icon"
            className="text-gray-500 lg:size-11 dark:text-gray-400"
            onClick={toggleSidebar}
            aria-label="Buka/tutup sidebar"
          >
            {openMobile ? (
              <XIcon className="size-6" />
            ) : (
              <MenuTwoIcon className="size-auto! rtl:-scale-x-100" />
            )}
          </Button>

          <Link
            href="/admin"
            className="flex items-center gap-2 text-base font-semibold text-gray-800 xl:hidden dark:text-white/90"
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white"
            >
              ML
            </span>
            Desa Margo Lestari
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleApplicationMenu}
            aria-label="Buka/tutup menu aplikasi"
            className="text-gray-700 xl:hidden dark:text-gray-400"
          >
            <HorizontalDotsIcon />
          </Button>
        </div>

        {/* Right side content */}
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md xl:flex xl:justify-end xl:px-0 xl:shadow-none",
            isApplicationMenuOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <Button variant="outline" size="sm" render={<Link href="/" />}>
              <EyeIcon />
              Lihat situs
            </Button>
            <ThemeToggleButton />
          </div>
          <UserDropdown logoutAction={logoutAction} />
        </div>
      </div>
    </header>
  );
}
