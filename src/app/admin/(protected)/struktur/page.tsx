import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  getPublishedRevision,
  getSectionRow,
  listRevisionsForSection,
  loadHomeRevision,
} from "@/lib/content/revisions";
import { PublishStatusBar } from "../_components/status-bar";
import { RevisionHistoryTable } from "../_components/revision-history-table";
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

  const section = await getSectionRow(supabase, "home");
  if (!section) {
    return (
      <section aria-labelledby="officers-title" className="space-y-6">
        <PageHeader
          kicker="Struktur organisasi"
          title="Struktur organisasi"
          titleId="officers-title"
        />
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
    : { officers: [] };

  const initialOfficers: OfficerRow[] = activeData.officers.map(
    (item, index) => ({
      clientId: `officer-${item.id}`,
      full_name: item.full_name,
      position: item.position,
      description: item.description ?? "",
      // parent_client_id diisi ulang dari parent_id di bawah.
      parent_client_id: "",
      sort_order: String(item.sort_order ?? index),
      is_active: item.is_active,
      photo_asset_id: item.photo_asset_id ?? "",
    }),
  );
  const parentById = new Map(
    activeData.officers.map((item) => [item.id, `officer-${item.id}`]),
  );
  activeData.officers.forEach((item, index) => {
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
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Juga ditautkan dari{" "}
        <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/admin/beranda">
          Beranda
        </Link>{" "}
        dan{" "}
        <Link className="text-sm font-medium text-brand-500 underline-offset-4 hover:underline dark:text-brand-400" href="/admin/profil">
          Profil Desa
        </Link>
        .
      </p>
      <QueryNotice error={params.error} notice={params.notice} />
      <PublishStatusBar
        lastChangedAt={
          revisions[0]?.created_at ?? published?.published_at ?? null
        }
        publishedRevisionNo={published?.revision_no ?? null}
        sectionLabel="Struktur organisasi"
      />
      <RevisionHistoryTable
        publishedRevisionId={section.published_revision_id}
        revisions={revisions}
      />
      <OfficersForm initialOfficers={initialOfficers} />
    </section>
  );
}
