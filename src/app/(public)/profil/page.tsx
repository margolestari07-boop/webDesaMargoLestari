import type { Metadata } from "next";
import ProfileContent from "./profile-content";
import { getOfficers, getPopulation, getProfile } from "@/lib/content/public";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: { absolute: "Profil Desa Margo Lestari" },
};

/**
 * Profil dinamis: sejarah, SOTK, batas wilayah, dan kartu geografis
 * dibaca dari database. Bila belum ada data di database, komponen
 * memakai konten statis yang sama (fallback).
 */
export default async function ProfilePage() {
  const [profile, officers, population, settings] = await Promise.all([
    getProfile(),
    getOfficers(),
    getPopulation(),
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
