# Checklist Implementasi

Dokumen ini mencatat langkah yang benar-benar dikerjakan. Kotak hanya dicentang setelah hasilnya dibuat dan ditinjau. Integrasi Supabase tetap ditunda sesuai permintaan.

## Aturan kerja

- [x] Review sumber dan batas scope sebelum implementasi.
- [x] Tidak mengarang fakta, statistik, atau angka keuangan desa.
- [x] Catat review/evaluasi untuk langkah yang selesai.
- [x] Lanjutkan implementasi setelah konfirmasi pengguna.
- [x] Supabase, database, autentikasi/admin, storage, dan operasi tulis tetap ditunda.

## Fase 0 — Pemahaman awal

- [x] Baca `PROMPT_Build_Website_Desa_Margo_Lestari.md`.
- [x] Baca `Analisis_Proposal_Website_Desa_Margo_Lestari.md`.
- [x] Catat tujuan website dan 11 kelompok fitur.
- [x] Catat konflik kecamatan Tanjung Bintang/Jati Agung.
- [x] Catat data yang belum tersedia: demografi, potensi terperinci, layanan, koordinat, rincian keuangan, serta media digital eksisting.
- [x] Tandai kontak di proposal sebagai perlu verifikasi/izin sebelum publikasi.
- [x] Buat `docs/PROGRESS.md`.
- [x] Review ringkasan terhadap dua dokumen sumber.
- [x] Evaluasi: Fase 0 lulus; isu terbuka dicatat.

**Hasil review:** fakta dan kekosongan data dicatat terpisah; kecamatan belum dianggap final.

## Fondasi Next.js dan UI publik — implementasi selesai, review browser parsial

- [x] Periksa versi Node.js/npm (`v24.12.0`/`11.6.2`) dan scaffold Next.js 16.3.8 di root tanpa menimpa dokumen sumber/skill.
- [x] Inisialisasi Git karena repository belum tersedia.
- [ ] Commit fondasi — menunggu review browser/visual yang saat ini terhalang unduhan Chromium.
- [x] Pasang dependency non-Supabase: Framer Motion, Zod, clsx, lucide-react, Playwright, dan Prettier.
- [x] Buat token desain, font Newsreader/DM Sans via `next/font`, komponen UI dasar, dan wrapper animasi reduced-motion.
- [x] Buat layout publik, navigasi responsif, skip link, dan footer.
- [x] Lint, typecheck, build, dan HTTP smoke check lulus.
- [ ] E2E Playwright dan pemeriksaan visual 360/768/1280 px — tertahan karena Chromium tidak tersedia dan unduhan browser timeout; lihat `docs/testing/00-fondasi.md`.
- [x] Tunda Supabase, autentikasi admin, storage, dan operasi tulis.

## Halaman publik

### Fitur 1 — Profil desa (implementasi selesai; validasi browser parsial)

- [x] Buat rute `/profil` dengan breadcrumb dan identitas wilayah.
- [x] Tandai Tanjung Bintang sebagai perlu diverifikasi dan ungkap konflik dokumen yang menyebut Jati Agung.
- [x] Sediakan empty state untuk foto, visi, dan misi yang belum tersedia; tidak mengarang konten.
- [x] Simpan konten profil dalam modul lokal bertipe; tanpa integrasi Supabase.
- [x] Review source dan buat catatan evaluasi fitur.
- [x] Jalankan format, lint, typecheck, build produksi, dan HTTP smoke test.
- [ ] E2E browser dan pemeriksaan visual/keyboard — terhalang Chromium Playwright tidak tersedia; lihat `docs/testing/01-profil.md`.
- [ ] Verifikasi kecamatan serta kumpulkan narasi, visi, misi, dan foto resmi dari pihak desa.
- [ ] Skema database dan CRUD admin — ditunda bersama integrasi Supabase.

Dokumen: `docs/testing/01-profil.md` dan `docs/evaluasi/01-profil.md`.

### Fitur 2 — Sejarah desa (UI selesai; validasi browser parsial)

- [x] Buat rute `/sejarah` dengan metadata, breadcrumb, dan linimasa vertikal.
- [x] Tampilkan hanya dua peristiwa yang didukung dokumen; periode asal-usul diberi label “Sebelum 1986” tanpa membuat tahun spesifik.
- [x] Gunakan animasi `Stagger` yang menghormati reduced motion dan gaya editorial yang konsisten.
- [x] Simpan dua entri pada modul data TypeScript lokal; bukan seed database.
- [x] Tambahkan pemeriksaan konten/HTTP smoke dan skenario E2E urutan kronologis.
- [x] Review source dan dokumentasikan evaluasi.
- [x] Jalankan format, lint, typecheck, build produksi, dan HTTP smoke test.
- [ ] E2E/visual 360 px — test E2E belum memulai karena executable Chromium tidak tersedia; lihat `docs/testing/02-sejarah.md`.
- [ ] Tabel/seed `history_entries` serta CRUD admin — ditunda bersama integrasi Supabase.
- [ ] Validasi riwayat kepada pemerintah desa sebelum publikasi final.

Dokumen: `docs/testing/02-sejarah.md` dan `docs/evaluasi/02-sejarah.md`.

### Fitur berikutnya

- [ ] Potensi desa.
- [ ] Kegiatan desa.
- [ ] Berita.
- [ ] Galeri.
- [ ] Informasi layanan.
- [ ] Lokasi desa.
- [ ] Kontak.
- [ ] Transparansi keuangan dengan data tervalidasi saja.
- [ ] Beranda dan integrasi seluruh rute.

## Penutup dan kualitas

- [ ] SEO, metadata, sitemap, robots, 404/error states.
- [ ] Black-box/e2e testing dan evaluasi tiap fitur.
- [ ] Review pada 360, 768, dan 1280 px; tambahan 375, 1024, dan 1440 px.
- [ ] Audit keyboard, fokus, kontras, semantik, target sentuh, alt, reduced motion, dan overflow.
- [ ] README, panduan admin sesuai fungsi yang benar-benar tersedia, serta ringkasan serah terima.

## Status Supabase

- Integrasi Supabase: **ditunda**.
- MCP Supabase: **belum diperiksa** (tidak disimpulkan tersedia/tidak tersedia).
- Tidak ada kredensial, schema, migration, storage, auth, atau data persisten yang dibuat.
