"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationItems } from "@/data/site";
import type { getPublicSiteSettings } from "@/lib/site-settings";

const materialIconClass = "material-symbols-outlined";

export type PublicSiteSettings = Awaited<
  ReturnType<typeof getPublicSiteSettings>
>;

export function SiteHeader({
  settings,
}: {
  settings: PublicSiteSettings;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeItem, profileItem, , newsItem] = navigationItems;
  const isInfografis = pathname === "/infografis";
  const isApbdes = pathname === "/infografis/apbdes";
  // Nama desa dari pengaturan terbit; fallback ke nama statis lama bila
  // pengaturan belum diterbitkan.
  const villageShort = (settings?.village_name ?? "Desa Margo Lestari").replace(
    /^Desa\s+/i,
    "",
  );

  // Item menu mobile: sama dengan navigasi desktop, dengan Infografis
  // dipecah menjadi dua sub-halamannya.
  const mobileItems = [
    { href: homeItem.href, label: homeItem.label },
    { href: profileItem.href, label: profileItem.label },
    { href: "/infografis", label: "Infografis Kependudukan" },
    { href: "/infografis/apbdes", label: "Transparansi APBDes" },
    ...(newsItem ? [{ href: newsItem.href, label: newsItem.label }] : []),
  ];

  return (
    <header className="bg-surface/90 fixed top-0 left-0 z-50 w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="gap-space-md px-gutter mx-auto flex h-20 max-w-7xl items-center justify-between">
        <div className="flex shrink-0 items-center gap-3">
          <img
            alt="Logo Pemerintah Desa"
            className="h-8 w-auto object-contain"
            src="/logo-pemerintah-desa.jpg"
          />
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface leading-tight tracking-tight">
              {villageShort}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Sistem Informasi Pelayanan
            </span>
          </div>
        </div>

        <nav
          aria-label="Navigasi utama"
          className="hidden flex-1 items-center justify-end gap-6 xl:flex"
          data-active-classes="text-primary font-bold"
        >
          {[homeItem, profileItem].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "font-label-md text-label-md text-primary font-bold transition-colors"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                }
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="group relative inline-block">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center gap-1 py-2 transition-colors focus:outline-none"
              id="infografis-menu-button"
              type="button"
            >
              <span>Infografis</span>
              <span
                aria-hidden="true"
                className={`${materialIconClass} text-on-surface-variant text-[16px] transition-transform duration-200 group-hover:rotate-180`}
              >
                keyboard_arrow_down
              </span>
            </button>
            <div className="absolute top-full left-0 z-50 hidden min-w-[210px] pt-1.5 group-focus-within:block group-hover:block">
              <div className="border-surface-variant/50 bg-surface-container-lowest flex flex-col gap-0.5 rounded-xl border p-1.5 shadow-lg">
                <Link
                  aria-current={isInfografis ? "page" : undefined}
                  className={
                    isInfografis
                      ? "text-body-sm text-primary hover:bg-surface-container-low flex items-center gap-2 rounded-lg px-3 py-2 font-bold transition-colors"
                      : "text-body-sm text-on-surface hover:bg-surface-container-low hover:text-primary-container flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors"
                  }
                  href="/infografis"
                >
                  <span
                    aria-hidden="true"
                    className={`${materialIconClass} text-primary text-[18px]`}
                  >
                    groups
                  </span>
                  <span>Kependudukan</span>
                </Link>
                <Link
                  aria-current={isApbdes ? "page" : undefined}
                  className={
                    isApbdes
                      ? "text-body-sm text-primary hover:bg-surface-container-low flex items-center gap-2 rounded-lg px-3 py-2 font-bold transition-colors"
                      : "text-body-sm text-on-surface hover:bg-surface-container-low hover:text-primary-container flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors"
                  }
                  href="/infografis/apbdes"
                >
                  <span
                    aria-hidden="true"
                    className={`${materialIconClass} text-primary text-[18px]`}
                  >
                    account_balance_wallet
                  </span>
                  <span>Transparansi APBDes</span>
                </Link>
              </div>
            </div>
          </div>

          {newsItem && (
            <Link
              aria-current={pathname === newsItem.href ? "page" : undefined}
              className={
                pathname === newsItem.href
                  ? "font-label-md text-label-md text-primary font-bold transition-colors"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              }
              href={newsItem.href}
            >
              {newsItem.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-1">
          {/* Hamburger: tampil saat navigasi desktop tersembunyi
              (di bawah xl), termasuk semua lebar mobile. */}
          <button
            aria-controls="menu-mobile"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-full transition-colors xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`${materialIconClass} text-[24px]`}
            >
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Navigasi utama mobile"
          className="border-outline-variant/50 bg-surface border-t xl:hidden"
          id="menu-mobile"
        >
          <ul className="px-gutter mx-auto flex max-w-7xl flex-col py-2">
            {mobileItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "font-label-md text-label-md text-primary flex min-h-12 items-center border-b border-outline-variant/40 font-bold"
                        : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex min-h-12 items-center border-b border-outline-variant/40 transition-colors"
                    }
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
