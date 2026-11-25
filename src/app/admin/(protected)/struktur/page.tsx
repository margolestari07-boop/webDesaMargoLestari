import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import { loadMediaAssets, loadOfficers } from "@/lib/content/data";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import { OfficersForm, type OfficerRow } from "./officers-form";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
};

export default async function OfficersAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  // Tanpa revisi: pejabat dibaca langsung dari tabel dan langsung live.
  const [officers, mediaAssets] = await Promise.all([
    loadOfficers(supabase),
    loadMediaAssets(supabase),
  ]);

  const initialOfficers: OfficerRow[] = officers.map((item, index) => ({
    clientId: `officer-${item.id}`,
    full_name: item.full_name,
    position: item.position,
    description: item.description ?? "",
    // parent_client_id diisi ulang dari parent_id di bawah.
    parent_client_id: "",
    sort_order: String(item.sort_order ?? index),
    is_active: item.is_active,
    photo_asset_id: item.photo_asset_id ?? "",
  }));
  const parentById = new Map(
    officers.map((item) => [item.id, `officer-${item.id}`]),
  );
  officers.forEach((item, index) => {
    if (item.parent_id) {
      initialOfficers[index].parent_client_id =
        parentById.get(item.parent_id) ?? "";
    }
  });

  return (
    <section aria-labelledby="officers-title" className="space-y-6">
      <PageHeader
        intro="Satu sumber pengelolaan perangkat desa. Daftar ini dipakai Beranda dan Profil Desa di situs publik; tidak ada salinan kedua yang bisa bertentangan."
        kicker="Beranda & Profil Desa"
        title="Struktur organisasi"
        titleId="officers-title"
      />
      <p className="text-sm text-gray-500">
        Juga ditautkan dari{" "}
        <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/admin/beranda">
          Beranda
        </Link>{" "}
        dan{" "}
        <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/admin/profil">
          Profil Desa
        </Link>
        .
      </p>
      <QueryNotice error={params.error} notice={params.notice} />
      <OfficersForm initialOfficers={initialOfficers} mediaAssets={mediaAssets} />
    </section>
  );
}
