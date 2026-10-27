import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ProfileContent from "./profile-content";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-portal",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Sukamaju" },
};

export default function ProfilePage() {
  return <ProfileContent fontClassName={plusJakarta.variable} />;
}
