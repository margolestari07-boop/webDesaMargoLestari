import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";

const NOTICES: Record<string, string> = {
  saved: "Perubahan tersimpan dan langsung tampil di halaman publik.",
};

const ERRORS: Record<string, string> = {
  "save-failed":
    "Perubahan belum tersimpan. Periksa kembali isian yang ditandai, lalu coba lagi.",
  "bad-section": "Bagian konten tidak dikenali.",
  "bad-request": "Permintaan tidak valid.",
};

/** Pesan sukses/error dari query ?notice= / ?error= setelah aksi simpan. */
export function QueryNotice({
  notice,
  error,
}: {
  notice?: string;
  error?: string;
}) {
  if (notice && NOTICES[notice]) {
    return (
      <Alert role="status" variant="success">
        <AlertDescription>{NOTICES[notice]}</AlertDescription>
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {ERRORS[error] ?? "Terjadi kesalahan. Silakan coba lagi."}
        </AlertDescription>
      </Alert>
    );
  }
  return null;
}

export type SearchParams = Promise<{
  notice?: string;
  error?: string;
}>;
