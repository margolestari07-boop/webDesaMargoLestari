import type { Metadata } from "next";
import HomepageContent from "./homepage-content";
import {
  getPublishedHome,
  getPublishedPopulation,
} from "@/lib/content/published";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: { absolute: "Beranda Resmi Desa Margo Lestari" },
};

/**
 * Beranda dinamis: hero, pejabat, statistik, dan galeri dibaca dari
 * revisi terbit di database. Bila belum ada revisi terbit, komponen
 * memakai konten statis yang sama (fallback), jadi halaman tidak pernah
 * kosong. Draf tidak pernah tampil di sini.
 */
export default async function Home() {
  const [home, population, settings] = await Promise.all([
    getPublishedHome(),
    getPublishedPopulation(),
    getPublicSiteSettings(),
  ]);

  return (
    <HomepageContent home={home} population={population} settings={settings} />
  );
}
