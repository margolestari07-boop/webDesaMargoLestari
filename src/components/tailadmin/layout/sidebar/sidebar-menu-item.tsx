"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/tailadmin/ui/collapsible";
import { SidebarMenuItem as UiSidebarMenuItem } from "@/components/tailadmin/ui/sidebar";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/tailadmin/icons";
import { cn } from "@/components/tailadmin/utils";
import SidebarSubmenuItem from "./sidebar-submenu-item";
import { NavItem } from "./types";

interface SidebarMenuItemProps {
  nav: NavItem;
  isOpen: boolean;
  showContent: boolean;
  pathname: string;
  onToggle: () => void;
}

export default function SidebarMenuItem({
  nav,
  isOpen,
  showContent,
  pathname,
  onToggle,
}: SidebarMenuItemProps) {
  // Adaptasi dari template asli: label ditulis langsung di data navigasi
  // (template memakai next-intl), dan badge "new"/"pro" template tidak
  // dipakai karena menu Desa tidak punya penanda itu.
  const hasSubItems = Boolean(nav.subItems?.length);
  const hasActiveChild = Boolean(
    nav.subItems?.some((subItem) => subItem.path === pathname),
  );
  const isDirectActive = Boolean(nav.path && nav.path === pathname);
  const isItemActive = hasSubItems ? isOpen || hasActiveChild : isDirectActive;
  const isPanelOpen = showContent && isOpen;

  return (
    <UiSidebarMenuItem>
      {hasSubItems ? (
        <Collapsible open={isPanelOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger
            className={cn(
              "group menu-item cursor-pointer",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
              !showContent ? "lg:justify-center" : "lg:justify-start",
            )}
          >
            <span
              className={cn(
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            {showContent && (
              <span className="menu-item-text">{nav.label}</span>
            )}
            {showContent && (
              <ChevronDownIcon
                className={cn(
                  "ms-auto h-5 w-5 transition-transform duration-200",
                  isOpen ? "rotate-180 text-brand-500" : "",
                )}
              />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="ms-9 mt-2 space-y-1">
              {nav.subItems?.map((subItem) => (
                <SidebarSubmenuItem
                  key={subItem.key}
                  subItem={subItem}
                  isActive={subItem.path === pathname}
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        nav.path && (
          <Link
            href={nav.path}
            target={nav.target}
            className={cn(
              "group menu-item",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
              !showContent ? "lg:justify-center" : "lg:justify-start",
            )}
          >
            <span
              className={cn(
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            {showContent && (
              <span className="menu-item-text">{nav.label}</span>
            )}
          </Link>
        )
      )}
    </UiSidebarMenuItem>
  );
}
