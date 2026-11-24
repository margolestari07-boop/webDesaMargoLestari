import "server-only";

import { v2 as cloudinary } from "cloudinary";

/**
 * Upload media admin ke Cloudinary (signed, server-side penuh).
 *
 * Kredensial dibaca dari env server-only: CLOUDINARY_CLOUD_NAME,
 * CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET. api_secret tidak pernah
 * keluar dari server dan tidak pernah memakai prefix NEXT_PUBLIC_.
 * Bila env belum diisi, isCloudinaryConfigured() false dan semua fungsi
 * upload melempar error yang jelas; halaman publik tetap memakai aset
 * yang sudah ada (Supabase Storage / file lokal).
 *
 * Folder default: margo-lestari (bisa diubah lewat CLOUDINARY_FOLDER).
 * Akun baru Cloudinary memakai dynamic folder mode: asset_folder dicatat
 * terpisah dari public_id.
 */

export type CloudinaryUploadResult = {
  publicId: string;
  assetId: string;
  secureUrl: string;
  resourceType: string;
  format: string;
  width: number | null;
  height: number | null;
  bytes: number;
  assetFolder: string | null;
  originalFilename: string;
};

function getConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  };
}

export function isCloudinaryConfigured(): boolean {
  const { cloudName, apiKey, apiSecret } = getConfig();
  return cloudName !== "" && apiKey !== "" && apiSecret !== "";
}

function configuredCloudinary() {
  const { cloudName, apiKey, apiSecret } = getConfig();
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di .env.local (lokal) atau di Vercel Dashboard (production). Lihat docs/CLOUDINARY.md.",
    );
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return cloudinary;
}

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB (batas free plan)

/** Nama file aman untuk public_id: huruf kecil, strip sebagai pemisah. */
export function safePublicId(filename: string): string {
  return filename
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/\.[^.]+$/, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 100);
}

/**
 * Upload satu file gambar ke Cloudinary. Mengembalikan metadata yang
 * perlu disimpan ke tabel media_assets (provider='cloudinary').
 */
export async function uploadImageToCloudinary(
  file: File,
  options: { folder?: string; altText?: string } = {},
): Promise<CloudinaryUploadResult> {
  const client = configuredCloudinary();

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Format file tidak didukung. Pakai JPG, PNG, WebP, atau AVIF.",
    );
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ukuran file maksimal 10 MB.");
  }

  const folder =
    options.folder ??
    process.env.CLOUDINARY_FOLDER ??
    "margo-lestari/galeri";
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<Record<string, unknown>>(
    (resolve, reject) => {
      const stream = client.uploader.upload_stream(
        {
          resource_type: "image",
          folder,
          use_filename: true,
          unique_filename: true,
          tags: ["margo-lestari"],
          context:
            options.altText != null && options.altText !== ""
              ? { alt: options.altText }
              : undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as unknown as Record<string, unknown>);
        },
      );
      stream.end(buffer);
    },
  );

  return {
    publicId: String(result.public_id ?? ""),
    assetId: String(result.asset_id ?? ""),
    secureUrl: String(result.secure_url ?? ""),
    resourceType: String(result.resource_type ?? "image"),
    format: String(result.format ?? ""),
    width: typeof result.width === "number" ? result.width : null,
    height: typeof result.height === "number" ? result.height : null,
    bytes: typeof result.bytes === "number" ? result.bytes : file.size,
    assetFolder:
      typeof result.asset_folder === "string" ? result.asset_folder : null,
    originalFilename: String(result.original_filename ?? file.name),
  };
}

/** Hapus aset Cloudinary berdasarkan public_id. Dipakai sebelum hapus baris media_assets. */
export async function destroyCloudinaryAsset(
  publicId: string,
  resourceType = "image",
): Promise<void> {
  const client = configuredCloudinary();
  await client.uploader.destroy(publicId, {
    resource_type: resourceType as "image" | "video" | "raw",
  });
}

/**
 * Bangun delivery URL dari public_id dengan transformasi dasar.
 * q_auto + f_auto (format/kualitas otomatis) selalu di akhir.
 */
export function cloudinaryImageUrl(
  publicId: string,
  options: { width?: number; height?: number } = {},
): string | null {
  const { cloudName } = getConfig();
  if (cloudName === "" || publicId === "") return null;
  const transformation =
    options.width != null && options.height != null
      ? `c_fill,g_auto,w_${options.width},h_${options.height}/q_auto/f_auto`
      : options.width != null
        ? `c_limit,w_${options.width}/q_auto/f_auto`
        : "q_auto/f_auto";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`;
}
