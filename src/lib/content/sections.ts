import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";

type Client = SupabaseClient<Database>;

export const SECTION_KEYS = ["home", "profile", "population", "apbdes"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
export type RevisionStatus = "draft" | "published" | "archived";

export type ContentSectionRow = Tables<"content_sections">;
export type ContentRevisionRow = Tables<"content_revisions">;

export type PublishedSection = {
  section: ContentSectionRow;
  revision: ContentRevisionRow;
};

async function getSectionByKey(client: Client, key: SectionKey) {
  const { data, error } = await client
    .from("content_sections")
    .select("*")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

/**
 * Baca konten publik: hanya revisi yang ditunjuk oleh
 * content_sections.published_revision_id dan berstatus published.
 * Revisi kerja tidak pernah terlihat dari fungsi ini. Aman dipakai dengan
 * anon client di route publik.
 */
export async function getPublishedSection(
  client: Client,
  key: SectionKey,
): Promise<PublishedSection | null> {
  const section = await getSectionByKey(client, key);
  if (!section || !section.published_revision_id) return null;

  const { data: revision, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("id", section.published_revision_id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !revision) return null;
  return { section, revision };
}

/**
 * Ambil revisi kerja terbaru dari satu section. Harus dipanggil dengan
 * client admin (mis. dari requireAdmin): RLS menolak anon dan user biasa.
 */
export async function getWorkingRevision(
  client: Client,
  key: SectionKey,
): Promise<ContentRevisionRow | null> {
  const section = await getSectionByKey(client, key);
  if (!section) return null;

  const { data, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("section_id", section.id)
    .eq("status", "draft")
    .order("revision_no", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

/**
 * Daftar riwayat revisi satu section, nomor revisi terbaru dulu.
 * Harus dipanggil dengan client admin.
 */
export async function listRevisions(
  client: Client,
  key: SectionKey,
  limit = 20,
): Promise<ContentRevisionRow[]> {
  const section = await getSectionByKey(client, key);
  if (!section) return [];

  const { data, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("section_id", section.id)
    .order("revision_no", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data;
}
