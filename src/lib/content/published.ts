import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { createClient } from "@/lib/supabase/server";
import { getPublishedSection } from "./sections";
import {
  loadApbdesRevision,
  loadHomeRevision,
  loadPopulationRevision,
  loadProfileRevision,
  type ApbdesRevisionData,
  type HomeRevisionData,
  type PopulationRevisionData,
  type ProfileRevisionData,
} from "./drafts";
import type { SectionKey } from "./sections";

type Client = SupabaseClient<Database>;

/**
 * Loader publik yang aman: tidak pernah melempar. Bila env Supabase
 * belum ada, tabel belum ada, atau belum ada revisi terbit, kembalikan
 * null agar halaman publik tetap menampilkan konten statis yang ada.
 */
export async function safeAnonClient(): Promise<Client | null> {
  try {
    return await createClient();
  } catch {
    return null;
  }
}

async function loadPublishedRevisionData<T>(
  key: SectionKey,
  load: (client: Client, revisionId: string) => Promise<T>,
): Promise<{ revisionId: string; data: T } | null> {
  const client = await safeAnonClient();
  if (!client) return null;
  try {
    const published = await getPublishedSection(client, key);
    if (!published) return null;
    const data = await load(client, published.revision.id);
    return { revisionId: published.revision.id, data };
  } catch {
    return null;
  }
}

export async function getPublishedPopulation(): Promise<{
  revisionId: string;
  data: PopulationRevisionData;
} | null> {
  return loadPublishedRevisionData("population", loadPopulationRevision);
}

export async function getPublishedProfile(): Promise<{
  revisionId: string;
  data: ProfileRevisionData;
} | null> {
  return loadPublishedRevisionData("profile", loadProfileRevision);
}

export async function getPublishedHome(): Promise<{
  revisionId: string;
  data: HomeRevisionData;
} | null> {
  return loadPublishedRevisionData("home", loadHomeRevision);
}

export async function getPublishedApbdes(): Promise<{
  revisionId: string;
  data: ApbdesRevisionData;
} | null> {
  return loadPublishedRevisionData("apbdes", loadApbdesRevision);
}

/** Pejabat terbit (sumber tunggal: revisi Beranda) untuk halaman publik. */
export async function getPublishedOfficers(): Promise<
  HomeRevisionData["officers"] | null
> {
  const published = await getPublishedHome();
  return published ? published.data.officers : null;
}
