import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  destroyCloudinaryAsset,
  type CloudinaryUploadResult,
} from "@/lib/cloudinary";
import type { Database } from "@/types/database";

/**
 * Catat hasil upload Cloudinary ke tabel media_assets
 * (provider='cloudinary'). Dipakai Server Action yang mengunggah file
 * inline dari form (foto pejabat, galeri Beranda) setelah modul Media
 * dihapus: tidak ada lagi form unggah terpisah.
 *
 * Bila insert ke Supabase gagal, aset Cloudinary yang baru ter-upload
 * dihapus lagi (rollback manual) lalu error dilempar, supaya tidak ada
 * aset yatim. Mengembalikan id baris media_assets yang baru.
 */
export async function recordMediaAsset(
  supabase: SupabaseClient<Database>,
  uploaded: CloudinaryUploadResult,
  opts: {
    mimeType: string;
    altText?: string | null;
    uploadedBy: string;
  },
): Promise<string> {
  const { data, error } = await supabase
    .from("media_assets")
    .insert({
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
      mime_type: opts.mimeType,
      size_bytes: uploaded.bytes,
      alt_text:
        opts.altText != null && opts.altText.trim() !== ""
          ? opts.altText.trim()
          : null,
      uploaded_by: opts.uploadedBy,
    })
    .select("id")
    .single();

  if (error || !data) {
    try {
      await destroyCloudinaryAsset(
        uploaded.publicId,
        uploaded.resourceType,
      );
    } catch {
      // Aset yatim tetap tercatat di Cloudinary; admin bisa menghapusnya
      // manual dari Console, Media Library.
    }
    throw new Error("Gagal mencatat aset media ke database.");
  }

  return data.id;
}
