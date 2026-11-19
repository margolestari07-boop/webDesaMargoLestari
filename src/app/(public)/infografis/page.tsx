import type { Metadata } from "next";
import InfografisContent from "./infografis-content";
import { PublishedPopulationBlock } from "../_components/published-data";
import { getPublishedPopulation } from "@/lib/content/published";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan | Desa Margo Lestari" },
  description:
    "Infografis kependudukan Desa Margo Lestari berdasarkan Profil Desa 2025, dengan catatan pada rincian yang masih perlu diverifikasi.",
};

/**
 * Konten statis Infografis dipertahankan apa adanya (dipakai smoke test).
 * Blok "Laporan kependudukan terbit" di bawah ini bersifat aditif:
 * menampilkan laporan yang sudah diterbitkan admin bila ada, atau
 * "Belum tersedia" bila belum ada revisi terbit. Draf tidak pernah
 * tampil di sini.
 */
export default async function InfografisPage() {
  const population = await getPublishedPopulation();

  return (
    <>
      <InfografisContent />
      <PublishedPopulationBlock population={population} />
    </>
  );
}
