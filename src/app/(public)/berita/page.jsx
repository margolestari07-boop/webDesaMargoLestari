import Link from "next/link";
import { NewsArchive } from "@/components/news-archive";
import { NewsCard } from "@/components/news-card";
import {
  NEWS_CATEGORIES,
  getNewsArchiveCounts,
  getPopularNews,
  listPublishedNews,
} from "@/lib/content/news";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { NewsSortSelect } from "./news-sort-select";

export const metadata = {
  title: "Warta & Berita Desa Margo Lestari",
};

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

function formatDateShort(value) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function formatDateLong(value) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function readTimeOf(article) {
  const words = (article.content ?? article.excerpt ?? "")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} mnt baca`;
}

function toCardArticle(article) {
  return {
    category: article.category,
    categoryClass:
      categoryClasses[article.category] ?? categoryClasses.Lainnya,
    date: formatDateLong(article.published_at ?? article.created_at),
    readTime: readTimeOf(article),
    title: article.title,
    excerpt: article.excerpt ?? "",
    author: article.author ?? "Admin Desa",
    authorIcon: "person",
    imageAlt: article.image_alt ?? article.title,
    image: article.image_url ?? "/logo-pemerintah-desa.jpg",
    slug: article.slug,
  };
}

function withParams(base, overrides) {
  const params = new URLSearchParams(base);
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined || value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }
  const query = params.toString();
  return query ? `/berita?${query}` : "/berita";
}

/**
 * Berita dinamis: artikel dibaca dari tabel news_articles (hanya yang
 * berstatus published). Pencarian, filter kategori, pengurutan, dan
 * paginasi berjalan lewat parameter URL (?q=&category=&sort=&page=).
 * Arsip dan Berita Populer juga dihitung dari database, bukan angka statis.
 */
export default async function BeritaPage({ searchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category =
    typeof params.category === "string" ? params.category : "";
  const sort = params.sort === "popular" || params.sort === "oldest"
    ? params.sort
    : "newest";
  const page = Number.parseInt(params.page, 10) || 1;

  const [result, archiveCounts, popular, settings] = await Promise.all([
    listPublishedNews({ search: q, category, sort, page }),
    getNewsArchiveCounts(),
    getPopularNews(4),
    getPublicSiteSettings(),
  ]);

  const { articles, total, totalPages, page: currentPage } = result;
  const from = total === 0 ? 0 : (currentPage - 1) * 6 + 1;
  const to = Math.min(total, currentPage * 6);

  const currentParams = new URLSearchParams();
  if (q) currentParams.set("q", q);
  if (category) currentParams.set("category", category);
  if (sort !== "newest") currentParams.set("sort", sort);

  const archive = archiveCounts.map(({ category: name, count }) => ({
    year: `${name} (${count} Berita)`,
    icon: "folder_open",
    months: [[name, `${count} berita`]],
  }));

  const helpPhone = settings?.phone ?? "+62 821-1439-7667";
  const helpEmail = settings?.email ?? "margolestari07@gmail.com";

  return (
    <main className="bg-surface min-h-[calc(100vh-80px)] w-full pt-20">
      <div className="flex w-full flex-col">
        <section className="from-surface-container-low via-surface to-surface w-full bg-gradient-to-b pb-10">
          <div className="px-gutter mx-auto max-w-7xl pt-8">
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
              <span className="text-primary font-semibold">
                Berita &amp; Pengumuman
              </span>
            </nav>
            <div className="flex max-w-3xl flex-col gap-3">
              <h1 className="font-display text-display text-on-surface leading-tight tracking-tight">
                Berita{" "}
                <span className="text-primary-container">
                  Desa Margo Lestari
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1 leading-relaxed">
                Informasi aktual seputar pembangunan desa, kegiatan
                kemasyarakatan, inovasi pertanian, pelayanan publik, dan
                transparansi pemerintahan Desa Margo Lestari.
              </p>
            </div>
            <div className="bg-surface-container-lowest mt-8 flex flex-col gap-4 rounded-2xl p-3 shadow-md">
              <form
                action="/berita"
                className="relative flex w-full items-center"
                method="get"
              >
                {category && (
                  <input name="category" type="hidden" value={category} />
                )}
                {sort !== "newest" && (
                  <input name="sort" type="hidden" value={sort} />
                )}
                <span
                  className={`${materialIconClass} text-primary pointer-events-none absolute left-4 text-[22px]`}
                >
                  search
                </span>
                <input
                  className="font-body-md text-body-md text-on-surface placeholder:text-outline bg-surface-container-low focus:bg-surface-container-lowest w-full rounded-xl py-3.5 pr-28 pl-12 shadow-inner transition-all focus:outline-none"
                  defaultValue={q}
                  name="q"
                  placeholder="Cari judul berita, agenda, atau kata kunci..."
                  type="text"
                />
                <button
                  className="font-label-md text-label-md bg-primary-container text-on-primary hover:bg-primary absolute right-2 rounded-lg px-5 py-2.5 shadow-sm transition-colors"
                  type="submit"
                >
                  Cari
                </button>
              </form>
              <div className="flex scrollbar-none items-center gap-2 overflow-x-auto pb-1.5 text-nowrap">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 px-2">
                  <span className={`${materialIconClass} text-[16px]`}>
                    tune
                  </span>
                  Kategori:
                </span>
                <Link
                  className={`font-label-sm text-label-sm rounded-full px-4 py-1.5 shadow-sm transition-all hover:opacity-95 ${
                    category === ""
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                  }`}
                  href={withParams(currentParams, { category: "", page: "" })}
                >
                  Semua Kategori
                </Link>
                {NEWS_CATEGORIES.map((name) => (
                  <Link
                    className={`font-label-sm text-label-sm rounded-full px-4 py-1.5 transition-colors ${
                      category === name
                        ? "bg-primary-container text-on-primary shadow-sm"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                    }`}
                    href={withParams(currentParams, {
                      category: name,
                      page: "",
                    })}
                    key={name}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface w-full pb-20">
          <div className="px-gutter mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="bg-surface-container-low flex flex-col justify-between gap-3 rounded-2xl px-5 py-3 sm:flex-row sm:items-center">
                <div className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="bg-primary-container h-2 w-2 rounded-full" />
                  <span>
                    Menampilkan{" "}
                    <strong className="text-on-surface">
                      {total === 0 ? "0" : `${from}–${to}`}
                    </strong>{" "}
                    dari <strong className="text-on-surface">{total}</strong>{" "}
                    Berita Terbit
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <label
                    className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap"
                    htmlFor="sortNews"
                  >
                    Urutkan:
                  </label>
                  <NewsSortSelect
                    currentParams={currentParams.toString()}
                    value={sort}
                  />
                </div>
              </div>
              {articles.length === 0 ? (
                <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-3xl p-8 shadow-sm">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Tidak ada berita yang cocok
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Coba kata kunci atau kategori lain, atau{" "}
                    <Link
                      className="text-primary font-semibold underline"
                      href="/berita"
                    >
                      tampilkan semua berita
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {articles.map((article) => (
                    <Link
                      href={`/berita/${article.slug}`}
                      key={article.slug}
                    >
                      <NewsCard article={toCardArticle(article)} />
                    </Link>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="bg-surface-container-lowest mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl p-5 shadow-sm sm:flex-row">
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
                    Halaman{" "}
                    <span className="text-on-surface font-bold">
                      {currentPage}
                    </span>{" "}
                    dari{" "}
                    <span className="text-on-surface font-bold">
                      {totalPages}
                    </span>{" "}
                    halaman{" "}
                    <span className="text-outline-variant font-normal">
                      | Total {total} artikel berita terarsip
                    </span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {currentPage > 1 ? (
                      <Link
                        aria-label="Halaman Sebelumnya"
                        className="font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary flex items-center gap-1 rounded-xl px-3 py-2 shadow-sm transition-colors"
                        href={withParams(currentParams, {
                          page: String(currentPage - 1),
                        })}
                      >
                        <span className={`${materialIconClass} text-[18px]`}>
                          chevron_left
                        </span>
                        <span className="hidden md:inline">Sebelumnya</span>
                      </Link>
                    ) : (
                      <span
                        aria-label="Halaman Sebelumnya"
                        className="font-label-sm text-label-sm bg-surface-container text-outline flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 opacity-60"
                      >
                        <span className={`${materialIconClass} text-[18px]`}>
                          chevron_left
                        </span>
                        <span className="hidden md:inline">Sebelumnya</span>
                      </span>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) =>
                        pageNumber === currentPage ? (
                          <span
                            aria-current="page"
                            className="font-label-md text-label-md bg-primary-container text-on-primary h-10 w-10 rounded-xl font-bold shadow-md inline-flex items-center justify-center"
                            key={pageNumber}
                          >
                            {pageNumber}
                          </span>
                        ) : (
                          <Link
                            className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant h-10 w-10 rounded-xl transition-colors inline-flex items-center justify-center"
                            href={withParams(currentParams, {
                              page: String(pageNumber),
                            })}
                            key={pageNumber}
                          >
                            {pageNumber}
                          </Link>
                        ),
                    )}
                    {currentPage < totalPages ? (
                      <Link
                        aria-label="Halaman Berikutnya"
                        className="font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary flex items-center gap-1 rounded-xl px-3 py-2 shadow-sm transition-colors"
                        href={withParams(currentParams, {
                          page: String(currentPage + 1),
                        })}
                      >
                        <span className="hidden md:inline">Berikutnya</span>
                        <span className={`${materialIconClass} text-[18px]`}>
                          chevron_right
                        </span>
                      </Link>
                    ) : (
                      <span
                        aria-label="Halaman Berikutnya"
                        className="font-label-sm text-label-sm bg-surface-container text-outline flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 opacity-60"
                      >
                        <span className="hidden md:inline">Berikutnya</span>
                        <span className={`${materialIconClass} text-[18px]`}>
                          chevron_right
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="flex w-full flex-col gap-6 lg:col-span-4">
              <NewsArchive archive={archive} />
              <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-2">
                  <span className="bg-secondary-container text-on-secondary-container flex h-8 w-8 items-center justify-center rounded-full">
                    <span className={`${materialIconClass} text-[18px]`}>
                      trending_up
                    </span>
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Berita Populer
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Paling banyak dibaca warga
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3.5">
                  {popular.map((article) => (
                    <Link
                      className="group hover:bg-surface-container-low flex items-center gap-3 rounded-2xl p-2 transition-colors"
                      href={`/berita/${article.slug}`}
                      key={article.slug}
                    >
                      <div className="bg-surface-container h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <img
                          alt={article.image_alt ?? article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={article.image_url ?? "/logo-pemerintah-desa.jpg"}
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary-container line-clamp-2 font-bold transition-colors">
                          {article.title}
                        </h4>
                        <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                          <span>
                            {article.views.toLocaleString("id-ID")} dibaca
                          </span>
                          <span>•</span>
                          <span>
                            {formatDateShort(
                              article.published_at ?? article.created_at,
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low flex flex-col gap-3.5 rounded-3xl p-6">
                <div className="flex items-center gap-2.5">
                  <span className="bg-surface-container-highest text-primary flex h-8 w-8 items-center justify-center rounded-full">
                    <span className={`${materialIconClass} text-[20px]`}>
                      feed
                    </span>
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Kanal Redaksi Warga
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Punya agenda kemasyarakatan RT/RW, dokumentasi kegiatan dusun,
                  atau rilis prestasi warga yang ingin diliput di Warta Desa?
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    className="font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary flex items-center gap-2.5 rounded-xl p-3 shadow-sm transition-colors"
                    href={`mailto:${helpEmail}`}
                  >
                    <span
                      className={`${materialIconClass} text-primary text-[20px]`}
                    >
                      mail
                    </span>
                    <span className="truncate">{helpEmail}</span>
                  </a>
                  <a
                    className="font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary flex items-center gap-2.5 rounded-xl p-3 shadow-sm transition-colors"
                    href={`https://wa.me/${helpPhone.replaceAll(/[^0-9]/g, "")}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      chat
                    </span>
                    <span>WhatsApp Humas: {helpPhone}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
