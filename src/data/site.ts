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
  { href: "/profil", label: "Profil" },
  { href: "/sejarah", label: "Sejarah" },
  { href: "/potensi", label: "Potensi" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/layanan", label: "Layanan" },
  { href: "/transparansi", label: "Transparansi" },
  { href: "/lokasi", label: "Lokasi" },
  { href: "/kontak", label: "Kontak" },
] as const;
