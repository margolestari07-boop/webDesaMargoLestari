import type { Metadata } from "next";
import HomepageContent from "./homepage-content";

export const metadata: Metadata = {
  title: { absolute: "Beranda Resmi Desa Sukamaju" },
};

export default function Home() {
  return <HomepageContent />;
}
