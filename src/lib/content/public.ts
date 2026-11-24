import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";
import { createClient } from "@/lib/supabase/server";
import {
  loadApbdesData,
  loadHomeData,
  loadOfficers,
  loadPopulationData,
  loadProfileData,
  type ApbdesData,
  type HomeData,
  type PopulationData,
  type ProfileData,
} from "./data";

type Client = SupabaseClient<Database>;

/**
 * Loader publik yang aman: tidak pernah melempar. Bila env Supabase
 * belum ada atau tabel belum ada isinya, kembalikan null agar halaman
 * publik tetap menampilkan konten statis yang ada. Semua data di
 * database kini langsung live, jadi tidak ada lagi filter revisi terbit.
 */
export async function safeAnonClient(): Promise<Client | null> {
  try {
    return await createClient();
  } catch {
    return null;
  }
}

async function loadPublicData<T>(
  load: (client: Client) => Promise<T>,
): Promise<T | null> {
  const client = await safeAnonClient();
  if (!client) return null;
  try {
    return await load(client);
  } catch {
    return null;
  }
}

export async function getPopulation(): Promise<PopulationData | null> {
  return loadPublicData(loadPopulationData);
}

export async function getProfile(): Promise<ProfileData | null> {
  return loadPublicData(loadProfileData);
}

export async function getHome(): Promise<HomeData | null> {
  return loadPublicData(loadHomeData);
}

export async function getApbdes(): Promise<ApbdesData | null> {
  return loadPublicData(loadApbdesData);
}

/** Pejabat (sumber tunggal: tabel village_officers) untuk halaman publik. */
export async function getOfficers(): Promise<
  Tables<"village_officers">[] | null
> {
  return loadPublicData(loadOfficers);
}
