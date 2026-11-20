// Navigasi panel admin Desa Margo Lestari.
//
// Struktur mengikuti pola data navigasi TailAdmin asli
// (src/layout/app-layout/sidebar/data.tsx): daftar item dengan ikon SVG
// TailAdmin dan label. Bedanya, label ditulis langsung di sini (template
// memakai next-intl) dan grupnya mengikuti pengelompokan modul Desa —
// Struktur organisasi sengaja ditautkan dari Beranda dan Profil Desa,
// sama seperti sebelumnya.
import {
  GearIcon,
  LayoutGridIcon,
  LayoutIcon,
  PageIcon,
  PieChartIcon,
  TableIcon,
  UserCircleIcon,
  UsersIcon,
} from "@/components/tailadmin/icons";
import type { NavItem } from "./types";

export type NavGroup = {
  key: string;
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "umum",
    label: "Umum",
    items: [
      {
        key: "ringkasan",
        label: "Ringkasan",
        icon: <LayoutGridIcon className="size-6" />,
        path: "/admin",
      },
    ],
  },
  {
    key: "beranda",
    label: "Beranda",
    items: [
      {
        key: "konten-beranda",
        label: "Konten Beranda",
        icon: <LayoutIcon className="size-6" />,
        path: "/admin/beranda",
      },
      {
        key: "struktur-beranda",
        label: "Struktur organisasi",
        icon: <UsersIcon className="size-6" />,
        path: "/admin/struktur",
      },
    ],
  },
  {
    key: "profil",
    label: "Profil Desa",
    items: [
      {
        key: "profil-desa",
        label: "Profil Desa",
        icon: <PageIcon className="size-6" />,
        path: "/admin/profil",
      },
      {
        key: "struktur-profil",
        label: "Struktur organisasi",
        icon: <UsersIcon className="size-6" />,
        path: "/admin/struktur",
      },
    ],
  },
  {
    key: "kependudukan",
    label: "Kependudukan",
    items: [
      {
        key: "laporan-kependudukan",
        label: "Laporan Kependudukan",
        icon: <TableIcon className="size-6" />,
        path: "/admin/kependudukan",
      },
    ],
  },
  {
    key: "apbdes",
    label: "APBDes",
    items: [
      {
        key: "laporan-apbdes",
        label: "Laporan APBDes",
        icon: <PieChartIcon className="size-6" />,
        path: "/admin/apbdes",
      },
    ],
  },
  {
    key: "akun",
    label: "Akun & keamanan",
    items: [
      {
        key: "akun-saya",
        label: "Akun saya",
        icon: <UserCircleIcon className="size-6" />,
        path: "/admin/akun",
      },
    ],
  },
  {
    key: "pengaturan",
    label: "Pengaturan",
    items: [
      {
        key: "pengaturan-situs",
        label: "Pengaturan situs",
        icon: <GearIcon className="size-6" />,
        path: "/admin/pengaturan",
      },
    ],
  },
];
