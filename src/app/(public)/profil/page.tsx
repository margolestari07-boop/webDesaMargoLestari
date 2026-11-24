import type { Metadata } from "next";
import ProfileContent from "./profile-content";
import {
  getPublishedOfficers,
  getPublishedPopulation,
  getPublishedProfile,
} from "@/lib/content/published";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Margo Lestari" },
};

/**
 * Profil dinamis: sejarah, SOTK, batas wilayah, dan kartu geografis
 * dibaca dari revisi terbit di database. Bila belum ada revisi terbit,
 * komponen memakai konten statis yang sama (fallback). Draf tidak
 * pernah tampil di sini.
 */
export default async function ProfilePage() {
  const [profile, officers, population, settings] = await Promise.all([
    getPublishedProfile(),
    getPublishedOfficers(),
    getPublishedPopulation(),
    getPublicSiteSettings(),
  ]);

  return (
    <ProfileContent
      officers={officers}
      population={population}
      profile={profile}
      settings={settings}
    />
  );
}
