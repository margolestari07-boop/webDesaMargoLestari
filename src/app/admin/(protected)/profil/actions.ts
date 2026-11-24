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
import {
  profileBoundariesSchema,
  profileContentSchema,
  villageDocumentSchema,
} from "@/lib/validators/content";

/**
 * Simpan Profil Desa langsung ke tabel: narasi sejarah (teks panjang;
 * bentuk linimasa belum diputuskan), batas wilayah 4 arah, luas dan
 * jarak beserta satuan, serta metadata dokumen desa. Tanpa revisi:
 * simpan langsung tampil di halaman publik.
 *
 * TODO (Fase 4): unggah file dokumen ke Supabase Storage. Saat ini hanya
 * metadata (termasuk storage_path yang diisi manual) yang disimpan; tidak
 * ada file yang diunggah dari form ini.
 */
export async function saveProfile(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const values = readFormStrings(formData);
  const boundaries = parseRowsJson(formData.get("boundaries_json"));
  const documents = parseRowsJson(formData.get("documents_json"));

  if (boundaries === null || documents === null) {
    return {
      kind: "error",
      message: "Isian profil tidak dapat dibaca. Muat ulang halaman.",
      fieldErrors: {},
      values,
    };
  }

  const parsedContent = profileContentSchema.safeParse(values);
  if (!parsedContent.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsedContent.error),
      values,
    };
  }

  const parsedBoundaries = profileBoundariesSchema.safeParse(boundaries);
  if (!parsedBoundaries.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian batas wilayah.",
      fieldErrors: zodFieldErrors(parsedBoundaries.error),
      values,
    };
  }

  for (const document of documents) {
    const parsedDocument = villageDocumentSchema.safeParse(document);
    if (!parsedDocument.success) {
      const first = parsedDocument.error.issues[0];
      return {
        kind: "error",
        message: `Periksa kembali isian dokumen: ${first?.message ?? "tidak valid."}`,
        fieldErrors: { rows: first?.message ?? "Isian dokumen tidak valid." },
        values,
      };
    }
  }
  const parsedDocuments = documents.map(
    (document) => villageDocumentSchema.parse(document),
  );

  try {
    const content = parsedContent.data;

    const { data: existing } = await supabase
      .from("profile_content")
      .select("id")
      .limit(1)
      .maybeSingle();

    const contentPayload = {
      history_text: content.history_text,
      area_value: content.area_value,
      area_unit: content.area_unit,
      population_count: content.population_count,
      distance_to_capital_value: content.distance_to_capital_value,
      distance_to_capital_unit: content.distance_to_capital_unit,
      source_note: content.source_note,
    };
    if (existing) {
      const { error } = await supabase
        .from("profile_content")
        .update(contentPayload)
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("profile_content")
        .insert(contentPayload);
      if (error) throw new Error(error.message);
    }

    await supabase
      .from("profile_boundaries")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    for (const item of parsedBoundaries.data) {
      const { error } = await supabase.from("profile_boundaries").insert({
        direction: item.direction,
        label: item.label,
        description: item.description,
        source_note: item.source_note,
        sort_order: item.sort_order,
      });
      if (error) throw new Error(error.message);
    }

    await supabase
      .from("village_documents")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    for (const [index, item] of parsedDocuments.entries()) {
      const { error } = await supabase.from("village_documents").insert({
        title: item.title,
        doc_type: item.doc_type,
        description: item.description,
        storage_path: item.storage_path,
        mime_type: item.mime_type,
        size_bytes: item.size_bytes,
        alt_text: item.alt_text,
        sort_order: item.sort_order || index,
        is_public: item.is_public,
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

  revalidatePath("/admin/profil");
  revalidatePath("/profil");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Perubahan Profil Desa tersimpan dan langsung tampil di halaman publik.",
    values,
  };
}
