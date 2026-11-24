"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/tailadmin/ui/dropdown";
import {
  ChevronDownIcon,
  GearIcon,
  LogOutIcon,
  UserCircleIcon,
} from "@/components/tailadmin/icons";
import { cn } from "@/components/tailadmin/utils";
import Link from "next/link";
import { useState } from "react";

// Dropdown pengguna TailAdmin asli
// (src/layout/header/user-dropdown/index.tsx), diadaptasi untuk panel Desa:
// - Tanpa next-intl dan tanpa pemilih bahasa (situs hanya berbahasa
//   Indonesia); tanpa foto profil template.
// - Menu: "Akun saya" (/admin/akun), "Pengaturan situs" (/admin/pengaturan),
//   dan "Keluar" yang memakai server action logout yang sudah ada.
//   Aksi logout diteruskan sebagai prop dari layout server.
export default function UserDropdown({
  logoutAction,
}: {
  logoutAction: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="dropdown-toggle flex items-center text-gray-700">
        <span
          aria-hidden="true"
          className="me-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-brand-500 text-base font-bold text-white"
        >
          A
        </span>

        <span className="me-1 block text-sm font-medium">Admin</span>

        <ChevronDownIcon
          className={cn(
            "size-5 text-gray-500 duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={12} className="w-65 p-3">
        <div className="px-3 py-2">
          <span className="block text-sm font-medium text-gray-700">
            Admin Desa
          </span>
          <span className="mt-0.5 block text-xs text-gray-500">
            Panel Pengelola
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href="/admin/akun" />}>
          <UserCircleIcon className="size-6" />
          Akun saya
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/admin/pengaturan" />}>
          <GearIcon className="size-6" />
          Pengaturan situs
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          render={<form action={logoutAction} className="w-full" />}
        >
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-3 bg-transparent p-0 text-start text-sm font-medium"
          >
            <LogOutIcon className="size-6" />
            Keluar
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
