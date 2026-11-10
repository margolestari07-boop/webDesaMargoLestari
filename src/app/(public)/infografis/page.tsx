import type { Metadata } from "next";
import InfografisContent from "./infografis-content";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan | Desa Margo Lestari" },
  description:
    "Informasi kependudukan Desa Margo Lestari. Data akan ditampilkan setelah diverifikasi oleh pemerintah desa.",
};

export default function InfografisPage() {
  return <InfografisContent />;
}
