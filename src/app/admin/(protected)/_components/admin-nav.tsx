"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Umum",
    items: [{ href: "/admin", label: "Ringkasan" }],
  },
  {
    title: "Beranda",
    items: [
      { href: "/admin/beranda", label: "Konten Beranda" },
      { href: "/admin/struktur", label: "Struktur organisasi" },
    ],
  },
  {
    title: "Profil Desa",
    items: [
      { href: "/admin/profil", label: "Profil Desa" },
      { href: "/admin/struktur", label: "Struktur organisasi" },
    ],
  },
  {
    title: "Kependudukan",
    items: [{ href: "/admin/kependudukan", label: "Laporan Kependudukan" }],
  },
  {
    title: "APBDes",
    items: [{ href: "/admin/apbdes", label: "Laporan APBDes" }],
  },
  {
    title: "Akun & keamanan",
    items: [{ href: "/admin/akun", label: "Akun saya" }],
  },
  {
    title: "Pengaturan",
    items: [{ href: "/admin/pengaturan", label: "Pengaturan situs" }],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-controls="admin-sidebar-nav"
        aria-expanded={open}
        className="admin-menu-toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? "Tutup menu" : "Buka menu"}
      </button>
      <nav
        aria-label="Navigasi panel pengelola"
        className={`admin-sidebar${open ? " admin-sidebar-open" : ""}`}
        id="admin-sidebar-nav"
      >
        {NAV_GROUPS.map((group) => (
          <section
            aria-label={group.title}
            className="admin-nav-group"
            key={`${group.title}-${group.items[0]?.href ?? ""}`}
          >
            <h2 className="admin-nav-group-title">{group.title}</h2>
            <ul className="admin-nav-list">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.href}`}>
                  <Link
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className={`admin-nav-link${
                      isActive(pathname, item.href)
                        ? " admin-nav-link-active"
                        : ""
                    }`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="admin-nav-note">
          Struktur organisasi dikelola di satu tempat dan dipakai Beranda dan
          Profil Desa.
        </p>
      </nav>
    </>
  );
}
