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
      <PageHeader
        intro="Aset lama tersimpan di Supabase Storage. Aset baru diunggah ke Cloudinary (storage aktif) dan dicatat di tabel yang sama."
        kicker="Beranda"
        title="Media"
        titleId="media-title"
      />

      <MediaUploadForm configured={isCloudinaryConfigured()} />

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada aset media.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3" scope="col">
                  Pratinjau
                </th>
                <th className="px-4 py-3" scope="col">
                  Nama / public_id
                </th>
                <th className="px-4 py-3" scope="col">
                  Penyimpanan
                </th>
                <th className="px-4 py-3" scope="col">
                  Ukuran
                </th>
                <th className="px-4 py-3" scope="col">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((asset) => {
                const previewUrl =
                  asset.provider === "cloudinary"
                    ? (asset.secure_url ?? null)
                    : asset.storage_path
                      ? `/${asset.storage_path}`
                      : null;
                return (
                  <tr key={asset.id}>
                    <td className="px-4 py-3">
                      {previewUrl ? (
                        <img
                          alt={asset.alt_text ?? asset.original_filename ?? "Media desa"}
                          className="h-12 w-12 rounded-lg object-cover"
                          src={previewUrl}
                        />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {asset.original_filename ?? asset.public_id ?? "—"}
                      <span className="block max-w-[320px] truncate text-xs font-normal text-gray-500">
                        {asset.public_id ?? asset.storage_path ?? ""}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {asset.provider === "cloudinary"
                        ? "Cloudinary"
                        : "Supabase Storage"}
                    </td>
                    <td className="px-4 py-3">
                      {asset.width && asset.height
                        ? `${asset.width}×${asset.height}`
                        : "—"}
                      <span className="block text-xs text-gray-500">
                        {asset.size_bytes != null
                          ? `${Math.round(asset.size_bytes / 1024)} KB`
                          : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <form action={deleteMedia}>
                        <input name="id" type="hidden" value={asset.id} />
                        <button
                          className="font-medium text-red-600 hover:underline"
                          type="submit"
                        >
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
