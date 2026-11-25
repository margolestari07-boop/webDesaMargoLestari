"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { recordMediaAsset } from "@/lib/content/media-assets";
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
 * Simpan konten Beranda langsung ke tabel: teks hero, nomor bantuan,
 * dan kurasi galeri (metadata + urutan). Tanpa revisi: simpan langsung
 * tampil di halaman publik.
 *
 * Gambar galeri bisa dipilih dari aset yang sudah ada (select) atau
 * diunggah baru langsung di tiap baris galeri (input file): file baru
 * diunggah ke Cloudinary di sini, saat Simpan diklik — bukan saat file
 * dipilih — lalu dicatat ke media_assets dan item galeri merujuk id
 * aset baru. File baru mengalahkan aset terpilih di baris yang sama.
 * ID aset yang baru diunggah dikembalikan lewat
 * FormState.uploadedAssets supaya form menambal state lokalnya.
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

  // File baru per baris galeri diunggah dulu ke Cloudinary, sebelum
  // validasi skema: baris dengan file baru boleh kosong
  // media_asset_id-nya, karena setelah upload id aset baru yang
  // divalidasi. Kegagalan upload membatalkan seluruh penyimpanan
  // sebelum ada data yang dihapus.
  const uploadedAssets: Record<string, string> = {};
  for (const [index, item] of galleryItems.entries()) {
    const file = formData.get(`gallery_photo_${index}`);
    if (!(file instanceof File) || file.size === 0) continue;
    if (!isCloudinaryConfigured()) {
      return {
        kind: "error",
        message:
          "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di .env.local (lokal) atau di Vercel Dashboard (production). Lihat docs/CLOUDINARY.md.",
        fieldErrors: {},
        values,
      };
    }
    const rawItem = item as Record<string, unknown>;
    const title =
      typeof rawItem.title === "string" ? rawItem.title : undefined;
    try {
      const uploaded = await uploadImageToCloudinary(file, {
        altText: title,
      });
      const assetId = await recordMediaAsset(supabase, uploaded, {
        mimeType: file.type,
        altText: title ?? null,
        uploadedBy: userId,
      });
      rawItem.media_asset_id = assetId;
      uploadedAssets[String(index)] = assetId;
    } catch (error) {
      return {
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Upload gambar galeri gagal. Coba lagi.",
        fieldErrors: {},
        values,
      };
    }
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
    const content = parsedContent.data;

    const { data: existing } = await supabase
      .from("home_content")
      .select("id")
      .limit(1)
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
        .insert(contentPayload);
      if (error) throw new Error(error.message);
    }

    await supabase
      .from("home_gallery_items")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    for (const [index, item] of parsedGallery.entries()) {
      const { error } = await supabase.from("home_gallery_items").insert({
        media_asset_id: item.media_asset_id,
        title: item.title,
        caption: item.caption,
        alt_override: item.alt_override,
        sort_order: item.sort_order || index,
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

  revalidatePath("/admin/beranda");
  revalidatePath("/");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message: "Perubahan Beranda tersimpan dan langsung tampil di halaman publik.",
    values,
    uploadedAssets,
  };
}
