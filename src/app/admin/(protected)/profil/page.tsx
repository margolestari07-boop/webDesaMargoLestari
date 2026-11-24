import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import { loadProfileData } from "@/lib/content/data";
import { PageHeader } from "../_components/page-header";
import { QueryNotice, type SearchParams } from "../_components/notice";
import {
  ProfileForm,
  type BoundaryRow,
  type DocumentRow,
} from "./profile-form";

export const metadata: Metadata = {
  title: "Profil Desa",
};

const DIRECTIONS: BoundaryRow["direction"][] = [
  "north",
  "south",
  "east",
  "west",
];

export default async function ProfileAdminPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const { supabase } = await requireAdmin();

  // Tanpa revisi: data dibaca langsung dari tabel dan langsung live.
  const profileData = await loadProfileData(supabase);

  const content = profileData.content;
  const initialValues: Record<string, string> = {
    history_text: content?.history_text ?? "",
    area_value: content?.area_value?.toString() ?? "",
    area_unit: content?.area_unit ?? "",
    population_count: content?.population_count?.toString() ?? "",
    distance_to_capital_value:
      content?.distance_to_capital_value?.toString() ?? "",
    distance_to_capital_unit: content?.distance_to_capital_unit ?? "",
    source_note: content?.source_note ?? "",
  };
  const initialBoundaries: BoundaryRow[] = DIRECTIONS.map(
    (direction, index) => {
      const found = profileData.boundaries.find(
        (item) => item.direction === direction,
      );
      return {
        direction,
        label: found?.label ?? "",
        description: found?.description ?? "",
        source_note: found?.source_note ?? "",
        sort_order: String(found?.sort_order ?? index),
      };
    },
  );
  const initialDocuments: DocumentRow[] = profileData.documents.map(
    (item, index) => ({
      clientId: `doc-${item.id}`,
      title: item.title,
      doc_type: item.doc_type,
      description: item.description ?? "",
      storage_path: item.storage_path,
      mime_type: item.mime_type ?? "",
      size_bytes: item.size_bytes?.toString() ?? "",
      alt_text: item.alt_text ?? "",
      sort_order: String(item.sort_order ?? index),
      is_public: item.is_public,
    }),
  );

  return (
    <section aria-labelledby="profile-title" className="space-y-6">
      <PageHeader
        intro={
          <>
            Sejarah, batas dan luas wilayah, serta dokumen desa. Bagan struktur
            organisasi dikelola terpisah di{" "}
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline" href="/admin/struktur">
              Struktur organisasi
            </Link>{" "}
            dan dipakai bersama Beranda.
          </>
        }
        kicker="Profil Desa"
        title="Profil Desa"
        titleId="profile-title"
      />
      <QueryNotice error={params.error} notice={params.notice} />
      <ProfileForm
        initialBoundaries={initialBoundaries}
        initialDocuments={initialDocuments}
        initialValues={initialValues}
      />
    </section>
  );
}
