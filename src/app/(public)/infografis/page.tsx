import type { Metadata } from "next";
import InfografisContent from "./infografis-content";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan | Desa Margo Lestari" },
  description:
    "Infografis kependudukan Desa Margo Lestari berdasarkan Profil Desa 2025, dengan catatan pada rincian yang masih perlu diverifikasi.",
};

export default function InfografisPage() {
  return <InfografisContent />;
}
