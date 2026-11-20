"use client";

import Link from "next/link";
import { cn } from "@/components/tailadmin/utils";
import { SubItem } from "./types";

interface SidebarSubmenuItemProps {
  subItem: SubItem;
  isActive: boolean;
}

export default function SidebarSubmenuItem({
  subItem,
  isActive,
}: SidebarSubmenuItemProps) {
  // Adaptasi dari template asli: label ditulis langsung (template memakai
  // next-intl), dan badge "new"/"pro" template tidak dipakai.
  return (
    <li>
      <Link
        href={subItem.path}
        target={subItem.target}
        className={cn(
          "group menu-dropdown-item",
          isActive
            ? "menu-dropdown-item-active"
            : "menu-dropdown-item-inactive",
        )}
      >
        {subItem.label}
      </Link>
    </li>
  );
}
