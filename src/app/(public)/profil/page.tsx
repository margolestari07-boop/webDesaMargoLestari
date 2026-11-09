import type { Metadata } from "next";
import ProfileContent from "./profile-content";

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Sukamaju" },
};

export default function ProfilePage() {
  return <ProfileContent />;
}
