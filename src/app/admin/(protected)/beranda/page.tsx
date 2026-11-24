import type { Metadata } from "next";
import Link from "next/link";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { requireAdmin } from "@/lib/supabase/authorization";
import { loadHomeData, loadPopulationData } from "@/lib/content/data";
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

  // Tanpa revisi: data dibaca langsung dari tabel dan langsung live.
  const [homeData, populationData] = await Promise.all([
    loadHomeData(supabase),
    loadPopulationData(supabase),
  ]);

  // Ringkasan angka Beranda mengambil laporan Kependudukan, bukan
  // salinan angka di modul ini.
  const content = homeData.content;
  const initialValues: Record<string, string> = {
    hero_title: content?.hero_title ?? "",
    hero_subtitle: content?.hero_subtitle ?? "",
    help_phone: content?.help_phone ?? "",
    help_note: content?.help_note ?? "",
  };
  const initialGallery: GalleryRow[] = homeData.galleryItems.map(
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
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/admin/struktur">
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

      <ComponentCard title="Ringkasan kependudukan (dari laporan)">
        <p className="text-sm text-gray-500">
          Angka di bawah ini dibaca dari laporan Kependudukan dan tidak dapat
          diubah dari halaman ini.
        </p>
        {populationData.report ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[160px_1fr] [&>dd]:text-sm [&>dd]:text-gray-800 [&>dd]: [&>dt]:text-sm [&>dt]:font-medium [&>dt]:text-gray-500 [&>dt]:">
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
          <p className="text-sm text-gray-500">
            Belum tersedia — belum ada laporan Kependudukan.{" "}
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/admin/kependudukan">
              Kelola Kependudukan
            </Link>
          </p>
        )}
      </ComponentCard>

      <HomeForm
        initialGallery={initialGallery}
        initialValues={initialValues}
        mediaAssets={homeData.mediaAssets}
      />
    </section>
  );
}
