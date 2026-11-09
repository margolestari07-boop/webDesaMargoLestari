export const siteIdentity = {
  name: "Desa Margo Lestari",
  district: "Kabupaten Lampung Selatan",
  province: "Provinsi Lampung",
  regionSignature: "Lampung Selatan · Lampung",
  subdistrict: {
    default: "Tanjung Bintang",
    needsVerification: true,
    conflict: "Jati Agung",
  },
} as const;

export const navigationItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Desa" },
  { href: "/infografis", label: "Infografis" },
  { href: "/berita", label: "Berita" },
] as const;
