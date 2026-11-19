"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AdminNav, NAV_GROUPS } from "./admin-nav";

function findCrumb(pathname: string): { group: string; item: string } {
  // Cocok persis didahulukan supaya /admin/beranda/struktur tidak
  // tertukar dengan /admin/beranda.
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (pathname === item.href) {
        return { group: group.title, item: item.label };
      }
    }
  }
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)) {
        return { group: group.title, item: item.label };
      }
    }
  }
  return { group: "Panel pengelola", item: "Ringkasan" };
}

/**
 * Kerangka dashboard ala TailAdmin: sidebar gelap di kiri (drawer di HP),
 * topbar putih dengan breadcrumb, dan area konten. State drawer hanya
 * urusan presentasi; otorisasi tetap di requireAdmin pada layout server.
 */
export function AdminShell({
  brand,
  topbarActions,
  children,
}: {
  brand: ReactNode;
  topbarActions: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const crumb = findCrumb(pathname);

  return (
    <div className="admin-shell">
      <a className="skip-link" href="#admin-main">
        Langsung ke konten panel
      </a>
      {open ? (
        <button
          aria-label="Tutup menu navigasi"
          className="admin-backdrop"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}
      <aside
        aria-label="Panel samping pengelola"
        className={`admin-sidebar${open ? " admin-sidebar-open" : ""}`}
      >
        {brand}
        <AdminNav onNavigate={() => setOpen(false)} />
      </aside>
      <div className="admin-content">
        <header className="admin-topbar">
          <button
            aria-controls="admin-sidebar-nav"
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="admin-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined">
              menu
            </span>
          </button>
          <nav aria-label="Breadcrumb" className="admin-topbar-breadcrumb">
            <span>{crumb.group}</span>
            <span aria-hidden="true" className="separator">
              /
            </span>
            <strong>{crumb.item}</strong>
          </nav>
          <div className="admin-topbar-actions">{topbarActions}</div>
        </header>
        <main className="admin-main" id="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
