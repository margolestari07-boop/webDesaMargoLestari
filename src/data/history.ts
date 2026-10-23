export interface HistoryEntry {
  period: string;
  year?: string;
  title: string;
  description: string;
}

export const historyEntries: readonly HistoryEntry[] = [
  {
    period: "Sebelum 1986",
    title: "Pemekaran dari Gedung Meneng",
    description:
      "Desa Margo Lestari merupakan hasil pemekaran dari Desa/Kelurahan Gedung Meneng, Labuhan Ratu, Kecamatan Kedaton.",
  },
  {
    period: "1986",
    year: "1986",
    title: "Pembentukan Desa Persiapan",
    description:
      "Karena Gedung Meneng masuk wilayah Kodya Bandar Lampung, pada 1986 dibentuk Desa Persiapan Margo Lestari di Kecamatan Tanjung Bintang.",
  },
];
