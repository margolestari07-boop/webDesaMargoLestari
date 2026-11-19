import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";
import type { SectionKey } from "./sections";

type Client = SupabaseClient<Database>;

export type SectionRow = Tables<"content_sections">;
export type RevisionRow = Tables<"content_revisions">;

const SECTION_LABELS: Record<SectionKey, string> = {
  home: "Beranda",
  profile: "Profil Desa",
  population: "Kependudukan",
  apbdes: "APBDes",
};

export function sectionLabel(key: SectionKey): string {
  return SECTION_LABELS[key];
}

export async function getSectionRow(
  client: Client,
  key: SectionKey,
): Promise<SectionRow | null> {
  const { data, error } = await client
    .from("content_sections")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function getDraftRevision(
  client: Client,
  sectionId: string,
): Promise<RevisionRow | null> {
  const { data, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("section_id", sectionId)
    .eq("status", "draft")
    .order("revision_no", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function getPublishedRevision(
  client: Client,
  section: SectionRow,
): Promise<RevisionRow | null> {
  if (!section.published_revision_id) return null;
  const { data, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("id", section.published_revision_id)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function listRevisionsForSection(
  client: Client,
  sectionId: string,
  limit = 20,
): Promise<RevisionRow[]> {
  const { data, error } = await client
    .from("content_revisions")
    .select("*")
    .eq("section_id", sectionId)
    .order("revision_no", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data;
}

async function nextRevisionNo(
  client: Client,
  sectionId: string,
): Promise<number> {
  const { data } = await client
    .from("content_revisions")
    .select("revision_no")
    .eq("section_id", sectionId)
    .order("revision_no", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.revision_no ?? 0) + 1;
}

async function copyOfficers(
  client: Client,
  fromRevisionId: string,
  toRevisionId: string,
): Promise<void> {
  const { data: officers } = await client
    .from("village_officers")
    .select("*")
    .eq("revision_id", fromRevisionId)
    .order("sort_order", { ascending: true });
  if (!officers || officers.length === 0) return;

  const idMap = new Map<string, string>();
  for (const officer of officers) {
    const { data } = await client
      .from("village_officers")
      .insert({
        revision_id: toRevisionId,
        parent_id: null,
        full_name: officer.full_name,
        position: officer.position,
        description: officer.description,
        sort_order: officer.sort_order,
        photo_asset_id: officer.photo_asset_id,
        is_active: officer.is_active,
      })
      .select("id")
      .single();
    if (data) idMap.set(officer.id, data.id);
  }
  for (const officer of officers) {
    const newId = idMap.get(officer.id);
    const newParentId = officer.parent_id
      ? idMap.get(officer.parent_id)
      : undefined;
    if (newId && newParentId) {
      await client
        .from("village_officers")
        .update({ parent_id: newParentId })
        .eq("id", newId);
    }
  }
}

async function copyRevisionChildren(
  client: Client,
  key: SectionKey,
  fromRevisionId: string,
  toRevisionId: string,
): Promise<void> {
  if (key === "home") {
    const { data: content } = await client
      .from("home_content")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .maybeSingle();
    if (content) {
      await client.from("home_content").insert({
        revision_id: toRevisionId,
        hero_title: content.hero_title,
        hero_subtitle: content.hero_subtitle,
        help_phone: content.help_phone,
        help_note: content.help_note,
      });
    }
    await copyOfficers(client, fromRevisionId, toRevisionId);
    const { data: gallery } = await client
      .from("home_gallery_items")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .order("sort_order", { ascending: true });
    for (const item of gallery ?? []) {
      await client.from("home_gallery_items").insert({
        revision_id: toRevisionId,
        media_asset_id: item.media_asset_id,
        title: item.title,
        caption: item.caption,
        alt_override: item.alt_override,
        sort_order: item.sort_order,
      });
    }
    return;
  }

  if (key === "profile") {
    const { data: content } = await client
      .from("profile_content")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .maybeSingle();
    if (content) {
      await client.from("profile_content").insert({
        revision_id: toRevisionId,
        history_text: content.history_text,
        area_value: content.area_value,
        area_unit: content.area_unit,
        population_count: content.population_count,
        distance_to_capital_value: content.distance_to_capital_value,
        distance_to_capital_unit: content.distance_to_capital_unit,
        source_note: content.source_note,
      });
    }
    const { data: boundaries } = await client
      .from("profile_boundaries")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .order("sort_order", { ascending: true });
    for (const item of boundaries ?? []) {
      await client.from("profile_boundaries").insert({
        revision_id: toRevisionId,
        direction: item.direction,
        label: item.label,
        description: item.description,
        source_note: item.source_note,
        sort_order: item.sort_order,
      });
    }
    const { data: documents } = await client
      .from("village_documents")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .order("sort_order", { ascending: true });
    for (const item of documents ?? []) {
      await client.from("village_documents").insert({
        revision_id: toRevisionId,
        title: item.title,
        doc_type: item.doc_type,
        description: item.description,
        storage_path: item.storage_path,
        mime_type: item.mime_type,
        size_bytes: item.size_bytes,
        alt_text: item.alt_text,
        sort_order: item.sort_order,
        is_public: item.is_public,
      });
    }
    return;
  }

  if (key === "population") {
    const { data: report } = await client
      .from("population_reports")
      .select("*")
      .eq("revision_id", fromRevisionId)
      .maybeSingle();
    if (!report) return;
    const { data: newReport } = await client
      .from("population_reports")
      .insert({
        revision_id: toRevisionId,
        period_label: report.period_label,
        period_start: report.period_start,
        period_end: report.period_end,
        source_name: report.source_name,
        source_reference: report.source_reference,
        data_updated_at: report.data_updated_at,
        total_population: report.total_population,
        total_households: report.total_households,
        male_count: report.male_count,
        female_count: report.female_count,
        productive_age_count: report.productive_age_count,
        area_value: report.area_value,
        area_unit: report.area_unit,
      })
      .select("id")
      .single();
    if (!newReport) return;
    const { data: areaUses } = await client
      .from("population_area_uses")
      .select("*")
      .eq("report_id", report.id)
      .order("sort_order", { ascending: true });
    for (const item of areaUses ?? []) {
      await client.from("population_area_uses").insert({
        report_id: newReport.id,
        category: item.category,
        area_value: item.area_value,
        area_unit: item.area_unit,
        sort_order: item.sort_order,
        source_note: item.source_note,
      });
    }
    const { data: occupations } = await client
      .from("population_occupations")
      .select("*")
      .eq("report_id", report.id)
      .order("sort_order", { ascending: true });
    for (const item of occupations ?? []) {
      await client.from("population_occupations").insert({
        report_id: newReport.id,
        name: item.name,
        person_count: item.person_count,
        sort_order: item.sort_order,
        source_note: item.source_note,
      });
    }
    return;
  }

  // apbdes
  const { data: report } = await client
    .from("apbdes_reports")
    .select("*")
    .eq("revision_id", fromRevisionId)
    .maybeSingle();
  if (!report) return;
  const { data: newReport } = await client
    .from("apbdes_reports")
    .insert({
      revision_id: toRevisionId,
      fiscal_year: report.fiscal_year,
      period_label: report.period_label,
      period_start: report.period_start,
      period_end: report.period_end,
      source_document: report.source_document,
      source_note: report.source_note,
      notes: report.notes,
    })
    .select("id")
    .single();
  if (!newReport) return;
  const { data: realizations } = await client
    .from("apbdes_realizations")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  for (const item of realizations ?? []) {
    await client.from("apbdes_realizations").insert({
      report_id: newReport.id,
      kind: item.kind,
      label: item.label,
      budget: item.budget,
      realization: item.realization,
      currency: item.currency,
      sort_order: item.sort_order,
      source_note: item.source_note,
    });
  }
  const { data: spending } = await client
    .from("apbdes_spending_fields")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  for (const item of spending ?? []) {
    await client.from("apbdes_spending_fields").insert({
      report_id: newReport.id,
      field_name: item.field_name,
      budget: item.budget,
      realization: item.realization,
      sort_order: item.sort_order,
      source_note: item.source_note,
    });
  }
  const { data: revenue } = await client
    .from("apbdes_revenue_sources")
    .select("*")
    .eq("report_id", report.id)
    .order("sort_order", { ascending: true });
  for (const item of revenue ?? []) {
    await client.from("apbdes_revenue_sources").insert({
      report_id: newReport.id,
      source_name: item.source_name,
      budget: item.budget,
      realization: item.realization,
      sort_order: item.sort_order,
      source_note: item.source_note,
    });
  }
}

/**
 * Ambil draf yang ada, atau buat draf baru dengan menyalin isi revisi
 * terbit (bila ada). Revisi terbit tidak pernah diedit langsung.
 * Melempar Error dengan pesan yang bisa ditampilkan bila section belum
 * ada di database (migration belum diterapkan).
 */
export async function ensureDraft(
  client: Client,
  key: SectionKey,
  userId: string,
): Promise<{ section: SectionRow; draft: RevisionRow }> {
  const section = await getSectionRow(client, key);
  if (!section) {
    throw new Error(
      `Bagian ${sectionLabel(key)} belum tersedia di database. Migration content_revisions belum diterapkan di database ini.`,
    );
  }
  const existing = await getDraftRevision(client, section.id);
  if (existing) return { section, draft: existing };

  const published = await getPublishedRevision(client, section);
  const revisionNo = await nextRevisionNo(client, section.id);
  const { data: draft, error } = await client
    .from("content_revisions")
    .insert({
      section_id: section.id,
      revision_no: revisionNo,
      status: "draft",
      created_by: userId,
      source_note: published?.source_note ?? null,
      change_note: published
        ? "Draf baru dari revisi terbit."
        : "Draf pertama.",
    })
    .select("*")
    .single();
  if (error || !draft) {
    throw new Error("Draf baru gagal dibuat. Silakan coba lagi.");
  }
  if (published) {
    await copyRevisionChildren(client, key, published.id, draft.id);
  }
  return { section, draft };
}

export async function publishDraftRevision(
  client: Client,
  revisionId: string,
): Promise<void> {
  const { error } = await client.rpc("publish_content_revision", {
    p_revision_id: revisionId,
  });
  if (error) {
    throw new Error(error.message || "Penerbitan gagal.");
  }
}

/** Audit append-only. Kegagalan audit tidak menggagalkan aksi utama. */
export async function insertAuditEvent(
  client: Client,
  actorId: string,
  sectionKey: string | null,
  revisionId: string | null,
  action: string,
  summary: string,
): Promise<void> {
  try {
    await client.from("content_audit_events").insert({
      actor_id: actorId,
      section_key: sectionKey,
      revision_id: revisionId,
      action,
      summary,
    });
  } catch {
    // Audit tidak boleh menggagalkan aksi utama.
  }
}

// ---------------------------------------------------------------------------
// Loader isi revisi per modul (dipakai halaman admin dan dashboard).
// Mengembalikan null bila revisi tidak ada; error query diperlakukan
// sebagai "tidak ada data" agar halaman bisa menampilkan pesan jelas.
// ---------------------------------------------------------------------------

export type PopulationRevisionData = {
  report: Tables<"population_reports"> | null;
  areaUses: Tables<"population_area_uses">[];
  occupations: Tables<"population_occupations">[];
};

export async function loadPopulationRevision(
  client: Client,
  revisionId: string,
): Promise<PopulationRevisionData> {
  const { data: report } = await client
    .from("population_reports")
    .select("*")
    .eq("revision_id", revisionId)
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

export type ProfileRevisionData = {
  content: Tables<"profile_content"> | null;
  boundaries: Tables<"profile_boundaries">[];
  documents: Tables<"village_documents">[];
};

export async function loadProfileRevision(
  client: Client,
  revisionId: string,
): Promise<ProfileRevisionData> {
  const { data: content } = await client
    .from("profile_content")
    .select("*")
    .eq("revision_id", revisionId)
    .maybeSingle();
  const { data: boundaries } = await client
    .from("profile_boundaries")
    .select("*")
    .eq("revision_id", revisionId)
    .order("sort_order", { ascending: true });
  const { data: documents } = await client
    .from("village_documents")
    .select("*")
    .eq("revision_id", revisionId)
    .order("sort_order", { ascending: true });
  return {
    content: content ?? null,
    boundaries: boundaries ?? [],
    documents: documents ?? [],
  };
}

export type HomeRevisionData = {
  content: Tables<"home_content"> | null;
  officers: Tables<"village_officers">[];
  galleryItems: Tables<"home_gallery_items">[];
  mediaAssets: Tables<"media_assets">[];
};

export async function loadHomeRevision(
  client: Client,
  revisionId: string,
): Promise<HomeRevisionData> {
  const { data: content } = await client
    .from("home_content")
    .select("*")
    .eq("revision_id", revisionId)
    .maybeSingle();
  const { data: officers } = await client
    .from("village_officers")
    .select("*")
    .eq("revision_id", revisionId)
    .order("sort_order", { ascending: true });
  const { data: galleryItems } = await client
    .from("home_gallery_items")
    .select("*")
    .eq("revision_id", revisionId)
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

export type ApbdesRevisionData = {
  report: Tables<"apbdes_reports"> | null;
  realizations: Tables<"apbdes_realizations">[];
  spendingFields: Tables<"apbdes_spending_fields">[];
  revenueSources: Tables<"apbdes_revenue_sources">[];
};

export async function loadApbdesRevision(
  client: Client,
  revisionId: string,
): Promise<ApbdesRevisionData> {
  const { data: report } = await client
    .from("apbdes_reports")
    .select("*")
    .eq("revision_id", revisionId)
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
