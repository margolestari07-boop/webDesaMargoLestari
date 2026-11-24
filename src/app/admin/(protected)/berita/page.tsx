import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import { PageHeader } from "../_components/page-header";
import { deleteNews } from "./actions";

export const metadata: Metadata = {
  title: "Berita",
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

/** Daftar artikel berita (draf + terbit) untuk pengelola. */
export default async function NewsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data: articles } = await supabase
    .from("news_articles")
    .select("id, slug, title, category, status, published_at, views, updated_at")
    .order("updated_at", { ascending: false });

  const rows = articles ?? [];

  return (
    <section aria-labelledby="news-title" className="space-y-6">
      <PageHeader
        actions={
          <Link
            className="inline-flex items-center rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            href="/admin/berita/baru"
          >
            Tambah berita
          </Link>
        }
        intro="Artikel berstatus Terbit tampil di halaman /berita. Draf hanya terlihat di panel ini."
        kicker="Berita"
        title="Berita"
        titleId="news-title"
      />

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">
          Belum ada artikel berita. Tambahkan berita pertama lewat tombol di
          atas.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3" scope="col">
                  Judul
                </th>
                <th className="px-4 py-3" scope="col">
                  Kategori
                </th>
                <th className="px-4 py-3" scope="col">
                  Status
                </th>
                <th className="px-4 py-3" scope="col">
                  Terbit
                </th>
                <th className="px-4 py-3" scope="col">
                  Dibaca
                </th>
                <th className="px-4 py-3" scope="col">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3 font-medium">
                    <Link
                      className="hover:text-brand-600 hover:underline"
                      href={`/admin/berita/${article.id}`}
                    >
                      {article.title}
                    </Link>
                    <span className="block text-xs font-normal text-gray-500">
                      /berita/{article.slug}
                    </span>
                  </td>
                  <td className="px-4 py-3">{article.category}</td>
                  <td className="px-4 py-3">
                    {article.status === "published" ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        Terbit
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                        Draf
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(article.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    {article.views.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        className="font-medium text-brand-600 hover:underline"
                        href={`/admin/berita/${article.id}`}
                      >
                        Ubah
                      </Link>
                      {article.status === "published" && (
                        <Link
                          className="font-medium text-gray-600 hover:underline"
                          href={`/berita/${article.slug}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Lihat
                        </Link>
                      )}
                      <form action={deleteNews}>
                        <input name="id" type="hidden" value={article.id} />
                        <button
                          className="font-medium text-red-600 hover:underline"
                          type="submit"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
