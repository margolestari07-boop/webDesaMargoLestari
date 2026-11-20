import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadProfileRevision,
} from "@/lib/content/revisions";
import { PublishStatusBar } from "../_components/status-bar";
import { RevisionHistoryTable } from "../_components/revision-history-table";
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

  const section = await getSectionRow(supabase, "profile");
  if (!section) {
    return (
      <section aria-labelledby="profile-title" className="space-y-6">
        <PageHeader kicker="Profil Desa" title="Profil Desa" titleId="profile-title" />
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
    ? await loadProfileRevision(supabase, activeRevision.id)
    : { content: null, boundaries: [], documents: [] };

  const content = activeData.content;
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
      const found = activeData.boundaries.find(
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
  const initialDocuments: DocumentRow[] = activeData.documents.map(
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
            <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/admin/struktur">
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
      <PublishStatusBar
        lastChangedAt={
          revisions[0]?.created_at ?? published?.published_at ?? null
        }
        publishedRevisionNo={published?.revision_no ?? null}
        sectionLabel="Profil Desa"
      />
      <RevisionHistoryTable
        publishedRevisionId={section.published_revision_id}
        revisions={revisions}
      />
      <ProfileForm
        initialBoundaries={initialBoundaries}
        initialDocuments={initialDocuments}
        initialValues={initialValues}
      />
    </section>
  );
}
