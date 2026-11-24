# Skema Tanpa Revisi — 24 Nov 2026

Sejak perubahan ini, Website Desa Margo Lestari **tidak lagi memakai sistem
revisi**. Setiap edit yang disimpan di panel admin langsung tersimpan di
tabel konten dan langsung tampil di halaman publik. Tidak ada langkah
publish, tidak ada draf, dan tidak ada riwayat revisi.

## Yang dihapus (database)

Migrasi: `supabase/migrations/20261124150000_remove_revisions.sql`
(diterapkan ke proyek Supabase `ijbpdqywmfzsxcmopjnp` pada 24 Nov 2026).

- Tabel `content_sections`, `content_revisions`, `content_audit_events`.
- Kolom `revision_id` dari semua tabel konten (home_content,
  home_gallery_items, profile_content, profile_boundaries,
  village_officers, village_documents, population_reports,
  population_area_uses, population_occupations, apbdes_reports,
  apbdes_realizations, apbdes_revenue_sources, apbdes_spending_fields).
- Kolom `status` dan `is_sample` dari `site_settings` (pengaturan situs
  selalu tampil).
- Fungsi `publish_content_revision()` beserta fungsi validasi dan trigger
  penegak draf (`ensure_revision_is_draft`,
  `ensure_report_revision_is_draft`, `validate_published_revision_pointer`,
  `validate_revision_status_transition`, dan trigger `*_ensure_draft`).
  Trigger `set_updated_at` dipertahankan.

## Data yang dipertahankan

Untuk tiap section, hanya baris milik revisi yang sedang terbit
(`published_revision_id`) yang dipertahankan; baris milik revisi lain
dihapus. Jumlah baris sesudah migrasi:

| Tabel | Sebelum | Sesudah |
| --- | --- | --- |
| home_content | 6 | 1 |
| home_gallery_items | 36 | 6 |
| village_officers | 72 | 12 |
| profile_content | 1 | 1 |
| profile_boundaries | 4 | 4 |
| village_documents | 0 | 0 |
| population_reports | 1 | 1 |
| population_area_uses | 0 | 0 |
| population_occupations | 17 | 17 |
| apbdes_reports | 1 | 1 |
| apbdes_realizations | 4 | 4 |
| apbdes_revenue_sources | 4 | 4 |
| apbdes_spending_fields | 5 | 5 |
| media_assets | 6 | 6 |
| news_articles | 13 | 13 |
| site_settings | 1 | 1 |
| admin_users | 1 | 1 |

Baris yang berkurang adalah salinan lama dari revisi-revisi sebelumnya,
bukan data publik: halaman publik sebelum migrasi menampilkan data yang
sama persis dengan sesudah migrasi.

## RLS

RLS tetap aktif di semua 17 tabel yang tersisa. Policy baca publik yang
tadinya memfilter lewat `content_revisions` / `content_sections` ditulis
ulang menjadi `USING (true)` untuk anon pada tabel konten (semua baris
kini langsung live), dan policy `Administrators manage...` (ALL,
`private.is_admin()`) dipertahankan. `news_articles` tidak berubah
(status langsung, bukan revisi).

## Kode

- `src/lib/content/data.ts` (baru): loader langsung — `loadHomeData`,
  `loadProfileData`, `loadPopulationData`, `loadApbdesData`,
  `loadOfficers` — tanpa filter revisi. `loadHomeData` mengembalikan
  `HomeData` (content + officers + galleryItems + mediaAssets).
- `src/lib/content/public.ts` (baru, menggantikan `published.ts`):
  `getHome`, `getProfile`, `getPopulation`, `getApbdes`, `getOfficers`
  (mengembalikan data langsung, bukan `{ revisionId, data }`) dan
  `loadPublicData` (tidak pernah throw).
- Dihapus: `src/lib/content/sections.ts`, `revisions.ts`, `published.ts`,
  `index.ts`, `src/app/admin/(protected)/_components/revision-history-table.tsx`,
  `status-bar.tsx`.
- Admin actions (`beranda`, `profil`, `kependudukan`, `apbdes`,
  `struktur`) menyimpan langsung dengan upsert ke tabel (singleton via
  `limit(1)`, anak via hapus-lalu-sisip-ulang per `report_id`), tanpa
  `ensureWorkingRevision` / `publishRevision` / `insertAuditEvent`.
  `akun/actions.ts` tidak lagi menulis audit event. `pengaturan/actions.ts`
  tidak lagi menulis `status: "published"`.
- `src/lib/site-settings.ts`: `getPublicSiteSettings()` membaca
  `site_settings` tanpa filter status. `src/lib/validators/content.ts`:
  `revisionStatusSchema` dihapus. `src/lib/validators/site-settings.ts`:
  field `status` dihapus.
- Dashboard (`src/app/admin/(protected)/page.tsx`): metrik "Total
  perubahan" diganti "Berita terbit" (jumlah `news_articles` berstatus
  published); "Bagian terisi x/4", "Pemeriksaan lengkap",
  "Terakhir diubah" dari `updated_at`; tiap kartu section memakai badge
  "Terisi"/"Belum ada data" dan "Diubah <tanggal>".
- Halaman publik (`(public)/page.tsx`, `profil`, `infografis`,
  `infografis/apbdes`, `sejarah`) memakai loader baru; `homepage-content`,
  `profile-content`, `infografis-content` memakai `HomeData` /
  `ProfileData` / `PopulationData` langsung.
- `src/types/database.ts`: blok tabel `content_sections`,
  `content_revisions`, `content_audit_events` dihapus; semua baris
  `revision_id` dihapus; `status`/`is_sample` dihapus dari
  `site_settings`; blok `Functions` menjadi `[_ in never]: never`.
- Test: `tests/unit/content-sections.test.ts` dihapus;
  `tests/unit/validators-content.test.ts` dan
  `tests/unit/validators-site-settings.test.ts` diperbarui (hapus
  `revisionStatusSchema` dan field `status`).

## Perilaku baru

1. Buka modul admin (mis. Konten Beranda), ubah isian, klik
   "Simpan perubahan".
2. Pesan "Perubahan ... tersimpan dan langsung tampil di halaman publik."
   muncul; halaman publik menampilkan perubahan itu tanpa langkah lain.
3. Tidak ada riwayat revisi: menyimpan menimpa data yang tampil.

## Yang tidak berubah

Modul Media/Cloudinary (`src/lib/cloudinary.ts`, `/admin/media`),
`news_articles` (status langsung, sudah tanpa revisi sejak awal),
`auth`/`admin_users`, dan desain/tampilan.

## Verifikasi (24 Nov 2026)

- `npm run typecheck`: 0 error. `npm run lint`: 0 error, 7 warning
  (`<img>` vs `next/image`, sudah ada sebelumnya).
- `npm run build`: exit 0, 23/23 halaman.
- `npm run test:unit`: 50/50 lolos (3 file).
- `npm run test:smoke`: lolos.
- `npm run test:e2e`: 20 lolos, 3 skip, 0 gagal.
- Uji end-to-end (dev server, sesi admin via magic link): `hero_subtitle`
  diubah lewat form Beranda, halaman publik langsung menampilkan teks uji
  tanpa langkah publish, lalu dikembalikan ke kalimat awal dan halaman
  publik kembali seperti semula (terverifikasi di DB dan di halaman).
- Bukti DB sesudah migrasi: 17 tabel, RLS aktif di semua tabel, 0 kolom
  `revision_id`, tabel revisi dan fungsi `publish_content_revision`
  sudah tidak ada, jumlah baris konten sesuai tabel di atas.
