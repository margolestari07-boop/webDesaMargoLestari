import type { Metadata } from "next";
import HomepageContent from "./homepage-content";
import { getHome, getPopulation } from "@/lib/content/public";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: { absolute: "Beranda Resmi Desa Margo Lestari" },
};

/**
 * Beranda dinamis: hero, pejabat, statistik, dan galeri dibaca dari
 * database. Bila belum ada data di database, komponen memakai konten
 * statis yang sama (fallback), jadi halaman tidak pernah kosong.
 */
export default async function Home() {
  const [home, population, settings] = await Promise.all([
    getHome(),
    getPopulation(),
    getPublicSiteSettings(),
  ]);

  return (
    <HomepageContent home={home} population={population} settings={settings} />
  );
}
