"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  ensureDraft,
  insertAuditEvent,
  sectionLabel,
} from "@/lib/content/drafts";
import {
  idleFormState,
  parseRowsJson,
  readFormStrings,
  zodFieldErrors,
  type FormState,
} from "@/lib/content/form";
import { apbdesReportSchema } from "@/lib/validators/content";

function duplicateNames(rows: unknown[], key: string): string | null {
  const seen = new Set<string>();
  for (const row of rows) {
    if (typeof row !== "object" || row === null) continue;
    const value = (row as Record<string, unknown>)[key];
    if (typeof value !== "string") continue;
    const normalized = value.trim().toLowerCase();
    if (seen.has(normalized)) return value;
    seen.add(normalized);
  }
  return null;
}

/**
 * Simpan laporan APBDes per tahun anggaran/periode beserta realisasi
 * operasional/pembiayaan, bidang belanja, dan sumber pendapatan ke draf
 * revisi yang aktif. Tahun anggaran divalidasi 2000-2100 dan semua nilai
 * uang harus >= 0 (boleh kosong bila dokumen sumber tidak menyebutkannya).
 */
export async function saveApbdesDraft(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, userId } = await requireAdmin();
  const values = readFormStrings(formData);
  const realizations = parseRowsJson(formData.get("realizations_json"));
  const spendingFields = parseRowsJson(formData.get("spending_fields_json"));
  const revenueSources = parseRowsJson(formData.get("revenue_sources_json"));

  if (realizations === null || spendingFields === null || revenueSources === null) {
    return {
      kind: "error",
      message: "Rincian laporan tidak dapat dibaca. Muat ulang halaman.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = apbdesReportSchema.safeParse({
    ...values,
    realizations,
    spending_fields: spendingFields,
    revenue_sources: revenueSources,
  });

  if (!parsed.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsed.error),
      values,
    };
  }

  const duplicateSpending = duplicateNames(spendingFields, "field_name");
  if (duplicateSpending) {
    return {
      kind: "error",
      message: `Bidang belanja "${duplicateSpending}" terisi dua kali.`,
      fieldErrors: { rows: "Setiap bidang hanya boleh ada satu baris." },
      values,
    };
  }
  const duplicateRevenue = duplicateNames(revenueSources, "source_name");
  if (duplicateRevenue) {
    return {
      kind: "error",
      message: `Sumber pendapatan "${duplicateRevenue}" terisi dua kali.`,
      fieldErrors: { rows: "Setiap sumber hanya boleh ada satu baris." },
      values,
    };
  }

  const data = parsed.data;
  try {
    const { draft } = await ensureDraft(supabase, "apbdes", userId);

    const { data: existing } = await supabase
      .from("apbdes_reports")
      .select("id")
      .eq("revision_id", draft.id)
      .maybeSingle();

    const reportPayload = {
      fiscal_year: data.fiscal_year,
      period_label: data.period_label,
      period_start: data.period_start,
      period_end: data.period_end,
      source_document: data.source_document,
      source_note: data.source_note,
      notes: data.notes,
    };

    let reportId: string;
    if (existing) {
      const { error } = await supabase
        .from("apbdes_reports")
        .update(reportPayload)
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
      reportId = existing.id;
    } else {
      const { data: created, error } = await supabase
        .from("apbdes_reports")
        .insert({ revision_id: draft.id, ...reportPayload })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message);
      reportId = created.id;
    }

    await supabase
      .from("apbdes_realizations")
      .delete()
      .eq("report_id", reportId);
    await supabase
      .from("apbdes_spending_fields")
      .delete()
      .eq("report_id", reportId);
    await supabase
      .from("apbdes_revenue_sources")
      .delete()
      .eq("report_id", reportId);

    for (const [index, item] of data.realizations.entries()) {
      const { error } = await supabase.from("apbdes_realizations").insert({
        report_id: reportId,
        kind: item.kind,
        label: item.label,
        budget: item.budget,
        realization: item.realization,
        sort_order: item.sort_order || index,
        source_note: item.source_note,
      });
      if (error) throw new Error(error.message);
    }
    for (const [index, item] of data.spending_fields.entries()) {
      const { error } = await supabase.from("apbdes_spending_fields").insert({
        report_id: reportId,
        field_name: item.field_name,
        budget: item.budget,
        realization: item.realization,
        sort_order: item.sort_order || index,
        source_note: item.source_note,
      });
      if (error) throw new Error(error.message);
    }
    for (const [index, item] of data.revenue_sources.entries()) {
      const { error } = await supabase.from("apbdes_revenue_sources").insert({
        report_id: reportId,
        source_name: item.source_name,
        budget: item.budget,
        realization: item.realization,
        sort_order: item.sort_order || index,
        source_note: item.source_note,
      });
      if (error) throw new Error(error.message);
    }

    await insertAuditEvent(
      supabase,
      userId,
      "apbdes",
      draft.id,
      "draft_saved",
      `Draf ${sectionLabel("apbdes")} disimpan (tahun ${data.fiscal_year}, ${data.period_label}).`,
    );
  } catch {
    return {
      kind: "error",
      message:
        "Draf belum tersimpan. Periksa koneksi database dan migration, lalu coba lagi.",
      fieldErrors: {},
      values,
    };
  }

  revalidatePath("/admin/apbdes");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Draf APBDes tersimpan. Halaman publik belum berubah.",
    values,
  };
}
