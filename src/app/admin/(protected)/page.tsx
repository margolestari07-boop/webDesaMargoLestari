import type { Metadata } from "next";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/database";
import { requireAdmin } from "@/lib/supabase/authorization";
import { PageHeader } from "./_components/page-header";
import {
  getDraftRevision,
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadApbdesRevision,
  loadHomeRevision,
  loadPopulationRevision,
  loadProfileRevision,
  sectionLabel,
  type RevisionRow,
} from "@/lib/content/drafts";
import type { SectionKey } from "@/lib/content/sections";

export const metadata: Metadata = {
  title: "Ringkasan Pengelola",
};

type SectionSummary = {
  key: SectionKey;
  href: string;
  draft: RevisionRow | null;
  published: RevisionRow | null;
  revisionCount: number;
  checks: { label: string; done: boolean }[];
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
    draft: null,
    published: null,
    revisionCount: 0,
    checks: [],
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
    const [draft, published, revisions] = await Promise.all([
      getDraftRevision(supabase, section.id),
      getPublishedRevision(supabase, section),
      listRevisionsForSection(supabase, section.id, 20),
    ]);
    const activeRevision = draft ?? published;
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
      draft,
      published,
      revisionCount: revisions.length,
      checks,
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

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const summaries = await Promise.all(
    SECTION_ORDER.map(({ key, href }) => loadSummary(supabase, key, href)),
  );
  const pendingDrafts = summaries.filter((item) => item.draft).length;
  const publishedCount = summaries.filter((item) => item.published).length;
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

  return (
    <section aria-labelledby="admin-title" className="admin-dashboard">
      <PageHeader
        intro={
          <>
            Status publikasi empat area konten. Draf tidak terlihat di halaman
            publik sampai diterbitkan.
            {pendingDrafts > 0
              ? ` Ada ${pendingDrafts} draf yang belum diterbitkan.`
              : " Tidak ada draf yang menunggu diterbitkan."}
          </>
        }
        kicker="Ringkasan"
        title="Panel pengelola"
        titleId="admin-title"
      />

      <div className="admin-stats">
        <div className="admin-stat">
          <span aria-hidden="true" className="admin-stat-icon">
            <span className="material-symbols-outlined">edit_note</span>
          </span>
          <span className="admin-stat-body">
            <span className="admin-stat-value">{pendingDrafts}</span>
            <span className="admin-stat-label">Draf menunggu terbit</span>
          </span>
        </div>
        <div className="admin-stat">
          <span aria-hidden="true" className="admin-stat-icon">
            <span className="material-symbols-outlined">publish</span>
          </span>
          <span className="admin-stat-body">
            <span className="admin-stat-value">{publishedCount}</span>
            <span className="admin-stat-label">Bagian sudah terbit</span>
          </span>
        </div>
        <div className="admin-stat">
          <span aria-hidden="true" className="admin-stat-icon">
            <span className="material-symbols-outlined">history</span>
          </span>
          <span className="admin-stat-body">
            <span className="admin-stat-value">{totalRevisions}</span>
            <span className="admin-stat-label">Total revisi</span>
          </span>
        </div>
        <div className="admin-stat">
          <span aria-hidden="true" className="admin-stat-icon">
            <span className="material-symbols-outlined">check_circle</span>
          </span>
          <span className="admin-stat-body">
            <span className="admin-stat-value">
              {doneChecks}/{totalChecks}
            </span>
            <span className="admin-stat-label">Pemeriksaan lengkap</span>
          </span>
        </div>
      </div>

      <div className="admin-dashboard-cards">
        {summaries.map((summary) => (
          <article className="admin-card" key={summary.key}>
            <h2>{sectionLabel(summary.key)}</h2>
            {summary.error ? (
              <p className="admin-settings-error" role="alert">
                {summary.error}
              </p>
            ) : (
              <>
                <div className="admin-card-status">
                  {summary.draft ? (
                    <Badge tone="warning">
                      Draf revisi {summary.draft.revision_no}
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Belum ada draf</Badge>
                  )}
                  {summary.published ? (
                    <Badge tone="success">
                      Terbit: revisi {summary.published.revision_no}
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Belum diterbitkan</Badge>
                  )}
                  <Badge tone="neutral">
                    {summary.revisionCount} revisi
                  </Badge>
                </div>
                {summary.checks.length > 0 ? (
                  <ul>
                    {summary.checks.map((check) => (
                      <li key={check.label}>
                        {check.done ? "✓" : "○"} {check.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    Belum ada draf maupun revisi terbit untuk bagian ini.
                  </p>
                )}
              </>
            )}
            <Link className="admin-card-link" href={summary.href}>
              Kelola {sectionLabel(summary.key)}
            </Link>
          </article>
        ))}
      </div>

      <p style={{ marginTop: 28 }}>
        <Link className="admin-settings-link" href="/admin/pengaturan">
          Buka pengaturan situs
        </Link>
      </p>
    </section>
  );
}
