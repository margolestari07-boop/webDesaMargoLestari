const NOTICES: Record<string, string> = {
  published: "Draf berhasil diterbitkan ke halaman publik.",
  "draft-created": "Draf baru dibuat. Silakan lengkapi lalu terbitkan.",
};

const ERRORS: Record<string, string> = {
  "publish-failed":
    "Draf belum berhasil diterbitkan. Periksa kembali isian draf, lalu coba lagi.",
  "draft-failed":
    "Draf baru belum dapat dibuat. Periksa koneksi database dan migration, lalu coba lagi.",
  "bad-section": "Bagian konten tidak dikenali.",
  "bad-request": "Permintaan tidak valid.",
  "save-failed":
    "Draf belum tersimpan. Periksa kembali isian yang ditandai, lalu coba lagi.",
};

/** Pesan sukses/error dari query ?notice= / ?error= setelah aksi draf. */
export function QueryNotice({
  notice,
  error,
}: {
  notice?: string;
  error?: string;
}) {
  if (notice && NOTICES[notice]) {
    return (
      <p className="admin-settings-success" role="status">
        {NOTICES[notice]}
      </p>
    );
  }
  if (error) {
    return (
      <p className="admin-settings-error" role="alert">
        {ERRORS[error] ?? "Terjadi kesalahan. Silakan coba lagi."}
      </p>
    );
  }
  return null;
}

export type SearchParams = Promise<{
  notice?: string;
  error?: string;
}>;
