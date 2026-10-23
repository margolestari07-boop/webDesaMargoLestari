# Testing — Fitur 1: Profil Desa

Tanggal: 2026-10-02  
Rute: `/profil`  
Stack: Next.js 16.3.8, React 19.2.8, TypeScript, Tailwind CSS 4

## Skenario dan hasil

| ID    | Skenario                      | Langkah / bukti                                                                  | Hasil aktual                                                                                                                                                           | Status                |
| ----- | ----------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| P1-01 | Format kode                   | `npm run format`                                                                 | Berhasil; berkas TypeScript/TSX/CSS yang dikelola formatter terformat.                                                                                                 | Lulus                 |
| P1-02 | Lint                          | `npm run lint`                                                                   | Berhasil tanpa error.                                                                                                                                                  | Lulus                 |
| P1-03 | Pemeriksaan tipe              | `npm run typecheck`                                                              | Berhasil tanpa error TypeScript.                                                                                                                                       | Lulus                 |
| P1-04 | Build produksi                | `npm run build`                                                                  | Build berhasil; `/` dan `/profil` diprerender, termasuk `/_not-found`.                                                                                                 | Lulus                 |
| P1-05 | HTTP smoke production         | `npm run test:smoke`                                                             | Kedua rute mengembalikan HTTP 200. Smoke test `/profil` memeriksa identitas wilayah, status verifikasi kecamatan, konflik Jati Agung, serta empty state visi dan misi. | Lulus                 |
| P1-06 | Foto, visi, misi kosong       | Tinjau `src/app/profil/page.tsx` dengan data dari `src/data/village-profile.ts`. | Foto, visi, dan misi tidak direkayasa; UI menampilkan penanda/empty state yang menjelaskan data menunggu konfirmasi.                                                   | Lulus — review source |
| P1-07 | E2E browser                   | `npm run test:e2e`                                                               | Belum dapat menjalankan pengujian terhadap aplikasi karena executable Chromium Playwright belum tersedia.                                                              | Terhalang lingkungan  |
| P1-08 | Visual/responsif dan keyboard | Periksa `/profil` pada 360, 768, dan 1280 px serta navigasi keyboard.            | Belum dilakukan; unduhan Chromium dari Chrome for Testing timeout berulang kali.                                                                                       | Belum diuji           |

## Batas verifikasi data

- Kabupaten Lampung Selatan dan Provinsi Lampung ditampilkan berdasarkan sumber proyek.
- Kecamatan Tanjung Bintang ditampilkan sebagai nilai sementara dan diberi label perlu diverifikasi; dokumen sumber juga menyebut Jati Agung.
- Deskripsi profil, foto, visi, dan misi tetap kosong sampai ada bahan yang dikonfirmasi pihak desa.
- Tidak ada fakta profil tambahan yang dikarang dan tidak ada integrasi Supabase.

## Catatan lingkungan

E2E dan pemeriksaan visual/keyboard bukan assertion yang gagal: browser belum tersedia. `npx playwright install chromium` gagal mengunduh Chrome for Testing karena timeout, juga setelah timeout koneksi dinaikkan. Jalankan kembali pemeriksaan browser setelah Chromium tersedia. Catatan diagnostik editor proyek tetap dirujuk di `docs/testing/00-fondasi.md`.
