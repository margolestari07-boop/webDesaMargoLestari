import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import InfografisContent from "./infografis-content";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-portal",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan Desa Sukamaju" },
};

export default function InfografisPage() {
  return <InfografisContent fontClassName={plusJakarta.variable} />;
}
