import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";

type Client = SupabaseClient<Database>;

export const SECTION_KEYS = ["home", "profile", "population", "apbdes"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

const SECTION_LABELS: Record<SectionKey, string> = {
  home: "Beranda",
  profile: "Profil Desa",
  population: "Kependudukan",
  apbdes: "APBDes",
};

export function sectionLabel(key: SectionKey): string {
  return SECTION_LABELS[key];
}

// ---------------------------------------------------------------------------
// Loader isi per modul (dipakai halaman admin dan halaman publik).
// Tanpa revisi: setiap tabel hanya berisi data yang sedang live, jadi
// loader membaca tabel secara langsung. Mengembalikan data kosong (bukan
// melempar) bila tabel belum ada isinya.
// ---------------------------------------------------------------------------

export type PopulationData = {
  report: Tables<"population_reports"> | null;
  areaUses: Tables<"population_area_uses">[];
  occupations: Tables<"population_occupations">[];
};

export async function loadPopulationData(
  client: Client,
): Promise<PopulationData> {
  const { data: report } = await client
    .from("population_reports")
    .select("*")
    .maybeSingle();
  if (!report) return { report: null, areaUses: [], occupations: [] };
  const { data: areaUses } = await client
    .from("population_area_uses")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  const { data: occupations } = await client
    .from("population_occupations")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  return {
    report,
    areaUses: areaUses ?? [],
    occupations: occupations ?? [],
  };
}

export type ProfileData = {
  content: Tables<"profile_content"> | null;
  boundaries: Tables<"profile_boundaries">[];
  documents: Tables<"village_documents">[];
};

export async function loadProfileData(client: Client): Promise<ProfileData> {
  const { data: content } = await client
    .from("profile_content")
    .select("*")
    .maybeSingle();
  const { data: boundaries } = await client
    .from("profile_boundaries")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: documents } = await client
    .from("village_documents")
    .select("*")
    .order("sort_order", { ascending: true });
  return {
    content: content ?? null,
    boundaries: boundaries ?? [],
    documents: documents ?? [],
  };
}

export type HomeData = {
  content: Tables<"home_content"> | null;
  officers: Tables<"village_officers">[];
  galleryItems: Tables<"home_gallery_items">[];
  mediaAssets: Tables<"media_assets">[];
};

export async function loadHomeData(client: Client): Promise<HomeData> {
  const { data: content } = await client
    .from("home_content")
    .select("*")
    .maybeSingle();
  const { data: officers } = await client
    .from("village_officers")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: galleryItems } = await client
    .from("home_gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: mediaAssets } = await client
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  return {
    content: content ?? null,
    officers: officers ?? [],
    galleryItems: galleryItems ?? [],
    mediaAssets: mediaAssets ?? [],
  };
}

export async function loadOfficers(
  client: Client,
): Promise<Tables<"village_officers">[]> {
  const { data: officers } = await client
    .from("village_officers")
    .select("*")
    .order("sort_order", { ascending: true });
  return officers ?? [];
}

export type ApbdesData = {
  report: Tables<"apbdes_reports"> | null;
  realizations: Tables<"apbdes_realizations">[];
  spendingFields: Tables<"apbdes_spending_fields">[];
  revenueSources: Tables<"apbdes_revenue_sources">[];
};

export async function loadApbdesData(client: Client): Promise<ApbdesData> {
  const { data: report } = await client
    .from("apbdes_reports")
    .select("*")
    .maybeSingle();
  if (!report) {
    return {
      report: null,
      realizations: [],
      spendingFields: [],
      revenueSources: [],
    };
  }
  const { data: realizations } = await client
    .from("apbdes_realizations")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  const { data: spendingFields } = await client
    .from("apbdes_spending_fields")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  const { data: revenueSources } = await client
    .from("apbdes_revenue_sources")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  return {
    report,
    realizations: realizations ?? [],
    spendingFields: spendingFields ?? [],
    revenueSources: revenueSources ?? [],
  };
}
