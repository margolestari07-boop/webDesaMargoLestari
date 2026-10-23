# Testing — Fondasi UI Publik

Tanggal: 2026-10-02  
Stack: Next.js 16.3.8, React 19.2.8, TypeScript, Tailwind CSS 4

## Skenario black-box dan pemeriksaan kualitas

| ID    | Skenario                            | Langkah                                                    | Hasil diharapkan                                                                                                     | Hasil aktual                                                                                                           | Status               |
| ----- | ----------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- |
| F0-01 | Format source                       | Jalankan `npm run format`                                  | Semua file target terformat                                                                                          | Berhasil setelah SVG dikeluarkan dari input Prettier karena parser tidak terdeteksi                                    | Lulus                |
| F0-02 | Lint                                | Jalankan `npm run lint`                                    | Tidak ada error lint                                                                                                 | Lulus tanpa error                                                                                                      | Lulus                |
| F0-03 | TypeScript                          | Jalankan `npm run typecheck`                               | Tidak ada error tipe                                                                                                 | Lulus setelah tipe kurva easing di `Stagger` dibuat sebagai tuple                                                      | Lulus                |
| F0-04 | Build produksi                      | Jalankan `npm run build`                                   | Next menghasilkan output produksi                                                                                    | Build Next.js 16.3.8 berhasil; `/` dan `/_not-found` ter-prerender                                                     | Lulus                |
| F0-05 | Respons HTTP produksi               | Jalankan `npm run test:smoke`                              | `/` mengembalikan 200 dan markup memuat bahasa Indonesia, skip link, identitas, status foto, serta catatan kecamatan | Smoke check melalui server produksi berhasil                                                                           | Lulus                |
| F0-06 | Homepage dan menu mobile di browser | Jalankan `npm run test:e2e`                                | Heading/placeholder tampil; menu dapat dibuka dan berlabel                                                           | Belum mencapai aplikasi: executable Chromium Playwright tidak tersedia                                                 | Terhalang lingkungan |
| F0-07 | Pasang browser untuk E2E            | Jalankan `npx playwright install chromium`                 | Chromium tersedia untuk test runner                                                                                  | Unduhan Chrome for Testing dari `storage.googleapis.com` timeout, termasuk setelah timeout dinaikkan menjadi 120 detik | Terhalang jaringan   |
| F0-08 | Pemeriksaan visual 360/768/1280 px  | Buka UI di browser dan periksa overflow, fokus, dan layout | Layout responsif dan fokus terlihat                                                                                  | Belum dapat diperiksa secara visual karena browser lokal tidak tersedia                                                | Belum diuji          |

## Catatan review

- Node.js `v24.12.0` dan npm `11.6.2` terdeteksi. Next.js yang terpasang `16.3.8`.
- Root berisi dokumen dan folder skill; scaffold dibuat di folder sementara dengan `--skip-install`, lalu file baru disalin tanpa menimpa file existing.
- Paket npm Next.js tidak menyertakan `node_modules/next/dist/docs/` yang disebut `AGENTS.md`; panduan App Router/layout, CSS, dan font versi 16.3.x diperiksa dari dokumentasi resmi Next.js sebagai pengganti.
- Dependency yang dipasang tidak mencakup Supabase. `npm audit` melaporkan 0 vulnerability.
- UI visual/keyboard dan rute menu akan diperiksa lagi saat browser tersedia dan rute fitur dibangun.
- Zed pull diagnostics menampilkan warning `@theme` (directive Tailwind v4 yang tidak dikenali parser CSS umum) serta sejumlah parse error TSX yang tidak muncul pada `npm run lint`, `npm run typecheck`, atau `npm run build`. Perlu dicek ulang bila diagnostik editor tetap muncul setelah language server memuat ulang project.
