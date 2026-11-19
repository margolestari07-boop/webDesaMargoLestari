import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getDraftRevision,
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadPopulationRevision,
} from "@/lib/content/drafts";
import { DraftBar } from "../_components/draft-bar";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { PopulationForm, type AreaUseRow, type OccupationRow } from "./population-form";

export const metadata: Metadata = {
  title: "Kependudukan",
};

function formatDate(value: string | null): string {
  return value ?? "Belum diisi";
}

function formatNumber(value: number | null): string {
  return value === null ? "Belum tersedia" : value.toLocaleString("id-ID");
}

function toLocalInput(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 16);
}

export default async function PopulationAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  const section = await getSectionRow(supabase, "population");
  if (!section) {
    return (
      <section aria-labelledby="population-title" className="admin-settings">
        <PageHeader
          kicker="Kependudukan"
          title="Kependudukan"
          titleId="population-title"
        />
        <p className="admin-settings-error" role="alert">
          Tabel content_sections belum tersedia di database ini. Migration
          content_revisions belum diterapkan, jadi laporan Kependudukan belum
          dapat dikelola.
        </p>
      </section>
    );
  }

  const [draft, published, revisions] = await Promise.all([
    getDraftRevision(supabase, section.id),
    getPublishedRevision(supabase, section),
    listRevisionsForSection(supabase, section.id, 20),
  ]);
  const activeRevision = draft ?? published;
  const activeData = activeRevision
    ? await loadPopulationRevision(supabase, activeRevision.id)
    : { report: null, areaUses: [], occupations: [] };

  const revisionSummaries = await Promise.all(
    revisions.map(async (revision) => {
      const data = await loadPopulationRevision(supabase, revision.id);
      return { revision, report: data.report };
    }),
  );

  const report = activeData.report;
  const initialValues: Record<string, string> = {
    period_label: report?.period_label ?? "",
    period_start: report?.period_start ?? "",
    period_end: report?.period_end ?? "",
    source_name: report?.source_name ?? "",
    source_reference: report?.source_reference ?? "",
    data_updated_at: toLocalInput(report?.data_updated_at ?? null),
    total_population: report?.total_population?.toString() ?? "",
    total_households: report?.total_households?.toString() ?? "",
    male_count: report?.male_count?.toString() ?? "",
    female_count: report?.female_count?.toString() ?? "",
    productive_age_count: report?.productive_age_count?.toString() ?? "",
    area_value: report?.area_value?.toString() ?? "",
    area_unit: report?.area_unit ?? "",
  };
  const initialAreaUses: AreaUseRow[] = activeData.areaUses.map(
    (item, index) => ({
      clientId: `area-${item.id}`,
      category: item.category,
      area_value: item.area_value?.toString() ?? "",
      area_unit: item.area_unit ?? "",
      sort_order: String(item.sort_order ?? index),
      source_note: item.source_note ?? "",
    }),
  );
  const initialOccupations: OccupationRow[] = activeData.occupations.map(
    (item, index) => ({
      clientId: `job-${item.id}`,
      name: item.name,
      person_count: item.person_count?.toString() ?? "",
      sort_order: String(item.sort_order ?? index),
      source_note: item.source_note ?? "",
    }),
  );

  return (
    <section aria-labelledby="population-title" className="admin-settings">
      <PageHeader
        intro="Laporan kependudukan per periode. Ringkasan Beranda mengambil laporan yang sudah terbit di sini, bukan salinan angka."
        kicker="Kependudukan"
        title="Kependudukan"
        titleId="population-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />
      <DraftBar
        draftRevisionId={draft?.id ?? null}
        draftRevisionNo={draft?.revision_no ?? null}
        publishedRevisionNo={published?.revision_no ?? null}
        returnPath="/admin/kependudukan"
        sectionKey="population"
        sectionLabel="Kependudukan"
        showCreateDraft={!draft}
      />

      <h2>Daftar laporan ({revisionSummaries.length})</h2>
      {revisionSummaries.length === 0 ? (
        <p className="admin-section-note">
          Belum ada laporan. Buat draf pertama dari form di bawah.
        </p>
      ) : (
        <ul className="admin-revision-list">
          {revisionSummaries.map(({ revision, report: item }) => (
            <li className="admin-revision-item" key={revision.id}>
              <strong>
                {item?.period_label ?? "Laporan tanpa periode"} — revisi{" "}
                {revision.revision_no} ({revision.status})
              </strong>
              <p className="admin-revision-meta">
                Sumber: {item?.source_name ?? "Belum diisi"} · Data diperbarui:{" "}
                {formatDate(item?.data_updated_at ?? null)} · Dibuat:{" "}
                {new Date(revision.created_at).toLocaleDateString("id-ID")}
                {revision.published_at
                  ? ` · Terbit: ${new Date(revision.published_at).toLocaleDateString("id-ID")}`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      )}

      <PopulationForm
        hasDraft={Boolean(draft)}
        initialAreaUses={initialAreaUses}
        initialOccupations={initialOccupations}
        initialValues={initialValues}
      />

      <div className="admin-preview">
        <h2>Pratinjau draf / versi terbit aktif</h2>
        <p className="admin-section-note">
          {activeRevision
            ? `Menampilkan revisi ${activeRevision.revision_no} (${activeRevision.status}).`
            : "Belum ada draf maupun versi terbit."}{" "}
          Halaman publik hanya menampilkan revisi yang sudah diterbitkan;{" "}
          <Link className="admin-card-link" href="/infografis">
            lihat halaman Infografis publik
          </Link>
          .
        </p>
        {report ? (
          <dl>
            <dt>Periode</dt>
            <dd>{report.period_label}</dd>
            <dt>Total penduduk</dt>
            <dd>{formatNumber(report.total_population)}</dd>
            <dt>Jumlah KK</dt>
            <dd>{formatNumber(report.total_households)}</dd>
            <dt>Laki-laki / Perempuan</dt>
            <dd>
              {formatNumber(report.male_count)} /{" "}
              {formatNumber(report.female_count)}
            </dd>
            <dt>Usia produktif</dt>
            <dd>{formatNumber(report.productive_age_count)}</dd>
            <dt>Luas wilayah</dt>
            <dd>
              {report.area_value === null
                ? "Belum tersedia"
                : `${report.area_value} ${report.area_unit ?? ""}`}
            </dd>
            <dt>Sumber</dt>
            <dd>{report.source_name ?? "Belum diisi"}</dd>
          </dl>
        ) : (
          <p className="admin-section-note">Belum tersedia.</p>
        )}
      </div>
    </section>
  );
}
