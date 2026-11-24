import type { Metadata } from "next";
import InfografisContent from "./infografis-content";
import { getPopulation } from "@/lib/content/public";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan | Desa Margo Lestari" },
  description:
    "Infografis kependudukan Desa Margo Lestari berdasarkan Profil Desa 2025, dengan catatan pada rincian yang masih perlu diverifikasi.",
};

/**
 * Infografis dinamis: metrik, luas wilayah, dan pekerjaan dibaca dari
 * laporan kependudukan di database. Bila belum ada data di database,
 * komponen memakai angka statis yang sama (fallback).
 */
export default async function InfografisPage() {
  const population = await getPopulation();

  return <InfografisContent population={population} />;
}
