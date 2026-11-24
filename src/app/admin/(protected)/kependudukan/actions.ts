"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  idleFormState,
  parseRowsJson,
  readFormStrings,
  zodFieldErrors,
  type FormState,
} from "@/lib/content/form";
import { populationReportSchema } from "@/lib/validators/content";

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
 * Simpan laporan Kependudukan beserta rincian penggunaan wilayah dan
 * pekerjaan langsung ke tabel. Tanpa revisi: simpan langsung tampil di
 * halaman publik. Validasi total laki-laki + perempuan dilakukan oleh
 * zod: bila ketiganya terisi dan tidak sama dengan total penduduk,
 * penyimpanan ditolak.
 */
export async function savePopulation(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const values = readFormStrings(formData);
  const areaUses = parseRowsJson(formData.get("area_uses_json"));
  const occupations = parseRowsJson(formData.get("occupations_json"));

  if (areaUses === null || occupations === null) {
    return {
      kind: "error",
      message: "Rincian laporan tidak dapat dibaca. Muat ulang halaman.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = populationReportSchema.safeParse({
    ...values,
    area_uses: areaUses,
    occupations,
  });

  if (!parsed.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsed.error),
      values,
    };
  }

  const duplicateArea = duplicateNames(areaUses, "category");
  if (duplicateArea) {
    return {
      kind: "error",
      message: `Kategori penggunaan wilayah "${duplicateArea}" terisi dua kali.`,
      fieldErrors: { rows: "Setiap kategori hanya boleh ada satu baris." },
      values,
    };
  }
  const duplicateJob = duplicateNames(occupations, "name");
  if (duplicateJob) {
    return {
      kind: "error",
      message: `Pekerjaan "${duplicateJob}" terisi dua kali.`,
      fieldErrors: { rows: "Setiap pekerjaan hanya boleh ada satu baris." },
      values,
    };
  }

  const data = parsed.data;
  try {
    const { data: existing } = await supabase
      .from("population_reports")
      .select("id")
      .limit(1)
      .maybeSingle();

    const reportPayload = {
      period_label: data.period_label,
      period_start: data.period_start,
      period_end: data.period_end,
      source_name: data.source_name,
      source_reference: data.source_reference,
      data_updated_at: data.data_updated_at,
      total_population: data.total_population,
      total_households: data.total_households,
      male_count: data.male_count,
      female_count: data.female_count,
      productive_age_count: data.productive_age_count,
      area_value: data.area_value,
      area_unit: data.area_unit,
    };

    let reportId: string;
    if (existing) {
      const { error } = await supabase
        .from("population_reports")
        .update(reportPayload)
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
      reportId = existing.id;
    } else {
      const { data: created, error } = await supabase
        .from("population_reports")
        .insert(reportPayload)
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message);
      reportId = created.id;
    }

    // Ganti seluruh rincian dengan isi form (baris lama yang dihapus di
    // form ikut terhapus; penghapusan sudah dikonfirmasi di browser).
    await supabase
      .from("population_area_uses")
      .delete()
      .eq("report_id", reportId);
    await supabase
      .from("population_occupations")
      .delete()
      .eq("report_id", reportId);

    for (const [index, item] of data.area_uses.entries()) {
      const { error } = await supabase.from("population_area_uses").insert({
        report_id: reportId,
        category: item.category,
        area_value: item.area_value,
        area_unit: item.area_unit,
        sort_order: item.sort_order || index,
        source_note: item.source_note,
      });
      if (error) throw new Error(error.message);
    }
    for (const [index, item] of data.occupations.entries()) {
      const { error } = await supabase.from("population_occupations").insert({
        report_id: reportId,
        name: item.name,
        person_count: item.person_count,
        sort_order: item.sort_order || index,
        source_note: item.source_note,
      });
      if (error) throw new Error(error.message);
    }
  } catch {
    return {
      kind: "error",
      message:
        "Perubahan belum tersimpan. Periksa koneksi database dan migration, lalu coba lagi.",
      fieldErrors: {},
      values,
    };
  }

  revalidatePath("/admin/kependudukan");
  revalidatePath("/infografis");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Perubahan Kependudukan tersimpan dan langsung tampil di halaman publik.",
    values,
  };
}
