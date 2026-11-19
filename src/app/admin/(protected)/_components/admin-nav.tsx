"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; icon: string };
export type NavGroup = { title: string; items: NavItem[] };

/** Struktur organisasi sengaja ditautkan dari Beranda dan Profil Desa. */
export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Umum",
    items: [{ href: "/admin", label: "Ringkasan", icon: "dashboard" }],
  },
  {
    title: "Beranda",
    items: [
      { href: "/admin/beranda", label: "Konten Beranda", icon: "home" },
      {
        href: "/admin/struktur",
        label: "Struktur organisasi",
        icon: "account_tree",
      },
    ],
  },
  {
    title: "Profil Desa",
    items: [
      { href: "/admin/profil", label: "Profil Desa", icon: "badge" },
      {
        href: "/admin/struktur",
        label: "Struktur organisasi",
        icon: "account_tree",
      },
    ],
  },
  {
    title: "Kependudukan",
    items: [
      {
        href: "/admin/kependudukan",
        label: "Laporan Kependudukan",
        icon: "groups",
      },
    ],
  },
  {
    title: "APBDes",
    items: [
      {
        href: "/admin/apbdes",
        label: "Laporan APBDes",
        icon: "account_balance_wallet",
      },
    ],
  },
  {
    title: "Akun & keamanan",
    items: [
      { href: "/admin/akun", label: "Akun saya", icon: "manage_accounts" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        href: "/admin/pengaturan",
        label: "Pengaturan situs",
        icon: "settings",
      },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Daftar navigasi sidebar. Drawer dibuka/ditutup oleh AdminShell. */
export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label="Navigasi panel pengelola" id="admin-sidebar-nav">
        {NAV_GROUPS.map((group) => (
          <section
            aria-label={group.title}
            className="admin-nav-group"
            key={group.title}
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
                    onClick={onNavigate}
                  >
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined"
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <p className="admin-nav-note">
        Struktur organisasi dikelola di satu tempat dan dipakai Beranda dan
        Profil Desa.
      </p>
    </>
  );
}
