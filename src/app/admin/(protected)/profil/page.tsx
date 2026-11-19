import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getDraftRevision,
  getPublishedRevision,
  getSectionRow,
  loadProfileRevision,
} from "@/lib/content/drafts";
import { DraftBar } from "../_components/draft-bar";
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
      <section aria-labelledby="profile-title" className="admin-settings">
        <p className="section-kicker">Profil Desa</p>
        <h1 className="admin-dashboard-title" id="profile-title">
          Profil Desa
        </h1>
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
    <section aria-labelledby="profile-title" className="admin-settings">
      <p className="section-kicker">Profil Desa</p>
      <h1 className="admin-dashboard-title" id="profile-title">
        Profil Desa
      </h1>
      <p className="admin-settings-intro">
        Sejarah, batas dan luas wilayah, serta dokumen desa. Bagan struktur
        organisasi dikelola terpisah di{" "}
        <Link className="admin-card-link" href="/admin/struktur">
          Struktur organisasi
        </Link>{" "}
        dan dipakai bersama Beranda.
      </p>
      <QueryNotice error={params.error} notice={params.notice} />
      <DraftBar
        draftRevisionId={draft?.id ?? null}
        draftRevisionNo={draft?.revision_no ?? null}
        publishedRevisionNo={published?.revision_no ?? null}
        returnPath="/admin/profil"
        sectionKey="profile"
        sectionLabel="Profil Desa"
        showCreateDraft={!draft}
      />
      <ProfileForm
        hasDraft={Boolean(draft)}
        initialBoundaries={initialBoundaries}
        initialDocuments={initialDocuments}
        initialValues={initialValues}
      />
    </section>
  );
}
