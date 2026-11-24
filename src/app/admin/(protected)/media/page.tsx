import type { Metadata } from "next";
import { requireAdmin } from "@/lib/supabase/authorization";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { PageHeader } from "../_components/page-header";
import { deleteMedia } from "./actions";
import { MediaUploadForm } from "./media-form";

export const metadata: Metadata = {
  title: "Media",
};

/** Daftar aset media + form unggah ke Cloudinary. */
export default async function MediaAdminPage() {
  const { supabase } = await requireAdmin();
  const { data: assets } = await supabase
    .from("media_assets")
    .select(
      "id, provider, public_id, secure_url, storage_path, original_filename, alt_text, format, width, height, size_bytes, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const rows = assets ?? [];

  return (
    <section aria-labelledby="media-title" className="space-y-6">
      <PageHeader kicker="Beranda" title="Media" titleId="media-title" />

      <MediaUploadForm configured={isCloudinaryConfigured()} />

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada aset media.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((asset) => {
            const previewUrl =
              asset.provider === "cloudinary"
                ? (asset.secure_url ?? null)
                : asset.storage_path
                  ? `/${asset.storage_path}`
                  : null;
            const isVideo = previewUrl
              ? /\.(mp4|webm|mov)$/i.test(previewUrl.split("?")[0])
              : false;
            return (
              <article
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                key={asset.id}
              >
                {previewUrl ? (
                  <a
                    className="block aspect-[4/3] w-full bg-gray-100"
                    href={previewUrl}
                    rel="noreferrer"
                    target="_blank"
                    title="Buka media ukuran penuh di tab baru"
                  >
                    {isVideo ? (
                      <video
                        className="h-full w-full object-cover"
                        controls
                        preload="metadata"
                        src={previewUrl}
                      />
                    ) : (
                      <img
                        alt={
                          asset.alt_text ??
                          asset.original_filename ??
                          "Media desa"
                        }
                        className="h-full w-full object-cover"
                        loading="lazy"
                        src={previewUrl}
                      />
                    )}
                  </a>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                    Tidak ada pratinjau
                  </div>
                )}
                <div className="space-y-1 p-4">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {asset.original_filename ?? asset.public_id ?? "—"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {asset.public_id ?? asset.storage_path ?? ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {asset.provider === "cloudinary"
                      ? "Cloudinary"
                      : "Supabase Storage"}
                    {asset.width && asset.height
                      ? ` · ${asset.width}×${asset.height}`
                      : ""}
                    {asset.size_bytes != null
                      ? ` · ${Math.round(asset.size_bytes / 1024)} KB`
                      : ""}
                  </p>
                  <form action={deleteMedia} className="pt-1">
                    <input name="id" type="hidden" value={asset.id} />
                    <button
                      className="text-sm font-medium text-red-600 hover:underline"
                      type="submit"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
