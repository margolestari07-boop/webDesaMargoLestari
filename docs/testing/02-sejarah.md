# Testing — Fitur 2: Sejarah Desa

Tanggal: 2026-10-02  
Rute: `/sejarah`  
Stack: Next.js 16.3.8, React 19.2.8, TypeScript, Tailwind CSS 4

## Skenario dan hasil

| ID    | Skenario                     | Langkah / bukti                                            | Hasil aktual                                                                                                                                                      | Status                            |
| ----- | ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| S2-01 | Format source                | `npm run format`                                           | Berhasil; data, halaman, CSS, smoke test, dan E2E spec terformat.                                                                                                 | Lulus                             |
| S2-02 | Lint                         | `npm run lint`                                             | Berhasil tanpa error.                                                                                                                                             | Lulus                             |
| S2-03 | Pemeriksaan tipe             | `npm run typecheck`                                        | Berhasil tanpa error TypeScript.                                                                                                                                  | Lulus                             |
| S2-04 | Build produksi               | `npm run build`                                            | Berhasil; `/sejarah` terprerender bersama `/` dan `/profil`.                                                                                                      | Lulus                             |
| S2-05 | HTTP smoke production        | `npm run test:smoke`                                       | Ketiga rute publik mengembalikan HTTP 200; konten sejarah, periode sebelum 1986, asal Gedung Meneng, tahun 1986, Desa Persiapan, dan Tanjung Bintang diperiksa.   | Lulus                             |
| S2-06 | Urutan dan isi dua peristiwa | Tinjau `src/data/history.ts` dan skenario Playwright baru. | Dua item diurutkan dari asal-usul sebelum pembentukan Desa Persiapan tahun 1986. Label periode tidak mengklaim tanggal yang tidak ada di sumber.                  | Lulus — review source             |
| S2-07 | E2E browser                  | `npm run test:e2e`                                         | Empat test tidak dapat dimulai: browser gagal diluncurkan karena executable `chrome-headless-shell` tidak tersedia. Belum ada assertion aplikasi yang dieksekusi. | Terhalang lingkungan              |
| S2-08 | Visual/responsif 360 px      | Review source CSS dan halaman.                             | Grid memiliki breakpoint mobile, namun visual aktual belum dapat diperiksa karena Chromium tidak tersedia.                                                        | Review source; visual belum diuji |

## Pemeriksaan terhadap sumber

Konten lokal `src/data/history.ts` hanya memuat dua informasi pada bagian “Sejarah Singkat” di `Analisis_Proposal_Website_Desa_Margo_Lestari.md`:

1. Desa Margo Lestari merupakan hasil pemekaran dari Desa/Kelurahan Gedung Meneng, Labuhan Ratu, Kecamatan Kedaton. Tahun spesifik tidak dicantumkan; label “Sebelum 1986” hanya menyatakan posisinya sebelum peristiwa pembentukan yang bertanggal.
2. Pada 1986 dibentuk Desa Persiapan Margo Lestari di Kecamatan Tanjung Bintang karena Gedung Meneng masuk wilayah Kodya Bandar Lampung.

Tidak ada tahun lain, nama tokoh, tanggal lengkap, atau kisah tambahan yang dibuat. Data merupakan modul TypeScript lokal sementara; tabel, seed database, dan CRUD tidak dibuat karena integrasi Supabase ditunda.

## Catatan lingkungan

E2E berhenti saat peluncuran browser karena executable Playwright tidak terpasang di `C:\Users\afnan\AppData\Local\ms-playwright\...`. Ini blocker browser, bukan kegagalan assertion. Pemeriksaan E2E dan visual perlu diulang saat Chromium tersedia.
