import ComponentCard from "@/components/tailadmin/common/component-card";
import { Badge } from "@/components/tailadmin/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/tailadmin/ui/table";
import type { RevisionRow } from "@/lib/content/revisions";

export type RevisionHistoryTableProps = {
  revisions: RevisionRow[];
  /** ID revisi yang sedang aktif di halaman publik. */
  publishedRevisionId: string | null;
  /** Judul tabel (default "Riwayat perubahan"). */
  title?: string;
  /** Keterangan tambahan per revisi (mis. periode laporan), keyed by id revisi. */
  details?: Record<string, string>;
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Tabel riwayat perubahan dengan tabel TailAdmin asli
 * (src/components/main/tables/basic-tables/table-one) di dalam
 * ComponentCard: setiap penyimpanan membuat satu revisi baru yang langsung
 * aktif; revisi lama menjadi arsip. Dipakai semua halaman CRUD konten
 * sebagai log perubahan, bukan sebagai draf.
 */
export function RevisionHistoryTable({
  revisions,
  publishedRevisionId,
  title = "Riwayat perubahan",
  details,
}: RevisionHistoryTableProps) {
  const hasDetails = Boolean(details);
  return (
    <ComponentCard title={title}>
      {revisions.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Belum ada perubahan. Simpan dari form di bawah untuk membuat versi
          pertama.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                  >
                    Revisi
                  </TableCell>
                  {hasDetails ? (
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Keterangan
                    </TableCell>
                  ) : null}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                  >
                    Dibuat
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                  >
                    Terbit
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {revisions.map((revision) => {
                  const isActive = revision.id === publishedRevisionId;
                  return (
                    <TableRow key={revision.id}>
                      <TableCell className="px-5 py-4 text-start text-sm font-medium text-gray-800 sm:px-6 dark:text-white/90">
                        Revisi {revision.revision_no}
                      </TableCell>
                      {hasDetails ? (
                        <TableCell className="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
                          {details?.[revision.id] ?? "—"}
                        </TableCell>
                      ) : null}
                      <TableCell className="px-5 py-4 text-start sm:px-6">
                        {isActive ? (
                          <Badge color="success" variant="light">
                            Aktif
                          </Badge>
                        ) : revision.status === "archived" ? (
                          <Badge color="gray" variant="light">
                            Arsip
                          </Badge>
                        ) : (
                          <Badge color="warning" variant="light">
                            Berjalan
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
                        {formatDate(revision.created_at)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
                        {formatDate(revision.published_at)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
