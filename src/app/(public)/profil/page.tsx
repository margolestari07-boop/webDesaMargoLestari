import type { Metadata } from "next";
import ProfileContent from "./profile-content";

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Margo Lestari" },
};

export default function ProfilePage() {
  return <ProfileContent />;
}
