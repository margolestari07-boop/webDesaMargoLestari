import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { requireAdmin } from "@/lib/supabase/authorization";
import { loadApbdesData } from "@/lib/content/data";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { ApbdesForm, type MoneyRow } from "./apbdes-form";

export const metadata: Metadata = {
  title: "APBDes",
};

function formatRupiah(value: number | null): string {
  if (value === null) return "Belum tersedia";
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default async function ApbdesAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  // Tanpa revisi: data dibaca langsung dari tabel dan langsung live.
  const apbdesData = await loadApbdesData(supabase);

  const report = apbdesData.report;
  const initialValues: Record<string, string> = {
    fiscal_year: report?.fiscal_year?.toString() ?? "",
    period_label: report?.period_label ?? "",
    period_start: report?.period_start ?? "",
    period_end: report?.period_end ?? "",
    source_document: report?.source_document ?? "",
    source_note: report?.source_note ?? "",
    notes: report?.notes ?? "",
  };
  const toMoneyRow = (
    item: {
      id: string;
      budget: number | null;
      realization: number | null;
      sort_order: number;
      source_note: string | null;
    },
    label: string,
    kind: MoneyRow["kind"],
    index: number,
  ): MoneyRow => ({
    clientId: `apbdes-${item.id}`,
    label,
    kind,
    budget: item.budget?.toString() ?? "",
    realization: item.realization?.toString() ?? "",
    sort_order: String(item.sort_order ?? index),
    source_note: item.source_note ?? "",
  });
  const initialRealizations = apbdesData.realizations.map((item, index) =>
    toMoneyRow(item, item.label, item.kind as MoneyRow["kind"], index),
  );
  const initialSpendingFields = apbdesData.spendingFields.map((item, index) =>
    toMoneyRow(item, item.field_name, "", index),
  );
  const initialRevenueSources = apbdesData.revenueSources.map((item, index) =>
    toMoneyRow(item, item.source_name, "", index),
  );

  return (
    <section aria-labelledby="apbdes-title" className="space-y-6">
      <PageHeader
        intro="Laporan APBDes per tahun anggaran dan periode. Pagu dan realisasi diisi bila tersedia dari dokumen sumber; kosong berarti belum tersedia, bukan nol."
        kicker="APBDes"
        title="APBDes"
        titleId="apbdes-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />

      <ApbdesForm
        initialRealizations={initialRealizations}
        initialRevenueSources={initialRevenueSources}
        initialSpendingFields={initialSpendingFields}
        initialValues={initialValues}
      />

      <ComponentCard title="Pratinjau data aktif">
        <p className="text-sm text-gray-500">
          {report
            ? "Menampilkan data yang sedang tampil di halaman publik."
            : "Belum ada data."}{" "}
          <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/infografis/apbdes">
            Lihat halaman APBDes publik
          </Link>
          .
        </p>
        {report ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[160px_1fr] [&>dd]:text-sm [&>dd]:text-gray-800 [&>dd]: [&>dt]:text-sm [&>dt]:font-medium [&>dt]:text-gray-500 [&>dt]:">
            <dt>Tahun anggaran</dt>
            <dd>{report.fiscal_year}</dd>
            <dt>Periode</dt>
            <dd>{report.period_label}</dd>
            <dt>Realisasi</dt>
            <dd>
              {apbdesData.realizations.length === 0
                ? "Belum tersedia"
                : apbdesData.realizations
                    .map(
                      (item) =>
                        `${item.label}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
            <dt>Bidang belanja</dt>
            <dd>
              {apbdesData.spendingFields.length === 0
                ? "Belum tersedia"
                : apbdesData.spendingFields
                    .map(
                      (item) =>
                        `${item.field_name}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
            <dt>Sumber pendapatan</dt>
            <dd>
              {apbdesData.revenueSources.length === 0
                ? "Belum tersedia"
                : apbdesData.revenueSources
                    .map(
                      (item) =>
                        `${item.source_name}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
          </dl>
        ) : (
          <p className="text-sm text-gray-500">Belum tersedia.</p>
        )}
      </ComponentCard>
    </section>
  );
}
