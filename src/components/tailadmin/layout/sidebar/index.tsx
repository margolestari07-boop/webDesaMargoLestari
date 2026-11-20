"use client";

import {
  Sidebar,
  SidebarContent,
  useSidebar,
} from "@/components/tailadmin/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_GROUPS } from "./data";
import AppSidebarHeader from "./sidebar-header";
import SidebarNavGroup from "./sidebar-nav-group";

// Adaptasi dari template asli: template hanya punya tiga seksi tetap
// (main/support/others dengan MenuType). Panel Desa punya tujuh grup modul,
// jadi seksi dibangun dari NAV_GROUPS dan kunci submenu memakai key grup
// (string), bukan MenuType. Mekanisme buka/tutup submenu dipertahankan.
type OpenSubmenu = { key: string; index: number } | null;

const findMatchingSubmenu = (path: string): OpenSubmenu => {
  for (const section of NAV_GROUPS) {
    for (let index = 0; index < section.items.length; index++) {
      const nav = section.items[index];
      if (nav.subItems?.some((subItem) => subItem.path === path)) {
        return { key: section.key, index };
      }
    }
  }
  return null;
};

export default function AppSidebar() {
  const { open, isMobile, isHovered } = useSidebar();
  const pathname = usePathname();

  const showContent = open || isHovered || isMobile;

  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenu>(() =>
    findMatchingSubmenu(pathname),
  );

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenSubmenu(findMatchingSubmenu(pathname));
  }

  const handleSubmenuToggle = (index: number, key: string) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.key === key &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { key, index };
    });
  };

  const activeSections = NAV_GROUPS.filter(
    (section) => section.items.length > 0,
  );

  return (
    <Sidebar side="left" collapsible="icon">
      <AppSidebarHeader showContent={showContent} />

      <SidebarContent className="overflow-y-auto px-5 duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {activeSections.map((section) => (
              <SidebarNavGroup
                key={section.key}
                label={section.label}
                groupKey={section.key}
                items={section.items}
                openSubmenu={openSubmenu}
                showContent={showContent}
                pathname={pathname}
                onToggleSubmenu={handleSubmenuToggle}
              />
            ))}
          </div>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
