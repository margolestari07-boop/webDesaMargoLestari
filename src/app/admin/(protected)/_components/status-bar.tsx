import { Badge } from "@/components/tailadmin/ui/badge";

export type PublishStatusState = {
  sectionLabel: string;
  /** Nomor revisi yang sedang aktif di halaman publik (null bila belum ada). */
  publishedRevisionNo: number | null;
  /** ISO timestamp perubahan terakhir (null bila belum pernah ada). */
  lastChangedAt: string | null;
};

function formatChangedAt(value: string | null): string {
  if (!value) return "Belum pernah diubah";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum pernah diubah";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Bilah status versi aktif yang dipakai semua halaman CRUD konten, dengan
 * Badge TailAdmin asli. Admin kini edit langsung: tidak ada lagi draf.
 * Setiap penyimpanan langsung menerbitkan revisi baru, jadi yang
 * ditampilkan di sini hanya versi aktif dan kapan terakhir diubah.
 */
export function PublishStatusBar({
  sectionLabel,
  publishedRevisionNo,
  lastChangedAt,
}: PublishStatusState) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-theme-xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-sm text-gray-600">
          {sectionLabel}:{" "}
          {publishedRevisionNo !== null ? (
            <Badge color="success" variant="light">
              Aktif: revisi {publishedRevisionNo}
            </Badge>
          ) : (
            <Badge color="gray" variant="light">
              Belum ada data
            </Badge>
          )}
        </span>
        <span className="text-sm text-gray-500">
          Terakhir diubah: {formatChangedAt(lastChangedAt)}
        </span>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Perubahan yang disimpan langsung tampil di halaman publik.
      </p>
    </div>
  );
}
