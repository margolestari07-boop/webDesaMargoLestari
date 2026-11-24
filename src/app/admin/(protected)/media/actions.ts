"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  idleFormState,
  type FormState,
} from "@/lib/content/form";
import {
  destroyCloudinaryAsset,
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

/**
 * Unggah gambar ke Cloudinary lalu catat ke tabel media_assets
 * (provider='cloudinary'). Bila pencatatan ke Supabase gagal, aset
 * Cloudinary yang baru ter-upload dihapus lagi (rollback manual).
 * File tidak pernah melewati browser ke Cloudinary: upload penuh
 * server-side, api_secret tidak keluar dari server.
 */
export async function uploadMedia(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, userId } = await requireAdmin();

  if (!isCloudinaryConfigured()) {
    return {
      kind: "error",
      message:
        "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di .env.local, lalu restart dev server. Lihat docs/CLOUDINARY.md.",
      fieldErrors: {},
    };
  }

  const file = formData.get("file");
  const altText = formData.get("alt_text");
  const folder = formData.get("folder");

  if (!(file instanceof File) || file.size === 0) {
    return {
      kind: "error",
      message: "Pilih file gambar terlebih dahulu (JPG, PNG, WebP, atau AVIF, maks 10 MB).",
      fieldErrors: {},
    };
  }

  let uploaded: Awaited<ReturnType<typeof uploadImageToCloudinary>>;
  try {
    uploaded = await uploadImageToCloudinary(file, {
      folder:
        typeof folder === "string" && folder.trim() !== ""
          ? folder.trim()
          : undefined,
      altText: typeof altText === "string" ? altText : undefined,
    });
  } catch (error) {
    return {
      kind: "error",
      message:
        error instanceof Error
          ? error.message
          : "Upload ke Cloudinary gagal. Coba lagi.",
      fieldErrors: {},
    };
  }

  const { error } = await supabase.from("media_assets").insert({
    provider: "cloudinary",
    public_id: uploaded.publicId,
    asset_id: uploaded.assetId,
    secure_url: uploaded.secureUrl,
    resource_type: uploaded.resourceType,
    format: uploaded.format,
    width: uploaded.width,
    height: uploaded.height,
    asset_folder: uploaded.assetFolder,
    original_filename: uploaded.originalFilename,
    bucket: null,
    storage_path: null,
    mime_type: file.type,
    size_bytes: uploaded.bytes,
    alt_text:
      typeof altText === "string" && altText.trim() !== ""
        ? altText.trim()
        : null,
    uploaded_by: userId,
  });

  if (error) {
    // Rollback: hapus aset Cloudinary supaya tidak ada aset yatim.
    try {
      await destroyCloudinaryAsset(
        uploaded.publicId,
        uploaded.resourceType,
      );
    } catch {
      // Aset yatim tetap tercatat di Cloudinary; admin bisa menghapusnya
      // manual dari Console, Media Library.
    }
    return {
      kind: "error",
      message:
        "File sudah ter-upload ke Cloudinary tapi gagal dicatat ke database. Aset Cloudinary sudah dihapus lagi; coba unggah ulang.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/media");
  return {
    ...idleFormState,
    kind: "success",
    message: "Gambar berhasil diunggah ke Cloudinary dan dicatat di media_assets.",
  };
}

/** Hapus aset Cloudinary dulu, baru hapus baris media_assets. */
export async function deleteMedia(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || id.trim() === "") {
    redirect("/admin/media");
  }

  const { data: asset } = await supabase
    .from("media_assets")
    .select("provider, public_id, resource_type")
    .eq("id", id)
    .maybeSingle();

  if (asset?.provider === "cloudinary" && asset.public_id) {
    try {
      await destroyCloudinaryAsset(
        asset.public_id,
        asset.resource_type ?? "image",
      );
    } catch {
      // Lanjutkan hapus baris walau hapus Cloudinary gagal; aset bisa
      // dihapus manual dari Console Cloudinary.
    }
  }

  await supabase.from("media_assets").delete().eq("id", id);
  revalidatePath("/admin/media");
  redirect("/admin/media");
}
