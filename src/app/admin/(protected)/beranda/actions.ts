"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  ensureWorkingRevision,
  insertAuditEvent,
  sectionLabel,
  publishRevision,
} from "@/lib/content/revisions";
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
 * Simpan konten Beranda langsung ke revisi aktif: teks hero, nomor
 * bantuan, dan kurasi galeri (metadata + urutan).
 *
 * Unggah file galeri dilakukan di modul Media (/admin/media, storage
 * aktif Cloudinary). Item galeri di form ini merujuk media_asset yang
 * sudah ada (diisi ID-nya).
 *
 * Ringkasan angka Beranda tidak disimpan di sini: halaman admin Beranda
 * menampilkan laporan Kependudukan aktif sebagai sumber angka.
 */
export async function saveHome(
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
    const { revision } = await ensureWorkingRevision(supabase, "home", userId);
    const content = parsedContent.data;

    const { data: existing } = await supabase
      .from("home_content")
      .select("id")
      .eq("revision_id", revision.id)
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
        .insert({ revision_id: revision.id, ...contentPayload });
      if (error) throw new Error(error.message);
    }

    await supabase
      .from("home_gallery_items")
      .delete()
      .eq("revision_id", revision.id);
    for (const [index, item] of parsedGallery.entries()) {
      const { error } = await supabase.from("home_gallery_items").insert({
        revision_id: revision.id,
        media_asset_id: item.media_asset_id,
        title: item.title,
        caption: item.caption,
        alt_override: item.alt_override,
        sort_order: item.sort_order || index,
      });
      if (error) throw new Error(error.message);
    }

    await publishRevision(supabase, revision.id);

    await insertAuditEvent(
      supabase,
      userId,
      "home",
      revision.id,
      "published",
      `${sectionLabel("home")} disimpan dan langsung tampil di halaman publik.`,
    );
  } catch {
    return {
      kind: "error",
      message:
        "Perubahan belum tersimpan. Periksa koneksi database dan migration, lalu coba lagi.",
      fieldErrors: {},
      values,
    };
  }

  revalidatePath("/admin/beranda");
  revalidatePath("/");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Perubahan Beranda tersimpan dan langsung tampil di halaman publik.",
    values,
  };
}
