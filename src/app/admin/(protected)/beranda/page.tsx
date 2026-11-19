import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getDraftRevision,
  getPublishedRevision,
  getSectionRow,
  loadHomeRevision,
  loadPopulationRevision,
} from "@/lib/content/drafts";
import { DraftBar } from "../_components/draft-bar";
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
      <section aria-labelledby="home-title" className="admin-settings">
        <PageHeader kicker="Beranda" title="Beranda" titleId="home-title" />
        <p className="admin-settings-error" role="alert">
          Tabel content_sections belum tersedia di database ini. Migration
          content_revisions belum diterapkan.
        </p>
      </section>
    );
  }

  const [draft, published] = await Promise.all([
    getDraftRevision(supabase, section.id),
    getPublishedRevision(supabase, section),
  ]);
  const activeRevision = draft ?? published;
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
    <section aria-labelledby="home-title" className="admin-settings">
      <PageHeader
        intro={
          <>
            Teks Beranda dan kurasi galeri. Struktur organisasi dikelola di{" "}
            <Link className="admin-card-link" href="/admin/struktur">
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
      <DraftBar
        draftRevisionId={draft?.id ?? null}
        draftRevisionNo={draft?.revision_no ?? null}
        publishedRevisionNo={published?.revision_no ?? null}
        returnPath="/admin/beranda"
        sectionKey="home"
        sectionLabel="Beranda"
        showCreateDraft={!draft}
      />

      <div className="admin-preview">
        <h2>Ringkasan kependudukan (dari laporan terbit)</h2>
        <p className="admin-section-note">
          Angka di bawah ini dibaca dari laporan Kependudukan yang sudah
          terbit dan tidak dapat diubah dari halaman ini.
        </p>
        {populationData?.report ? (
          <dl>
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
          <p className="admin-section-note">
            Belum tersedia — belum ada laporan Kependudukan yang diterbitkan.{" "}
            <Link className="admin-card-link" href="/admin/kependudukan">
              Kelola Kependudukan
            </Link>
          </p>
        )}
      </div>

      <HomeForm
        hasDraft={Boolean(draft)}
        initialGallery={initialGallery}
        initialValues={initialValues}
        mediaAssets={activeData.mediaAssets}
      />
    </section>
  );
}
