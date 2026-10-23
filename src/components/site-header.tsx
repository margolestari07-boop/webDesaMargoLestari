"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationItems, siteIdentity } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          aria-label={`${siteIdentity.name}, beranda`}
          className="brand"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true" className="brand-mark">
            ML
          </span>
          <span className="brand-copy">
            <strong>{siteIdentity.name}</strong>
            <small>{siteIdentity.regionSignature}</small>
          </span>
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="menu-toggle"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {menuOpen ? (
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          ) : (
            <Menu aria-hidden="true" size={20} strokeWidth={1.7} />
          )}
        </button>

        <nav
          aria-label="Navigasi utama"
          className="site-nav"
          data-open={menuOpen}
          id="primary-navigation"
        >
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
