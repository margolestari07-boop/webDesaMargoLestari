import React from "react";

export interface SubItem {
  key: string;
  // Adaptasi dari template asli: TailAdmin mengambil label dari next-intl
  // (t(`items.${key}`)). Situs Desa tidak memakai i18n, jadi label ditulis
  // langsung di data navigasi.
  label: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  target?: string;
}

export interface NavItem {
  key: string;
  // Label tampil di sidebar (lihat catatan di SubItem).
  label: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
  subItems?: SubItem[];
}
