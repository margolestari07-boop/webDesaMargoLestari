import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getDraftRevision,
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadApbdesRevision,
} from "@/lib/content/drafts";
import { DraftBar } from "../_components/draft-bar";
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
      <section aria-labelledby="apbdes-title" className="admin-settings">
        <p className="section-kicker">APBDes</p>
        <h1 className="admin-dashboard-title" id="apbdes-title">
          APBDes
        </h1>
        <p className="admin-settings-error" role="alert">
          Tabel content_sections belum tersedia di database ini. Migration
          content_revisions belum diterapkan.
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
    ? await loadApbdesRevision(supabase, activeRevision.id)
    : {
        report: null,
        realizations: [],
        spendingFields: [],
        revenueSources: [],
      };

  const revisionSummaries = await Promise.all(
    revisions.map(async (revision) => {
      const data = await loadApbdesRevision(supabase, revision.id);
      return { revision, report: data.report };
    }),
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
    <section aria-labelledby="apbdes-title" className="admin-settings">
      <p className="section-kicker">APBDes</p>
      <h1 className="admin-dashboard-title" id="apbdes-title">
        APBDes
      </h1>
      <p className="admin-settings-intro">
        Laporan APBDes per tahun anggaran dan periode. Pagu dan realisasi
        diisi bila tersedia dari dokumen sumber; kosong berarti belum
        tersedia, bukan nol.
      </p>
      <QueryNotice error={params.error} notice={params.notice} />
      <DraftBar
        draftRevisionId={draft?.id ?? null}
        draftRevisionNo={draft?.revision_no ?? null}
        publishedRevisionNo={published?.revision_no ?? null}
        returnPath="/admin/apbdes"
        sectionKey="apbdes"
        sectionLabel="APBDes"
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
                {item
                  ? `Tahun ${item.fiscal_year} — ${item.period_label}`
                  : "Laporan tanpa periode"}{" "}
                — revisi {revision.revision_no} ({revision.status})
              </strong>
              <p className="admin-revision-meta">
                Dokumen sumber: {item?.source_document ?? "Belum diisi"} ·
                Dibuat:{" "}
                {new Date(revision.created_at).toLocaleDateString("id-ID")}
                {revision.published_at
                  ? ` · Terbit: ${new Date(revision.published_at).toLocaleDateString("id-ID")}`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      )}

      <ApbdesForm
        hasDraft={Boolean(draft)}
        initialRealizations={initialRealizations}
        initialRevenueSources={initialRevenueSources}
        initialSpendingFields={initialSpendingFields}
        initialValues={initialValues}
      />

      <div className="admin-preview">
        <h2>Pratinjau draf / versi terbit aktif</h2>
        <p className="admin-section-note">
          {activeRevision
            ? `Menampilkan revisi ${activeRevision.revision_no} (${activeRevision.status}).`
            : "Belum ada draf maupun versi terbit."}{" "}
          Halaman publik hanya menampilkan revisi yang sudah diterbitkan;{" "}
          <Link className="admin-card-link" href="/infografis/apbdes">
            lihat halaman APBDes publik
          </Link>
          .
        </p>
        {report ? (
          <dl>
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
          <p className="admin-section-note">Belum tersedia.</p>
        )}
      </div>
    </section>
  );
}
