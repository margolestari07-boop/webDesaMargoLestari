"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/tailadmin/ui/sidebar";
import { HorizontalDotsIcon } from "@/components/tailadmin/icons";
import { cn } from "@/components/tailadmin/utils";
import SidebarMenuItem from "./sidebar-menu-item";
import { NavItem } from "./types";

interface SidebarNavGroupProps {
  // Adaptasi dari template asli: label grup ditulis langsung (template
  // memakai next-intl dengan labelKey).
  label: string;
  groupKey: string;
  items: NavItem[];
  openSubmenu: { key: string; index: number } | null;
  showContent: boolean;
  pathname: string;
  onToggleSubmenu: (index: number, groupKey: string) => void;
}

export default function SidebarNavGroup({
  label,
  groupKey,
  items,
  openSubmenu,
  showContent,
  pathname,
  onToggleSubmenu,
}: SidebarNavGroupProps) {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel
        className={cn(
          "mb-4 flex h-auto p-0 text-xs leading-5 text-gray-400 uppercase",
          !showContent ? "xl:justify-center" : "justify-start",
        )}
      >
        {showContent ? label : <HorizontalDotsIcon />}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((nav, index) => (
          <SidebarMenuItem
            key={nav.key}
            nav={nav}
            isOpen={
              openSubmenu?.key === groupKey && openSubmenu?.index === index
            }
            showContent={showContent}
            pathname={pathname}
            onToggle={() => onToggleSubmenu(index, groupKey)}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
