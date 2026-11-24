"use client";

import { SidebarHeader } from "@/components/tailadmin/ui/sidebar";
import Link from "next/link";
import { cn } from "@/components/tailadmin/utils";
import { siteIdentity } from "@/data/site";

interface AppSidebarHeaderProps {
  showContent: boolean;
}

// Adaptasi dari template asli: template memakai file logo TailAdmin
// (/images/logo/logo.svg). Panel Desa memakai identitas teks Desa Margo
// Lestari dengan mark inisial — tidak ada file logo TailAdmin di repo ini.
export default function AppSidebarHeader({
  showContent,
}: AppSidebarHeaderProps) {
  return (
    <SidebarHeader className="px-5 pt-5 pb-8">
      <Link
        href="/admin"
        className={cn(
          "flex items-center gap-3",
          !showContent ? "justify-center" : "justify-start",
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-base font-bold text-white"
        >
          ML
        </span>
        {showContent ? (
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-base font-semibold text-gray-800">
              {siteIdentity.name}
            </span>
            <span className="text-xs text-gray-500">
              Panel Pengelola
            </span>
          </span>
        ) : null}
      </Link>
    </SidebarHeader>
  );
}
