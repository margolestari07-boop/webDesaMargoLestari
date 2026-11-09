import type { Metadata } from "next";
import InfografisContent from "./infografis-content";

export const metadata: Metadata = {
  title: { absolute: "Infografis Kependudukan Desa Sukamaju" },
};

export default function InfografisPage() {
  return <InfografisContent />;
}
