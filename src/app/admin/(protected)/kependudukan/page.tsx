import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadPopulationRevision,
} from "@/lib/content/revisions";
import { PublishStatusBar } from "../_components/status-bar";
import { RevisionHistoryTable } from "../_components/revision-history-table";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { PopulationForm, type AreaUseRow, type OccupationRow } from "./population-form";

export const metadata: Metadata = {
  title: "Kependudukan",
};

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
      <section aria-labelledby="population-title" className="space-y-6">
        <PageHeader
          kicker="Kependudukan"
          title="Kependudukan"
          titleId="population-title"
        />
        <Alert variant="destructive">
          <AlertDescription>
            Tabel content_sections belum tersedia di database ini. Migration
            content_revisions belum diterapkan, jadi laporan Kependudukan
            belum dapat dikelola.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  const [published, revisions] = await Promise.all([
    getPublishedRevision(supabase, section),
    listRevisionsForSection(supabase, section.id, 20),
  ]);
  const activeRevision = published;
  const activeData = activeRevision
    ? await loadPopulationRevision(supabase, activeRevision.id)
    : { report: null, areaUses: [], occupations: [] };

  const revisionDetails = Object.fromEntries(
    await Promise.all(
      revisions.map(async (revision) => {
        const data = await loadPopulationRevision(supabase, revision.id);
        const item = data.report;
        return [
          revision.id,
          item
            ? `${item.period_label ?? "Laporan tanpa periode"} · Sumber: ${item.source_name ?? "Belum diisi"}`
            : "Laporan tanpa periode",
        ] as const;
      }),
    ),
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
    <section aria-labelledby="population-title" className="space-y-6">
      <PageHeader
        intro="Laporan kependudukan per periode. Ringkasan Beranda mengambil laporan yang aktif di sini, bukan salinan angka."
        kicker="Kependudukan"
        title="Kependudukan"
        titleId="population-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />
      <PublishStatusBar
        lastChangedAt={
          revisions[0]?.created_at ?? published?.published_at ?? null
        }
        publishedRevisionNo={published?.revision_no ?? null}
        sectionLabel="Kependudukan"
      />

      <RevisionHistoryTable
        details={revisionDetails}
        publishedRevisionId={section.published_revision_id}
        revisions={revisions}
        title="Daftar laporan"
      />

      <PopulationForm
        initialAreaUses={initialAreaUses}
        initialOccupations={initialOccupations}
        initialValues={initialValues}
      />

      <ComponentCard title="Pratinjau versi aktif">
        <p className="text-sm text-gray-500">
          {activeRevision
            ? `Menampilkan revisi ${activeRevision.revision_no} yang sedang aktif di halaman publik.`
            : "Belum ada data."}{" "}
          <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/infografis">
            Lihat halaman Infografis publik
          </Link>
          .
        </p>
        {report ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[160px_1fr] [&>dd]:text-sm [&>dd]:text-gray-800 [&>dd]: [&>dt]:text-sm [&>dt]:font-medium [&>dt]:text-gray-500 [&>dt]:">
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
          <p className="text-sm text-gray-500">Belum tersedia.</p>
        )}
      </ComponentCard>
    </section>
  );
}
