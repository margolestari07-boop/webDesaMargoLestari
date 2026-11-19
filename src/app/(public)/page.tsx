import type { Metadata } from "next";
import HomepageContent from "./homepage-content";
import { PublishedHomeBlock } from "./_components/published-data";
import {
  getPublishedHome,
  getPublishedPopulation,
} from "@/lib/content/published";

export const metadata: Metadata = {
  title: { absolute: "Beranda Resmi Desa Margo Lestari" },
};

/**
 * Konten statis Beranda dipertahankan apa adanya (dipakai smoke test).
 * Blok "Data terbit" di bawah ini bersifat aditif: menampilkan data yang
 * sudah diterbitkan admin bila ada, atau "Belum tersedia" bila belum ada
 * revisi terbit. Draf tidak pernah tampil di sini.
 */
export default async function Home() {
  const [home, population] = await Promise.all([
    getPublishedHome(),
    getPublishedPopulation(),
  ]);

  return (
    <>
      <HomepageContent />
      <PublishedHomeBlock home={home} population={population} />
    </>
  );
}
