import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedNewsBySlug } from "@/lib/content/news";

const materialIconClass = "material-symbols-outlined";

const categoryClasses = {
  Pembangunan: "bg-primary-container text-on-primary",
  Kesehatan: "bg-secondary text-on-secondary",
  Pertanian: "bg-secondary-container text-on-secondary-container font-bold",
  Pengumuman: "bg-tertiary-container text-on-tertiary-container",
  Kemasyarakatan: "bg-primary-fixed text-on-primary-fixed-variant font-bold",
  "UMKM & Ekonomi": "bg-secondary-fixed text-on-secondary-fixed font-bold",
  Pemerintahan: "bg-primary-container text-on-primary",
  "Pendidikan & Pemuda": "bg-tertiary text-on-tertiary",
  Kebudayaan: "bg-secondary text-on-secondary",
  Lainnya: "bg-surface-container text-on-surface-variant",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug);
  if (!article) return { title: "Berita tidak ditemukan" };
  return {
    title: `${article.title} | Berita Desa Margo Lestari`,
    description: article.excerpt ?? undefined,
  };
}

/** Halaman detail berita: hanya artikel berstatus published yang bisa dibuka. */
export default async function BeritaDetailPage({ params }) {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug);
  if (!article) notFound();

  const date = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.published_at ?? article.created_at));
  const paragraphs = (article.content ?? article.excerpt ?? "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <main className="bg-surface min-h-[calc(100vh-80px)] w-full pt-20">
      <div className="flex w-full flex-col">
        <article className="px-gutter mx-auto w-full max-w-4xl py-10">
          <nav
            aria-label="Breadcrumb"
            className="font-label-md text-label-md text-on-surface-variant mb-6 flex items-center gap-2"
          >
            <Link
              className="hover:text-primary flex items-center gap-1.5 transition-colors"
              href="/"
            >
              <span className={`${materialIconClass} text-[18px]`}>home</span>
              <span>Beranda</span>
            </Link>
            <span
              className={`${materialIconClass} text-outline-variant text-[14px]`}
            >
              chevron_right
            </span>
            <Link className="hover:text-primary transition-colors" href="/berita">
              Berita &amp; Pengumuman
            </Link>
          </nav>

          <span
            className={`font-label-sm text-label-sm inline-block rounded-full px-3 py-1 shadow-md ${
              categoryClasses[article.category] ?? categoryClasses.Lainnya
            }`}
          >
            {article.category}
          </span>
          <h1 className="font-display text-display text-on-surface mt-4 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="font-label-md text-label-md text-on-surface-variant mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <span className={`${materialIconClass} text-primary text-[18px]`}>
                calendar_today
              </span>
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`${materialIconClass} text-[18px]`}>person</span>
              {article.author ?? "Admin Desa"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`${materialIconClass} text-[18px]`}>
                visibility
              </span>
              {article.views.toLocaleString("id-ID")} dibaca
            </span>
          </div>

          {article.image_url && (
            <div className="bg-surface-container mt-8 overflow-hidden rounded-3xl">
              <img
                alt={article.image_alt ?? article.title}
                className="h-auto w-full object-cover"
                src={article.image_url}
              />
            </div>
          )}

          <div className="font-body-lg text-body-lg text-on-surface mt-8 flex flex-col gap-5 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <Link
              className="font-label-md text-label-md bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 shadow-sm transition-all"
              href="/berita"
            >
              <span className={`${materialIconClass} text-[18px]`}>
                arrow_back
              </span>
              Kembali ke Daftar Berita
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
