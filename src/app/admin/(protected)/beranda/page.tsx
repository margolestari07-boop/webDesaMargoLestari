import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadHomeRevision,
  loadPopulationRevision,
} from "@/lib/content/revisions";
import { PublishStatusBar } from "../_components/status-bar";
import { RevisionHistoryTable } from "../_components/revision-history-table";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { HomeForm, type GalleryRow } from "./home-form";

export const metadata: Metadata = {
  title: "Beranda",
};

function formatNumber(value: number | null): string {
  return value === null ? "Belum tersedia" : value.toLocaleString("id-ID");
}

export default async function HomeAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  const section = await getSectionRow(supabase, "home");
  if (!section) {
    return (
      <section aria-labelledby="home-title" className="space-y-6">
        <PageHeader kicker="Beranda" title="Beranda" titleId="home-title" />
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
    ? await loadHomeRevision(supabase, activeRevision.id)
    : { content: null, officers: [], galleryItems: [], mediaAssets: [] };

  // Ringkasan angka Beranda mengambil laporan Kependudukan terbit,
  // bukan salinan angka di modul ini.
  const populationSection = await getSectionRow(supabase, "population");
  const populationPublished = populationSection
    ? await getPublishedRevision(supabase, populationSection)
    : null;
  const populationData = populationPublished
    ? await loadPopulationRevision(supabase, populationPublished.id)
    : null;

  const content = activeData.content;
  const initialValues: Record<string, string> = {
    hero_title: content?.hero_title ?? "",
    hero_subtitle: content?.hero_subtitle ?? "",
    help_phone: content?.help_phone ?? "",
    help_note: content?.help_note ?? "",
  };
  const initialGallery: GalleryRow[] = activeData.galleryItems.map(
    (item, index) => ({
      clientId: `gallery-${item.id}`,
      media_asset_id: item.media_asset_id,
      title: item.title ?? "",
      caption: item.caption ?? "",
      alt_override: item.alt_override ?? "",
      sort_order: String(item.sort_order ?? index),
    }),
  );

  return (
    <section aria-labelledby="home-title" className="space-y-6">
      <PageHeader
        intro={
          <>
            Teks Beranda dan kurasi galeri. Struktur organisasi dikelola di{" "}
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/admin/struktur">
              Struktur organisasi
            </Link>
            .
          </>
        }
        kicker="Beranda"
        title="Beranda"
        titleId="home-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />
      <PublishStatusBar
        lastChangedAt={
          revisions[0]?.created_at ?? published?.published_at ?? null
        }
        publishedRevisionNo={published?.revision_no ?? null}
        sectionLabel="Beranda"
      />

      <ComponentCard title="Ringkasan kependudukan (dari laporan terbit)">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Angka di bawah ini dibaca dari laporan Kependudukan yang aktif
          dan tidak dapat diubah dari halaman ini.
        </p>
        {populationData?.report ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[160px_1fr] [&>dd]:text-sm [&>dd]:text-gray-800 [&>dd]:dark:text-white/90 [&>dt]:text-sm [&>dt]:font-medium [&>dt]:text-gray-500 [&>dt]:dark:text-gray-400">
            <dt>Periode</dt>
            <dd>{populationData.report.period_label}</dd>
            <dt>Total penduduk</dt>
            <dd>{formatNumber(populationData.report.total_population)}</dd>
            <dt>Jumlah KK</dt>
            <dd>{formatNumber(populationData.report.total_households)}</dd>
            <dt>Sumber</dt>
            <dd>{populationData.report.source_name ?? "Belum diisi"}</dd>
          </dl>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Belum tersedia — belum ada laporan Kependudukan yang aktif.{" "}
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/admin/kependudukan">
              Kelola Kependudukan
            </Link>
          </p>
        )}
      </ComponentCard>

      <RevisionHistoryTable
        publishedRevisionId={section.published_revision_id}
        revisions={revisions}
      />

      <HomeForm
        initialGallery={initialGallery}
        initialValues={initialValues}
        mediaAssets={activeData.mediaAssets}
      />
    </section>
  );
}
