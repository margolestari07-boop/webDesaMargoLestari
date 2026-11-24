"use client";

import type { ReactNode } from "react";
import AppHeader from "@/components/tailadmin/layout/header";
import AppSidebar from "@/components/tailadmin/layout/sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/tailadmin/ui/sidebar";

// Shell admin TailAdmin asli (src/app/[locale]/(admin)/layout.tsx template):
// SidebarProvider + AppSidebar + SidebarInset + AppHeader.
// className "ta-root" mengaktifkan reset dasar TailAdmin yang di-scoping
// hanya untuk area admin (lihat globals.css).
// logout diteruskan sebagai server action ke AppHeader.
export function AdminShell({
  children,
  logoutAction,
}: {
  children: ReactNode;
  logoutAction: () => Promise<void>;
}) {
  return (
    <SidebarProvider className="ta-root">
      <AppSidebar />
      <SidebarInset>
        <AppHeader logoutAction={logoutAction} />
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
