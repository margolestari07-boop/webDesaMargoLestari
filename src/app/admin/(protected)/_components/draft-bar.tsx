import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  createDraftAction,
  publishRevisionAction,
  type DraftActionState,
} from "../actions";
import type { SectionKey } from "@/lib/content/sections";

export type DraftBarState = {
  draftRevisionId: string | null;
  draftRevisionNo: number | null;
  publishedRevisionNo: number | null;
  sectionKey: SectionKey;
  sectionLabel: string;
  /** Bila draf belum ada, tampilkan tombol buat draf. */
  showCreateDraft: boolean;
  /** Path admin halaman ini, dipakai aksi buat draf/terbit untuk kembali. */
  returnPath: string;
};

/**
 * Bilah status draf/terbit yang dipakai semua halaman CRUD konten.
 * Terbitkan memanggil RPC publish_content_revision (atomik) dan hanya
 * menerbitkan revisi draf yang dipilih; konten publik tidak berubah
 * saat menyimpan draf.
 */
export function DraftBar({
  draftRevisionId,
  draftRevisionNo,
  publishedRevisionNo,
  sectionKey,
  sectionLabel,
  showCreateDraft,
  returnPath,
}: DraftBarState) {
  return (
    <div className="admin-draft-bar">
      <div className="admin-draft-status">
        <span>
          {sectionLabel}:{" "}
          {draftRevisionId ? (
            <Badge tone="warning">
              Draf revisi {draftRevisionNo ?? "-"} belum terbit
            </Badge>
          ) : (
            <Badge tone="neutral">Belum ada draf</Badge>
          )}
        </span>
        <span>
          {publishedRevisionNo !== null ? (
            <Badge tone="success">
              Terbit: revisi {publishedRevisionNo}
            </Badge>
          ) : (
            <Badge tone="neutral">Belum diterbitkan</Badge>
          )}
        </span>
      </div>
      <div className="admin-draft-actions">
        {showCreateDraft ? (
          <form action={createDraftAction}>
            <input name="section_key" type="hidden" value={sectionKey} />
            <input name="return_path" type="hidden" value={returnPath} />
            <Button type="submit" variant="secondary">
              Buat draf baru
            </Button>
          </form>
        ) : null}
        {draftRevisionId ? (
          <form action={publishRevisionAction}>
            <input name="revision_id" type="hidden" value={draftRevisionId} />
            <input name="section_key" type="hidden" value={sectionKey} />
            <input name="return_path" type="hidden" value={returnPath} />
            <Button type="submit">Terbitkan draf ini</Button>
          </form>
        ) : null}
      </div>
      <p className="admin-field-help">
        Menyimpan draf tidak mengubah halaman publik. Penerbitan mengganti
        versi terbit aktif dalam satu transaksi.
      </p>
    </div>
  );
}

export type { DraftActionState };
