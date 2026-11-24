import type { Metadata } from "next";
import InfografisContent from "./infografis-content";
import { getPublishedPopulation } from "@/lib/content/published";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan | Desa Margo Lestari" },
  description:
    "Infografis kependudukan Desa Margo Lestari berdasarkan Profil Desa 2025, dengan catatan pada rincian yang masih perlu diverifikasi.",
};

/**
 * Infografis dinamis: metrik, luas wilayah, dan pekerjaan dibaca dari
 * laporan kependudukan terbit di database. Bila belum ada revisi terbit,
 * komponen memakai angka statis yang sama (fallback). Draf tidak pernah
 * tampil di sini.
 */
export default async function InfografisPage() {
  const population = await getPublishedPopulation();

  return <InfografisContent population={population} />;
}
