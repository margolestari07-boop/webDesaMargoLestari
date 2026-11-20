import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadApbdesRevision,
} from "@/lib/content/revisions";
import { PublishStatusBar } from "../_components/status-bar";
import { RevisionHistoryTable } from "../_components/revision-history-table";
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

  const section = await getSectionRow(supabase, "apbdes");
  if (!section) {
    return (
      <section aria-labelledby="apbdes-title" className="space-y-6">
        <PageHeader kicker="APBDes" title="APBDes" titleId="apbdes-title" />
        <Alert variant="destructive">
          <AlertDescription>
            Tabel content_sections belum tersedia di database ini. Migration
          content_revisions belum diterapkan.
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
    ? await loadApbdesRevision(supabase, activeRevision.id)
    : {
        report: null,
        realizations: [],
        spendingFields: [],
        revenueSources: [],
      };

  const revisionDetails = Object.fromEntries(
    await Promise.all(
      revisions.map(async (revision) => {
        const data = await loadApbdesRevision(supabase, revision.id);
        const item = data.report;
        return [
          revision.id,
          item
            ? `Tahun ${item.fiscal_year} — ${item.period_label}`
            : "Laporan tanpa periode",
        ] as const;
      }),
    ),
  );

  const report = activeData.report;
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
  const initialRealizations = activeData.realizations.map((item, index) =>
    toMoneyRow(item, item.label, item.kind as MoneyRow["kind"], index),
  );
  const initialSpendingFields = activeData.spendingFields.map((item, index) =>
    toMoneyRow(item, item.field_name, "", index),
  );
  const initialRevenueSources = activeData.revenueSources.map((item, index) =>
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
      <PublishStatusBar
        lastChangedAt={
          revisions[0]?.created_at ?? published?.published_at ?? null
        }
        publishedRevisionNo={published?.revision_no ?? null}
        sectionLabel="APBDes"
      />

      <RevisionHistoryTable
        details={revisionDetails}
        publishedRevisionId={section.published_revision_id}
        revisions={revisions}
        title="Daftar laporan"
      />

      <ApbdesForm
        initialRealizations={initialRealizations}
        initialRevenueSources={initialRevenueSources}
        initialSpendingFields={initialSpendingFields}
        initialValues={initialValues}
      />

      <ComponentCard title="Pratinjau versi aktif">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {activeRevision
            ? `Menampilkan revisi ${activeRevision.revision_no} yang sedang aktif di halaman publik.`
            : "Belum ada data."}{" "}
          <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/infografis/apbdes">
            Lihat halaman APBDes publik
          </Link>
          .
        </p>
        {report ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[160px_1fr] [&>dd]:text-sm [&>dd]:text-gray-800 [&>dd]:dark:text-white/90 [&>dt]:text-sm [&>dt]:font-medium [&>dt]:text-gray-500 [&>dt]:dark:text-gray-400">
            <dt>Tahun anggaran</dt>
            <dd>{report.fiscal_year}</dd>
            <dt>Periode</dt>
            <dd>{report.period_label}</dd>
            <dt>Realisasi</dt>
            <dd>
              {activeData.realizations.length === 0
                ? "Belum tersedia"
                : activeData.realizations
                    .map(
                      (item) =>
                        `${item.label}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
            <dt>Bidang belanja</dt>
            <dd>
              {activeData.spendingFields.length === 0
                ? "Belum tersedia"
                : activeData.spendingFields
                    .map(
                      (item) =>
                        `${item.field_name}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
            <dt>Sumber pendapatan</dt>
            <dd>
              {activeData.revenueSources.length === 0
                ? "Belum tersedia"
                : activeData.revenueSources
                    .map(
                      (item) =>
                        `${item.source_name}: pagu ${formatRupiah(item.budget)}, realisasi ${formatRupiah(item.realization)}`,
                    )
                    .join("; ")}
            </dd>
          </dl>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">Belum tersedia.</p>
        )}
      </ComponentCard>
    </section>
  );
}
