import type { Metadata } from "next";
import ProfileContent from "./profile-content";
import { PublishedProfileBlock } from "../_components/published-data";
import {
  getPublishedOfficers,
  getPublishedProfile,
} from "@/lib/content/published";

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Margo Lestari" },
};

/**
 * Konten statis Profil dipertahankan apa adanya (dipakai smoke test).
 * Blok "Data profil terbit" di bawah ini bersifat aditif: menampilkan
 * data yang sudah diterbitkan admin bila ada, atau "Belum tersedia" bila
 * belum ada revisi terbit. Draf tidak pernah tampil di sini.
 */
export default async function ProfilePage() {
  const [profile, officers] = await Promise.all([
    getPublishedProfile(),
    getPublishedOfficers(),
  ]);

  return (
    <>
      <ProfileContent />
      <PublishedProfileBlock officers={officers} profile={profile} />
    </>
  );
}
