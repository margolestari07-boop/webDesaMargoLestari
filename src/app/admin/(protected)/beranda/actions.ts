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
import {
  homeContentSchema,
  homeGalleryItemSchema,
} from "@/lib/validators/content";

/**
 * Simpan konten Beranda ke draf revisi yang aktif: teks hero, nomor
 * bantuan, dan kurasi galeri (metadata + urutan).
 *
 * TODO (Fase 4): unggah file galeri ke Supabase Storage. Saat ini item
 * galeri hanya bisa merujuk media_asset yang sudah ada (diisi ID-nya);
 * tidak ada unggahan file dari form ini.
 *
 * Ringkasan angka Beranda tidak disimpan di sini: halaman admin Beranda
 * menampilkan laporan Kependudukan terbit sebagai sumber angka.
 */
export async function saveHomeDraft(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, userId } = await requireAdmin();
  const values = readFormStrings(formData);
  const galleryItems = parseRowsJson(formData.get("gallery_items_json"));

  if (galleryItems === null) {
    return {
      kind: "error",
      message: "Isian galeri tidak dapat dibaca. Muat ulang halaman.",
      fieldErrors: {},
      values,
    };
  }

  const parsedContent = homeContentSchema.safeParse(values);
  if (!parsedContent.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsedContent.error),
      values,
    };
  }

  for (const item of galleryItems) {
    const parsedItem = homeGalleryItemSchema.safeParse(item);
    if (!parsedItem.success) {
      const first = parsedItem.error.issues[0];
      return {
        kind: "error",
        message: `Periksa kembali isian galeri: ${first?.message ?? "tidak valid."}`,
        fieldErrors: { rows: first?.message ?? "Isian galeri tidak valid." },
        values,
      };
    }
  }
  const parsedGallery = galleryItems.map((item) =>
    homeGalleryItemSchema.parse(item),
  );

  try {
    const { draft } = await ensureDraft(supabase, "home", userId);
    const content = parsedContent.data;

    const { data: existing } = await supabase
      .from("home_content")
      .select("id")
      .eq("revision_id", draft.id)
      .maybeSingle();

    const contentPayload = {
      hero_title: content.hero_title,
      hero_subtitle: content.hero_subtitle,
      help_phone: content.help_phone,
      help_note: content.help_note,
    };
    if (existing) {
      const { error } = await supabase
        .from("home_content")
        .update(contentPayload)
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("home_content")
        .insert({ revision_id: draft.id, ...contentPayload });
      if (error) throw new Error(error.message);
    }

    await supabase
      .from("home_gallery_items")
      .delete()
      .eq("revision_id", draft.id);
    for (const [index, item] of parsedGallery.entries()) {
      const { error } = await supabase.from("home_gallery_items").insert({
        revision_id: draft.id,
        media_asset_id: item.media_asset_id,
        title: item.title,
        caption: item.caption,
        alt_override: item.alt_override,
        sort_order: item.sort_order || index,
      });
      if (error) throw new Error(error.message);
    }

    await insertAuditEvent(
      supabase,
      userId,
      "home",
      draft.id,
      "draft_saved",
      `Draf ${sectionLabel("home")} disimpan.`,
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

  revalidatePath("/admin/beranda");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Draf Beranda tersimpan. Halaman publik belum berubah.",
    values,
  };
}
