import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { requireAdmin } from "@/lib/supabase/authorization";
import { loadPopulationData } from "@/lib/content/data";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { PopulationForm, type AreaUseRow, type OccupationRow } from "./population-form";

export const metadata: Metadata = {
  title: "Kependudukan",
};

function formatNumber(value: number | null): string {
  return value === null ? "Belum tersedia" : value.toLocaleString("id-ID");
}

export default async function PopulationAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  // Tanpa revisi: data dibaca langsung dari tabel dan langsung live.
  const populationData = await loadPopulationData(supabase);

  const report = populationData.report;
  const initialValues: Record<string, string> = {
    period_label: report?.period_label ?? "",
    period_start: report?.period_start ?? "",
    period_end: report?.period_end ?? "",
    source_name: report?.source_name ?? "",
    source_reference: report?.source_reference ?? "",
    total_population: report?.total_population?.toString() ?? "",
    total_households: report?.total_households?.toString() ?? "",
    male_count: report?.male_count?.toString() ?? "",
    female_count: report?.female_count?.toString() ?? "",
    productive_age_count: report?.productive_age_count?.toString() ?? "",
    area_value: report?.area_value?.toString() ?? "",
    area_unit: report?.area_unit ?? "",
  };
  const initialAreaUses: AreaUseRow[] = populationData.areaUses.map(
    (item, index) => ({
      clientId: `area-${item.id}`,
      category: item.category,
      area_value: item.area_value?.toString() ?? "",
      area_unit: item.area_unit ?? "",
      sort_order: String(item.sort_order ?? index),
      source_note: item.source_note ?? "",
    }),
  );
  const initialOccupations: OccupationRow[] = populationData.occupations.map(
    (item, index) => ({
      clientId: `job-${item.id}`,
      name: item.name,
      person_count: item.person_count?.toString() ?? "",
      sort_order: String(item.sort_order ?? index),
    }),
  );

  return (
    <section aria-labelledby="population-title" className="space-y-6">
      <PageHeader
        intro="Laporan kependudukan per periode. Ringkasan Beranda mengambil laporan di sini, bukan salinan angka."
        kicker="Kependudukan"
        title="Kependudukan"
        titleId="population-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />

      <PopulationForm
        initialAreaUses={initialAreaUses}
        initialOccupations={initialOccupations}
        initialValues={initialValues}
      />

      <ComponentCard title="Pratinjau data aktif">
        <p className="text-sm text-gray-500">
          {report
            ? "Menampilkan data yang sedang tampil di halaman publik."
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
