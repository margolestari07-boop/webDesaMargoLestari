import type { Metadata } from "next";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import ComponentCard from "@/components/tailadmin/common/component-card";
import {
  CalendarIcon,
  CheckCircleIcon,
  LayoutGridIcon,
  TimeIcon,
} from "@/components/tailadmin/icons";
import MetricCard from "@/components/tailadmin/metrics/metric-card";
import { Badge } from "@/components/tailadmin/ui/badge";
import type { Database } from "@/types/database";
import { requireAdmin } from "@/lib/supabase/authorization";
import { PageHeader } from "./_components/page-header";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadApbdesRevision,
  loadHomeRevision,
  loadPopulationRevision,
  loadProfileRevision,
  sectionLabel,
  type RevisionRow,
} from "@/lib/content/revisions";
import type { SectionKey } from "@/lib/content/sections";

export const metadata: Metadata = {
  title: "Ringkasan Pengelola",
};

type SectionSummary = {
  key: SectionKey;
  href: string;
  published: RevisionRow | null;
  revisionCount: number;
  checks: { label: string; done: boolean }[];
  lastChangedAt: string | null;
  error: string | null;
};

const SECTION_ORDER: { key: SectionKey; href: string }[] = [
  { key: "home", href: "/admin/beranda" },
  { key: "profile", href: "/admin/profil" },
  { key: "population", href: "/admin/kependudukan" },
  { key: "apbdes", href: "/admin/apbdes" },
];

async function loadSummary(
  supabase: SupabaseClient<Database>,
  key: SectionKey,
  href: string,
): Promise<SectionSummary> {
  const empty: SectionSummary = {
    key,
    href,
    published: null,
    revisionCount: 0,
    checks: [],
    lastChangedAt: null,
    error: null,
  };
  try {
    const section = await getSectionRow(supabase, key);
    if (!section) {
      return {
        ...empty,
        error:
          "Tabel content_sections belum tersedia di database ini. Migration content_revisions belum diterapkan.",
      };
    }
    const [published, revisions] = await Promise.all([
      getPublishedRevision(supabase, section),
      listRevisionsForSection(supabase, section.id, 20),
    ]);
    const activeRevision = published;
    let checks: { label: string; done: boolean }[] = [];
    if (activeRevision) {
      if (key === "home") {
        const data = await loadHomeRevision(supabase, activeRevision.id);
        checks = [
          { label: "Teks Beranda terisi", done: Boolean(data.content) },
          {
            label: `Struktur organisasi (${data.officers.length} pejabat)`,
            done: data.officers.length > 0,
          },
          {
            label: `Galeri (${data.galleryItems.length} item)`,
            done: data.galleryItems.length > 0,
          },
        ];
      } else if (key === "profile") {
        const data = await loadProfileRevision(supabase, activeRevision.id);
        checks = [
          {
            label: "Narasi sejarah terisi",
            done: Boolean(data.content?.history_text),
          },
          {
            label: `Batas wilayah (${data.boundaries.length}/4 arah)`,
            done: data.boundaries.length === 4,
          },
          {
            label: `Dokumen desa (${data.documents.length})`,
            done: data.documents.length > 0,
          },
        ];
      } else if (key === "population") {
        const data = await loadPopulationRevision(supabase, activeRevision.id);
        checks = [
          {
            label: "Laporan kependudukan terisi",
            done: Boolean(data.report),
          },
          {
            label: `Penggunaan wilayah (${data.areaUses.length} kategori)`,
            done: data.areaUses.length > 0,
          },
          {
            label: `Pekerjaan (${data.occupations.length} kategori)`,
            done: data.occupations.length > 0,
          },
        ];
      } else {
        const data = await loadApbdesRevision(supabase, activeRevision.id);
        checks = [
          { label: "Laporan APBDes terisi", done: Boolean(data.report) },
          {
            label: `Realisasi (${data.realizations.length} baris)`,
            done: data.realizations.length > 0,
          },
          {
            label: `Bidang belanja (${data.spendingFields.length} bidang)`,
            done: data.spendingFields.length > 0,
          },
          {
            label: `Sumber pendapatan (${data.revenueSources.length} sumber)`,
            done: data.revenueSources.length > 0,
          },
        ];
      }
    }
    return {
      key,
      href,
      published,
      revisionCount: revisions.length,
      checks,
      lastChangedAt:
        revisions[0]?.created_at ?? published?.published_at ?? null,
      error: null,
    };
  } catch {
    return {
      ...empty,
      error:
        "Ringkasan bagian ini belum dapat dimuat dari database. Periksa koneksi dan migration, lalu muat ulang.",
    };
  }
}

function formatShortDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Dasbor dengan kartu statistik MetricCard dan kartu modul ComponentCard
// TailAdmin asli (src/components/main/dashboard/ecommerce/metrics +
// src/components/common/component-card). Angka-angka dihitung dari data
// nyata seperti sebelumnya — tidak ada angka hiasan.
export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const summaries = await Promise.all(
    SECTION_ORDER.map(({ key, href }) => loadSummary(supabase, key, href)),
  );
  const filledCount = summaries.filter((item) => item.published).length;
  const totalRevisions = summaries.reduce(
    (sum, item) => sum + item.revisionCount,
    0,
  );
  const totalChecks = summaries.reduce(
    (sum, item) => sum + item.checks.length,
    0,
  );
  const doneChecks = summaries.reduce(
    (sum, item) => sum + item.checks.filter((check) => check.done).length,
    0,
  );
  const lastChangedAt = summaries
    .map((item) => item.lastChangedAt)
    .filter((value): value is string => value !== null)
    .sort()
    .at(-1);

  return (
    <section aria-labelledby="admin-title">
      <PageHeader
        intro={
          <>
            Empat area konten situs. Perubahan yang disimpan langsung tampil
            di halaman publik.
          </>
        }
        kicker="Ringkasan"
        title="Panel pengelola"
        titleId="admin-title"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        <MetricCard
          icon={<LayoutGridIcon />}
          title="Bagian terisi"
          value={`${filledCount}/4`}
        />
        <MetricCard
          icon={<TimeIcon />}
          title="Total perubahan"
          value={totalRevisions}
        />
        <MetricCard
          icon={<CheckCircleIcon />}
          title="Pemeriksaan lengkap"
          value={`${doneChecks}/${totalChecks}`}
        />
        <MetricCard
          icon={<CalendarIcon />}
          title="Terakhir diubah"
          value={formatShortDate(lastChangedAt ?? null)}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 xl:grid-cols-2">
        {summaries.map((summary) => (
          <ComponentCard key={summary.key} title={sectionLabel(summary.key)}>
            {summary.error ? (
              <p className="text-sm font-medium text-red-500" role="alert">
                {summary.error}
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {summary.published ? (
                    <Badge color="success" variant="light">
                      Aktif: revisi {summary.published.revision_no}
                    </Badge>
                  ) : (
                    <Badge color="gray" variant="light">
                      Belum ada data
                    </Badge>
                  )}
                  <Badge color="gray" variant="light">
                    {summary.revisionCount} perubahan
                  </Badge>
                  {summary.lastChangedAt ? (
                    <Badge color="gray" variant="light">
                      Diubah {formatShortDate(summary.lastChangedAt)}
                    </Badge>
                  ) : null}
                </div>
                {summary.checks.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                    {summary.checks.map((check) => (
                      <li key={check.label}>
                        {check.done ? "✓" : "○"} {check.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Belum ada data untuk bagian ini. Buka modulnya untuk
                    mengisi.
                  </p>
                )}
              </>
            )}
            <div>
              <Link
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap text-gray-700 shadow-theme-xs transition-all hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
                href={summary.href}
              >
                Kelola {sectionLabel(summary.key)}
              </Link>
            </div>
          </ComponentCard>
        ))}
      </div>

      <p className="mt-7">
        <Link
          className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400"
          href="/admin/pengaturan"
        >
          Buka pengaturan situs
        </Link>
      </p>
    </section>
  );
}
