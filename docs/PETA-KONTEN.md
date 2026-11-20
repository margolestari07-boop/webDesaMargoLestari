# Peta Konten — Website Desa Margo Lestari

Dokumen ini memetakan **setiap bagian yang tampil di halaman publik** ke sumber datanya:
apakah bisa diubah lewat panel admin (`/admin`), atau masih hardcode di kode.
Disusun dengan membaca langsung kode sumber pada HEAD `673b942`
(`src/app/(public)/`, `src/app/admin/(protected)/`, `src/lib/content/`,
`src/lib/validators/content.ts`, `src/components/`, `src/data/`,
`supabase/migrations/20261119120000_content_revisions.sql`).

> **Cara membaca kolom "Bisa diubah lewat admin?"**
>
> - **Ya** — isi bagian itu sepenuhnya berasal dari data yang diterbitkan admin.
> - **Sebagian (aditif)** — teks/kartu statis tetap tampil apa adanya; data yang
>   diterbitkan admin hanya muncul sebagai blok tambahan **"Data terbit"** di
>   bawah konten statis. Mengubah lewat admin **tidak mengganti** tampilan
>   bagian statisnya.
> - **Tidak** — isi sepenuhnya hardcode di kode; tidak ada jalur admin yang
>   memengaruhinya.
>
> **Penting — arsitektur saat ini:** semua halaman publik mempertahankan konten
> statisnya apa adanya (komentar di tiap `page.tsx`: *"Konten statis … dipertahankan
> apa adanya"*). Data admin yang diterbitkan hanya **ditambahkan** sebagai blok
> `Published*Block` dari `src/app/(public)/_components/published-data.tsx`.
> Jadi sampai hari ini **tidak ada satu pun bagian konten utama yang diganti
> isinya oleh admin** — admin hanya menambah blok data terbit di bawahnya.
>
> Alur publikasi: admin mengedit **draf** (`content_revisions` status `draft`)
> → **terbit** via RPC `publish_content_revision` → `content_sections.published_revision_id`
> menunjuk revisi terbit. Draf tidak pernah tampil di publik. Loader publik ada di
> `src/lib/content/published.ts` (`getPublishedHome`, `getPublishedProfile`,
> `getPublishedPopulation`, `getPublishedApbdes`, `getPublishedOfficers`) dan
> membaca hanya 4 section key: `home`, `profile`, `population`, `apbdes`
> (`src/lib/content/sections.ts`).

---

## 1. Beranda — `/`

File: `src/app/(public)/page.tsx`, `src/app/(public)/homepage-content.tsx`,
`src/app/(public)/_components/published-data.tsx` (`PublishedHomeBlock`).

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Hero (judul, subjudul, tombol "Jelajahi Desa", foto latar) | Judul "Selamat Datang di Portal Resmi Desa Margo Lestari", subjudul "Mewujudkan desa yang transparan…", foto latar URL `lh3.googleusercontent.com` | Sebagian (aditif) | Admin Beranda → `home_content.hero_title`, `hero_subtitle` — tapi **hanya tampil di blok "Data terbit"** di bawah, hero statis tidak berubah | Judul, subjudul, tombol, dan URL foto latar hardcode di `homepage-content.tsx` |
| Struktur Organisasi & Perangkat Desa (carousel SOTK) | 12 kartu pejabat: Sonjaya, S.H. (Kades, 2021–2029), Sutrisno (Sekdes), Kurniadi, Sustiana, Seni, Misngadi, Ardi Sonjaya, Jemadi, Kamsidi, Sodri Sanjaya, Komaroni, Sutrisno (Kadun 1–4) | Tidak | — (admin Struktur mengelola `village_officers`, tapi datanya **tidak dipakai** carousel ini) | Daftar `officers` hardcode di `homepage-content.tsx`. Data `village_officers` terbit hanya tampil sebagai daftar teks di blok "Data profil terbit" halaman Profil |
| Data Kependudukan & Profil Wilayah (4 kartu statistik) | 2.938 jiwa; 952 KK; 4 Dusun / 14 RT; jam layanan Senin–Jumat 08.00–15.30 WIB; catatan "Balai Desa Sukamaju" | Sebagian (aditif) | Admin Kependudukan → `population_reports` (total_population, total_households, period_label, source_name) — hanya tampil di blok "Data terbit" | Angka kartu hardcode di `homepage-content.tsx`. Perhatikan: angka ini **berbeda** dengan halaman lain (Profil: 1.587 jiwa; Infografis: 3.062 jiwa) |
| Banner "Butuh Bantuan Administrasi Cepat?" | Tombol Chat WhatsApp `wa.me/6281234567890` (teks "Halo Admin Desa Sukamaju…"), nomor +62 812-3456-7890 | Sebagian (aditif) | Admin Beranda → `home_content.help_phone` — hanya tampil sebagai baris teks di blok "Data terbit" | Nomor WA/telp dan nama "Desa Sukamaju" hardcode di `homepage-content.tsx`. `help_note` ada di skema admin tapi **tidak dirender** di publik |
| Galeri Desa (6 foto) | Foto Bersama Kepala Desa, Kegiatan PKK, Penyaluran Bantuan Beras, HUT RI 2024, Musyawarah, Posyandu — file di `public/*.jpeg` | Tidak | Admin Beranda punya kurasi galeri → `home_gallery_items` (media_asset_id, title, caption, alt_override) + `media_assets`, tapi **tidak dirender di halaman publik mana pun** | `PublishedHomeBlock` tidak pernah membaca `galleryItems`. Daftar `gallery` hardcode di `homepage-content.tsx`. Upload file belum ada (TODO Fase 4 di `beranda/actions.ts`: unggah ke Supabase Storage) |
| Blok "Data terbit" (di bawah konten statis) | Judul hero + subjudul + no. bantuan terbit, dan ringkasan penduduk terbit (jiwa, KK, periode, sumber) atau "Belum tersedia" | Ya | Admin Beranda → `home_content`; Admin Kependudukan → `population_reports` | Satu-satunya blok Beranda yang murni dari data admin |

---

## 2. Profil Desa — `/profil`

File: `src/app/(public)/profil/page.tsx`, `src/app/(public)/profil/profile-content.tsx`,
`published-data.tsx` (`PublishedProfileBlock`).

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Hero + intro + breadcrumb | Judul "Profil Desa Margo Lestari", intro "Mengenal lebih dekat…" | Tidak | — | Hardcode di `profile-content.tsx` |
| Tombol jangkar (Visi & Misi, Sejarah Desa, Bagan Organisasi, Data Wilayah) | 4 tombol anchor | Tidak | — | Hardcode. **Tombol "Visi & Misi" mengarah ke `#visi-misi`, tetapi tidak ada section dengan id itu di halaman ini.** Konstanta `missions` (5 misi) dan `values` (4 nilai) didefinisikan di `profile-content.tsx` tapi **tidak pernah dirender** — jadi Visi & Misi tidak tampil sama sekali di situs |
| Sejarah & Perkembangan Desa | Paragraf pemekaran 1986, pejabat sementara Bpk. R. Suparno, luas 1.011,5 Ha, 4 dusun, 1.938 jiwa | Sebagian (aditif) | Admin Profil → `profile_content.history_text` — hanya tampil di blok "Data profil terbit" | Paragraf hardcode di `profile-content.tsx`. Catatan form admin: "Bentuk linimasa peristiwa belum diputuskan, jadi untuk saat ini sejarah dikelola sebagai satu teks panjang" |
| Bagan SOTK (struktur organisasi) | Sonjaya (Kades), Sutrisno (Sekdes), Kasi: Kurniadi, Sustiana, Seni, Misngadi; Kaur: Jemadi, Ardi Sonjaya; Kadun 1–4: Kamsidi, Sodri Sanjaya, Komaroni, Sutrisno. Tombol "Unduh SK & Bagan PDF" dan "Lihat Tugas Pokok (Tupoksi)" | Sebagian (aditif) | Admin Struktur → `village_officers` (nama + jabatan aktif) — hanya tampil sebagai daftar teks di blok "Data profil terbit" | Bagan hardcode di `profile-content.tsx`. **Kedua tombol tidak berfungsi** (elemen `<button>` tanpa `onClick`/tautan). Perhatikan: "Kasi Perencanaan — MISNGADI" di sini, tetapi di Beranda Misngadi tertulis "Kaur Perencanaan" — jabatan tidak konsisten antar-halaman |
| Batas Wilayah Administratif | Utara: Karang Rejo & Sumber Jaya; Selatan: Gedung Harapan; Barat: Marga Agung, Marga Karya, Rejo Mulyo; Timur: Margodadi, Sumber Jaya, Gedung Harapan | Sebagian (aditif) | Admin Profil → `profile_boundaries` (direction north/south/east/west, label, description; maks. 4 arah) — tampil di blok terbit | Daftar `ethics` hardcode di `profile-content.tsx` |
| Kartu geografis (3 kartu) | Luas 1.011,5 Ha ("Pertanian 45,58%, Pemukiman 9,69%"); penduduk 1.587 jiwa / 952 KK; jarak ke ibu kota 90 Km, ±2,5 jam | Sebagian (aditif) | Admin Profil → `profile_content.area_value` + `area_unit`, `population_count`, `distance_to_capital_value` + `distance_to_capital_unit` — `area_value` tampil di blok terbit; **`population_count` dan `distance_to_capital_value` tidak dirender** di `PublishedProfileBlock` | Angka kartu hardcode di `profile-content.tsx`. Angka penduduk di sini (1.587) berbeda dengan Beranda (2.938) dan Infografis (3.062) |
| CTA Keterbukaan Informasi Publik (KIP) | "Butuh Dokumen Profil Lengkap…", tombol "Unduh Buku Profil Desa", tautan telpon "Hubungi Pamong Desa" (+6281234567890) | Tidak | Admin Profil punya `village_documents` (judul, doc_type, storage_path, dll.), tapi **hanya tampil sebagai daftar judul + tipe di blok terbit, tanpa tautan unduh** | "Unduh Buku Profil Desa" hanya elemen `<span>`, bukan tautan. `storage_path` di form admin masih diisi manual (TODO Fase 4: belum ada unggah file) |
| Blok "Data profil terbit" (di bawah konten statis) | Teks sejarah terbit, daftar batas wilayah, luas wilayah, daftar dokumen (judul + tipe), daftar pejabat aktif (nama — jabatan), atau "Belum tersedia" | Ya | Admin Profil → `profile_content`, `profile_boundaries`, `village_documents`; Admin Struktur → `village_officers` | Satu-satunya blok Profil yang murni dari data admin |

---

## 3. Infografis Kependudukan — `/infografis`

File: `src/app/(public)/infografis/page.tsx`, `src/app/(public)/infografis/infografis-content.tsx`,
`published-data.tsx` (`PublishedPopulationBlock`).

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Header (breadcrumb, badge sumber, judul, tanggal update, tombol unduh) | "Sumber: Profil Desa Margo Lestari Tahun 2025", "Data terakhir diperbarui: Maret 2025", tombol "Rekap data belum tersedia" | Tidak | — | Hardcode di `infografis-content.tsx`. Tombol unduh `disabled` dan tidak mengarah ke file apa pun |
| 4 kartu metrik ringkasan | Total penduduk 3.062 jiwa; 952 KK; komposisi 1.587 / 1.475 (51,8% / 48,2%); kelompok usia produktif "Belum tersedia" | Sebagian (aditif) | Admin Kependudukan → `population_reports` (total_population, total_households, male_count, female_count) — tampil di blok "Laporan kependudukan terbit" | Array `metrics` hardcode. Total 3.062 di sini berbeda dengan Beranda (2.938) dan Profil (1.587) |
| Profil wilayah (luas + rincian lahan) | Luas 1.011,5 Ha, 4 dusun, kepadatan ±303 jiwa/km²; kotak "Rincian penggunaan lahan perlu diverifikasi" (tabel 1.116 Ha vs luas 1.011,5 Ha) | Sebagian (aditif) | Admin Kependudukan → `population_reports.area_value` + `area_unit`, `population_area_uses` (category, area_value, area_unit) — tampil di blok terbit | Hardcode di `infografis-content.tsx`. Rincian lahan statis sengaja tidak ditampilkan sebagai angka final |
| Pekerjaan warga (17 kategori) | Petani 661, pegawai lepas 515, buruh 215, dst.; total tercatat 2.118 jiwa | Sebagian (aditif) | Admin Kependudukan → `population_occupations` (name, person_count) — tampil di blok terbit | Array `occupations` hardcode |
| Usia & tingkat pendidikan (2 kotak kosong) | "Data kelompok usia belum tersedia" dan "Tabel pendidikan menunggu verifikasi" (2.938 vs 3.062 jiwa) | Tidak | Admin Kependudukan punya `population_reports.productive_age_count`, tapi **`PublishedPopulationBlock` tidak menampilkannya**; tidak ada tabel pendidikan di skema admin | Hardcode (komponen `DataEmptyState`) di `infografis-content.tsx` |
| Banner "Data yang jelas, setelah terverifikasi" | Teks ajakan transparansi data | Tidak | — | Hardcode di `infografis-content.tsx` |
| Blok "Laporan kependudukan terbit" (di bawah konten statis) | Periode, total penduduk, KK, laki-laki, perempuan, sumber; daftar penggunaan lahan; daftar pekerjaan; atau "Belum tersedia" | Ya | Admin Kependudukan → `population_reports`, `population_area_uses`, `population_occupations` | Satu-satunya blok Infografis yang murni dari data admin |

---

## 4. APBDes — `/infografis/apbdes`

File: `src/app/(public)/infografis/apbdes/page.jsx`,
`src/components/apbdes-cards.jsx`, `published-data.tsx` (`PublishedApbdesBlock`).

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Header (breadcrumb, badge UU Desa 6/2014, judul, pemilih tahun) | Judul "Infografis APBDes Desa Margo Lestari", dropdown tahun 2024 (Aktif) / 2023 / 2022 / 2021, label "Sinkronisasi SISKEUDES Online" | Sebagian (aditif) | Admin APBDes → `apbdes_reports.fiscal_year`, `period_label` — hanya tampil di blok "Laporan APBDes terbit" | Hardcode di `page.jsx`. **Dropdown tahun tidak berfungsi** (elemen `<select>` tanpa handler — mengganti tahun tidak mengubah angka). Judul metadata halaman ini tertulis "Infografis APBDes Desa Sukamaju" (nama desa salah) |
| Ringkasan Realisasi 2024 (2 kartu) | Operasional: pendapatan Rp 2.180.250.000 (101,0%), belanja Rp 1.985.400.000 (93,4%), surplus Rp 194.850.000; Pembiayaan: SiLPA TA 2023 Rp 45.000.000, modal BUMDes Rp 11.450.000, netto Rp 33.550.000, estimasi SiLPA Rp 228.400.000 | Sebagian (aditif) | Admin APBDes → `apbdes_realizations` (kind `operasional`/`pembiayaan`, label, budget, realization) — tampil di blok terbit | Semua angka hardcode di `page.jsx` |
| Tren 5 tahun 2020–2024 (grafik batang SVG) | Pendapatan/belanja 2020 (1,62M/1,58M) s.d. 2024 (2,18M/1,98M); analisis "Desa Sukamaju … +7,8% per tahun … BUMDes Sukamaju Makmur" | Tidak | — (tidak ada tabel histori multi-tahun di skema admin; `apbdes_reports` hanya satu laporan per revisi) | Grafik `HistoricalChart` hardcode di `page.jsx`, lengkap dengan nama "Desa Sukamaju" |
| 5 Bidang Penyerapan Belanja (kartu) | Pemerintahan Desa Rp 642,5 jt; Pembangunan Rp 815,2 jt; Kemasyarakatan Rp 186 jt; Pemberdayaan Rp 264,7 jt; Bencana & Mendesak Rp 77 jt; total realisasi Rp 1.985.400.000 (93,4%); kartu "100% Bebas Korupsi & Pungutan" | Sebagian (aditif) | Admin APBDes → `apbdes_spending_fields` (field_name, budget, realization) — tampil di blok terbit | Array `expenseAllocations` hardcode di `page.jsx`; kartu ditampilkan via `ExpenseAllocationCard` (`src/components/apbdes-cards.jsx`) |
| Sumber Pendapatan Desa TA 2024 (donat + 4 kartu) | Dana Desa Rp 1.046.520.000 (48%), ADD Rp 741.285.000 (34%), PADes Rp 261.630.000 (12%), Bagi Hasil Pajak Rp 130.815.000 (6%); total Rp 2.180.250.000 | Sebagian (aditif) | Admin APBDes → `apbdes_revenue_sources` (source_name, budget, realization) — tampil di blok terbit | Array `revenueSources` + SVG donat hardcode di `page.jsx`; kartu via `RevenueSourceCard` |
| Blok "Laporan APBDes terbit" (di bawah konten statis) | Tahun anggaran, periode, dokumen sumber; daftar realisasi (label, pagu, realisasi); daftar bidang belanja; daftar sumber pendapatan; atau "Belum tersedia" | Ya | Admin APBDes → `apbdes_reports`, `apbdes_realizations`, `apbdes_spending_fields`, `apbdes_revenue_sources` | Satu-satunya blok APBDes yang murni dari data admin |

---

## 5. Berita — `/berita`

File: `src/app/(public)/berita/page.jsx`, `src/components/news-card.jsx`,
`src/components/news-archive.jsx`.

**Seluruh halaman ini statis — tidak ada satu pun bagian yang bisa diubah lewat
admin.** Tidak ada modul admin berita dan tidak ada tabel berita di
`supabase/migrations/20261119120000_content_revisions.sql`.

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Header + intro | Judul "Berita Desa Margo Lestari", intro seputar pembangunan & transparansi | Tidak | — | Hardcode di `page.jsx`. Judul metadata halaman tertulis "Warta & Berita Desa Sukamaju" (nama desa salah) |
| Pencarian + filter kategori | Kolom "Cari judul berita…", tombol Cari, filter: Semua Kategori, Pembangunan, Kegiatan Warga, Pertanian & UMKM, Pengumuman, Kesehatan/Posyandu | Tidak | — | Hardcode. **Input, tombol Cari, dan semua tombol filter tidak berfungsi** (tanpa state/handler) |
| Daftar artikel (9 kartu) | 9 artikel hardcode (irigasi Dusun Krajan, Posyandu & stunting, pertanian organik, DTKS, gotong royong Wonorejo, BUMDes, Musrenbangdes, Karang Taruna, Sedekah Bumi), tanggal 14 Sep–24 Okt 2025, gambar `lh3.googleusercontent.com` | Tidak | — | Array `articles` hardcode di `page.jsx`; kartu via `NewsCard`. Nama dusun di artikel (Krajan, Wonorejo, Sidomulyo, Sukaresmi) **tidak cocok** dengan 4 dusun resmi (Dusun 1–4) di halaman lain |
| Info jumlah + urutan | "Menampilkan 1–9 dari 48 Berita Terbit", dropdown Urutkan (Terbaru/Terpopuler/Terlama) | Tidak | — | Hardcode dan **tidak konsisten**: hanya 9 artikel yang dirender, klaim "48", footer halaman menyebut "Total 108 artikel" dan "12 halaman" |
| Pagination | Halaman 1–12, tombol Sebelumnya/Berikutnya | Tidak | — | Hardcode; tombol tidak memuat halaman lain (tidak ada rute `/berita?page=…`) |
| Sidebar Arsip Berita | 2025 (48 berita), 2024 (28), 2023 (34), 2022 (24), 2021 & sebelumnya (16) — total 150 | Tidak | — | Array `archives` hardcode di `src/components/news-archive.jsx`. Total arsip (150) tidak cocok dengan klaim "48" maupun "108" |
| Sidebar Berita Populer | 4 artikel: Panduan SKU, Panen Raya, Realisasi APBDes Triwulan III, Lomba Kebun Gizi — dengan jumlah dibaca | Tidak | — | Array `popularNews` hardcode di `page.jsx` |
| Sidebar Kanal Redaksi Warga | Email `margolestari07@gmail.com`, WhatsApp Humas 0812-3456-7890 | Tidak | — | Hardcode di `page.jsx` |

---

## 6. Sejarah — `/sejarah`

File: `src/app/(public)/sejarah/page.tsx`, `src/data/history.ts`, `src/data/site.ts`.

**Seluruh halaman ini statis — tidak ada satu pun bagian yang bisa diubah lewat
admin.** Narasi sejarah yang bisa diedit admin (`profile_content.history_text`)
hanya tampil di blok terbit halaman Profil, bukan di halaman ini.

| Bagian/Section | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Header + intro | "Jejak Desa Margo Lestari", "Riwayat yang tersedia dirangkum dalam linimasa singkat…" | Tidak | — | Hardcode di `page.tsx`; nama desa dari `siteIdentity.name` di `src/data/site.ts` |
| Linimasa (2 entri) | "Sebelum 1986 — Pemekaran dari Gedung Meneng"; "1986 — Pembentukan Desa Persiapan" | Tidak | — | Array `historyEntries` hardcode di `src/data/history.ts` (2 entri). Tidak ada modul/tabel linimasa sejarah |
| Catatan sumber | "Sumber: Analisis Proposal Website Desa Margo Lestari…" | Tidak | — | Hardcode di `page.tsx` |

---

## 7. Halaman lain

| Rute | Isi | Bisa diubah lewat admin? | Keterangan |
|---|---|---|---|
| `/admin/login` | Form login admin (email + password) | — (bukan konten publik) | `src/app/admin/login/` |
| `/admin` (dashboard) | Ringkasan 4 section konten (Beranda, Profil, Kependudukan, APBDes): status draf/terbit, jumlah revisi, checklist kelengkapan | — (bukan konten publik) | `src/app/admin/(protected)/page.tsx` |
| `/admin/beranda/struktur`, `/admin/profil/struktur` | Bukan halaman — hanya redirect ke `/admin/struktur` | — | Satu sumber struktur organisasi untuk Beranda + Profil |
| Tidak ada rute publik lain | Tidak ada halaman publik di luar `(public)`: tidak ada halaman detail berita (`/berita/[slug]`), galeri, layanan, dokumen, atau PPID | — | Navigasi publik hanya: Beranda, Profil, Infografis (Kependudukan + APBDes), Berita, Sejarah (Sejarah hanya bisa dijangkau dari tombol di Profil / URL langsung — **tidak ada di menu header**) |

---

## 8. Elemen yang tampil di SEMUA halaman (header & footer)

Layout publik: `src/app/(public)/layout.tsx` memakai `SiteHeader` dan `SiteFooter`
di setiap halaman. **Semua elemen di bawah ini statis.**

| Elemen | Isi yang tampil | Bisa diubah lewat admin? | Modul admin + tabel sumber (bila bisa) | Keterangan |
|---|---|---|---|---|
| Header — logo & identitas | Logo `/logo-pemerintah-desa.jpg` (file di `public/`), teks "Margo Lestari" + "Sistem Informasi Pelayanan" | Tidak | — | Hardcode di `src/components/site-header.tsx` |
| Header — menu navigasi | Beranda, Profil Desa, Infografis ▾ (Kependudukan, Transparansi APBDes), Berita | Tidak | — | Label/href dari `navigationItems` di `src/data/site.ts`; dropdown hardcode di `site-header.tsx`. **Sejarah tidak ada di menu** |
| Header — ikon profil | Ikon orang (lingkaran biru) di kanan atas | Tidak | — | Dekoratif, bukan tautan/tombol |
| Footer — kolom identitas | Logo, teks "Mewujudkan tata kelola pemerintahan desa yang amanah…", ikon mail & call | Tidak | — | Hardcode di `src/components/site-footer.tsx`. Ikon mail/call hanya `<div>`, bukan tautan |
| Footer — Layanan Mandiri | Tautan "Dokumentasi Kegiatan Desa" → `/#galeri` | Tidak | — | Hardcode; hanya 1 tautan di kolom ini |
| Footer — Pemerintahan | Tautan "Struktur Organisasi & Perangkat Desa" → `/#sotk` | Tidak | — | Hardcode; hanya 1 tautan di kolom ini |
| Footer — Kantor Pelayanan | Alamat "Margo Lestari, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35365"; jam "Senin – Jumat: 08.00 – 15.30 WIB"; tautan telpon +6281234567890 | Tidak | — | Hardcode. **Kecamatan tidak konsisten**: footer memakai "Jati Agung", sedangkan `src/data/site.ts` memakai default "Tanjung Bintang" dengan catatan `needsVerification: true, conflict: "Jati Agung"`. Admin Pengaturan punya field alamat/kecamatan, tetapi tidak dipakai halaman publik (lihat di bawah) |
| Footer — copyright | "© 2025 Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang." | Tidak | — | Hardcode (tahun 2025 tertulis tetap) |
| Modul Pengaturan Situs (`/admin/pengaturan`) | — | **Tidak tampil di publik sama sekali** | Admin Pengaturan → `site_settings` (village_name, tagline, subdistrict, regency, province, address, latitude, longitude, contact_person, phone, email, service_hours, website, facebook, instagram, youtube, status) | Fungsi baca `getPublicSiteSettings` ada di `src/lib/site-settings.ts`, tetapi **tidak dipanggil oleh halaman publik mana pun** (verifikasi: grep seluruh `src/` hanya menemukan definisi + tipe). Jadi semua field Pengaturan saat ini tersimpan di DB tanpa pernah ditampilkan |
| Modul Akun (`/admin/akun`) | — | — (bukan konten) | Ganti email & kata sandi admin (Supabase Auth) | Bukan konten publik |
| Komponen `NewsletterForm` | Form langganan "Daftar Warta Desa" (input email + tombol kirim) | Tidak | — | Komponen ada di `src/components/newsletter-form.jsx` tetapi **tidak diimpor/dipakai di halaman mana pun** (kode mati). Form-nya pun hanya `preventDefault()` — tidak menyimpan ke mana pun |

---

## 9. Ringkasan modul admin (apa yang sebenarnya bisa dikelola)

| Modul admin | Section key / tabel utama | Field yang bisa diedit | Catatan |
|---|---|---|---|
| Ringkasan (`/admin`) | — | — | Dashboard status 4 section + checklist; bukan editor konten |
| Konten Beranda (`/admin/beranda`) | `home` → `home_content`, `home_gallery_items`, `media_assets` | Judul hero, subjudul, no. bantuan, catatan bantuan; kurasi galeri (pilih media dari `media_assets`, judul, caption, alt, urutan) | Yang tampil publik dari modul ini hanya hero_title, hero_subtitle, help_phone (di blok "Data terbit"). `help_note` dan seluruh galeri tidak dirender publik. Upload media belum ada (Fase 4) |
| Struktur organisasi (`/admin/struktur`) | `home` → `village_officers` | Nama, jabatan, deskripsi, atasan (parent_id, hierarki), foto (UUID `media_assets`), urutan, aktif/nonaktif | Satu sumber untuk Beranda + Profil. Yang tampil publik hanya nama + jabatan aktif (di blok terbit Profil). Foto belum bisa diunggah (isi UUID manual) |
| Profil Desa (`/admin/profil`) | `profile` → `profile_content`, `profile_boundaries`, `village_documents` | Narasi sejarah, luas + satuan, jumlah penduduk, jarak ke ibu kota + satuan, catatan sumber; batas wilayah 4 arah; dokumen (judul, jenis, deskripsi, path Storage manual, mime, ukuran, alt, publik/tidak) | Yang tampil publik: history_text, batas wilayah, area_value, daftar dokumen (judul + tipe saja). `population_count`, `distance_to_capital_value`, dan tautan unduh dokumen tidak dirender. Upload dokumen belum ada (Fase 4) |
| Laporan Kependudukan (`/admin/kependudukan`) | `population` → `population_reports`, `population_area_uses`, `population_occupations` | Label periode, tanggal periode, sumber + referensi, tgl update data, total penduduk, KK, laki-laki, perempuan, usia produktif, luas + satuan; rincian penggunaan lahan; rincian pekerjaan | Yang tampil publik: semua kecuali `productive_age_count` (tidak dirender di blok terbit). Validasi: laki-laki + perempuan harus = total (bila ketiganya terisi) |
| Laporan APBDes (`/admin/apbdes`) | `apbdes` → `apbdes_reports`, `apbdes_realizations`, `apbdes_spending_fields`, `apbdes_revenue_sources` | Tahun anggaran (2000–2100), label periode, tanggal periode, dokumen sumber, catatan sumber, catatan; realisasi (operasional/pembiayaan, label, pagu, realisasi); bidang belanja; sumber pendapatan | Semua field tampil di blok terbit. Tidak ada histori multi-tahun (grafik 2020–2024 tetap statis) |
| Akun saya (`/admin/akun`) | Supabase Auth | Ganti email, ganti kata sandi | Bukan konten |
| Pengaturan situs (`/admin/pengaturan`) | `site_settings` | Nama desa, tagline, kecamatan, kabupaten, provinsi, alamat, latitude, longitude, narahubung, telepon, email, jam layanan, website, Facebook, Instagram, YouTube, status | **Tidak dipakai halaman publik mana pun** (lihat §8) |

Skema lengkap: `supabase/migrations/20261119120000_content_revisions.sql`
(tabel: `content_sections`, `content_revisions`, `content_audit_events`,
`media_assets`, `village_officers`, `home_content`, `home_gallery_items`,
`profile_content`, `profile_boundaries`, `village_documents`,
`population_reports`, `population_area_uses`, `population_occupations`,
`apbdes_reports`, `apbdes_realizations`, `apbdes_spending_fields`,
`apbdes_revenue_sources`). Validasi form: `src/lib/validators/content.ts`.
Data statis yang tidak tersentuh admin: `src/data/site.ts` (identitas + navigasi),
`src/data/history.ts` (linimasa), `src/data/village-profile.ts`
(`villageProfileContent` — semua field `null`/kosong dan **tidak dipakai** halaman mana pun).

---

## 10. Ringkasan: berapa persen konten yang bisa diubah lewat admin?

### Cara menghitung

Dihitung per **section konten yang terlihat** di 6 halaman publik (bukan per baris
data dan bukan per karakter). Setiap blok yang tampak sebagai satu kesatuan visual
(hero, satu kelompok kartu, satu daftar, satu banner, satu blok "Data terbit")
dihitung 1 section. Total **38 section** halaman (Beranda 6, Profil 8,
Infografis 7, APBDes 6, Berita 8, Sejarah 3). Elemen global (header/footer)
dihitung terpisah karena muncul di semua halaman.

Klasifikasi:

- **Ya (penuh)** — section sepenuhnya berasal dari data admin terbit: **4 section**
  (satu blok "Data terbit" di tiap halaman Beranda, Profil, Infografis, APBDes).
- **Sebagian (aditif)** — konten statis tetap tampil; data admin hanya muncul
  sebagai lampiran di blok "Data terbit" di bawahnya: **14 section**
  (Beranda 3, Profil 4, Infografis 3, APBDes 4).
- **Tidak** — sepenuhnya statis, admin tidak berpengaruh: **20 section**
  (Beranda 2, Profil 3, Infografis 3, APBDes 1, Berita 8, Sejarah 3).

### Hasil

| Kategori | Jumlah section | Persentase (dari 38) |
|---|---|---|
| Bisa diubah lewat admin (penuh) | 4 | **±11%** |
| Sebagian — data admin tampil sebagai blok tambahan, konten utama tetap statis | 14 | **±37%** |
| Tidak bisa diubah lewat admin (statis) | 20 | **±53%** |
| **Total** | **38** | **100%** |

**Cara membaca yang jujur:** bila "bisa diubah" diartikan *admin mengedit → tampilan
halaman berubah di tempatnya*, angkanya adalah **0%** — belum ada satu pun
bagian konten utama yang digantikan oleh data admin; yang ada hanya 4 blok
tambahan "Data terbit" (±11%) di bawah konten statis. Bila dihitung longgar
(admin *punya pengaruh* atas suatu section, termasuk lewat blok tambahan),
angkanya **±47%** (18 dari 38 section).

Elemen global: header (±4 elemen) dan footer (±5 elemen) — **semuanya statis
(0% bisa diubah)**, termasuk nama desa, alamat, jam layanan, dan nomor telepon
yang tampil di sana. Modul Pengaturan Situs sudah menyimpan field-field itu di
`site_settings`, tetapi belum ada halaman publik yang membacanya.

---

## 11. Prioritas bila semua konten mau bisa diubah lewat admin

Urut dari yang paling berdampak / paling mudah, berdasarkan temuan di atas.
"Perlu dibuat" berarti tabel/fitur yang belum ada di skema saat ini.

1. **Ganti konten statis dengan data terbit (bukan menambah blok)** — prioritas
   tertinggi dan tanpa tabel baru. Ubah `page.tsx` tiap halaman agar komponen
   statis (`homepage-content.tsx`, `profile-content.tsx`,
   `infografis-content.tsx`, `apbdes/page.jsx`) membaca `getPublished*` dan
   memakai data terbit sebagai pengganti angka/teks hardcode (dengan fallback
   ke nilai statis bila belum ada revisi terbit). Ini saja mengubah status
   14 section "sebagian" menjadi "bisa diubah".
2. **Sambungkan Pengaturan Situs ke halaman publik** — tanpa tabel baru.
   Panggil `getPublicSiteSettings()` (sudah ada di `src/lib/site-settings.ts`)
   di `site-header.tsx` / `site-footer.tsx` dan ganti nama desa, alamat,
   kecamatan, jam layanan, telepon, dan email hardcode dengan nilainya.
   Sekalian selesaikan konflik data: kecamatan Jati Agung (footer) vs Tanjung
   Bintang (`src/data/site.ts`), dan nama "Desa Sukamaju" yang masih tersebar
   (metadata Berita & APBDes, teks WA Beranda, analisis APBDes).
3. **Modul Berita** — perlu dibuat dari nol: tabel baru (mis. `news_articles`:
   judul, slug, kategori, isi, penulis, tanggal terbit, foto, status
   draf/terbit) + halaman detail `/berita/[slug]` + modul admin
   (`/admin/berita`) + arsip & berita populer yang membaca tabel yang sama.
   Ini satu-satunya halaman yang 0% bisa diubah (8 section) dan paling sering
   berubah isinya. Perlu juga memperbaiki inkonsistensi jumlah (9 vs 48 vs 108
   vs arsip 150) dan membuat fungsi cari/filter/sort/pagination benar-benar
   bekerja.
4. **Halaman Sejarah** — perlu dibuat: tabel baru (mis. `history_entries`:
   periode/tahun, judul, deskripsi, urutan) + modul admin, atau minimal
   arahkan halaman `/sejarah` memakai `profile_content.history_text` yang
   sudah ada. Sertakan juga section Visi & Misi di `/profil` (saat ini
   tombolnya ada tapi section-nya tidak ada; data `missions`/`values`
   hardcode tapi tidak dirender).
5. **Galeri foto** — sudah ada tabelnya (`home_gallery_items` +
   `media_assets`), tinggal: (a) render galeri terbit di Beranda
   (ganti array `gallery` hardcode), (b) selesaikan upload file ke Supabase
   Storage (TODO Fase 4) agar admin tidak perlu mengisi UUID media manual.
   Hal yang sama berlaku untuk **foto pejabat** (`village_officers.photo_asset_id`)
   dan **dokumen desa** (`village_documents.storage_path`) — saat ini hanya
   metadata, tanpa unggah dan tanpa tautan unduh di publik.
6. **Perbaiki field admin yang sudah ada tapi tidak tampil publik** —
   tanpa tabel baru: tampilkan `population_count` &
   `distance_to_capital_value` (Profil), `productive_age_count`
   (Infografis), `help_note` (Beranda), serta `notes`/`source_note` APBDes di
   blok terbit masing-masing; dan jadikan daftar dokumen Profil tautan unduh
   sungguhan (butuh Storage, lihat poin 5).
7. **Fungsikan kontrol yang saat ini mati** — pemilih tahun APBDes, tombol
   "Unduh SK & Bagan PDF" / "Lihat Tupoksi" (Profil), tombol unduh rekap
   (Infografis), dan tombol "Unduh Buku Profil Desa" (Profil). Sebagian
   butuh dokumen di Storage (poin 5); pemilih tahun butuh laporan APBDes
   multi-tahun (satu `apbdes_reports` per tahun + pemilih tahun yang
   memuat revisi terbit tahun tersebut).
8. **Rapikan data statis yang saling bertentangan** (sebelum/saat migrasi ke
   admin): jumlah penduduk Beranda 2.938 vs Profil 1.587 vs Infografis 3.062;
   jabatan Misngadi (Kaur vs Kasi Perencanaan); nama dusun di artikel berita
   (Krajan, Wonorejo, Sidomulyo, Sukaresmi) vs Dusun 1–4; "Balai Desa
   Sukamaju". Tetapkan satu sumber angka resmi per periode di
   `population_reports` dan pakai di semua halaman (poin 1).
9. **Bersihkan kode mati / belum terpakai**: `NewsletterForm`
   (`src/components/newsletter-form.jsx`, tidak dipakai di mana pun),
   `villageProfileContent` (`src/data/village-profile.ts`, semua `null` dan
   tidak dipakai), dan konstanta `missions`/`values` di `profile-content.tsx`
   (tidak dirender) — putuskan dipakai (poin 4) atau dihapus.

---

*Disusun 2026-11-20 dari kode pada HEAD `673b942`. Tidak ada perubahan kode,
push, atau akses database live dalam penyusunan dokumen ini. Bagian yang
tidak dapat dipastikan dari kode ditandai "belum terverifikasi dari kode" —
dalam dokumen ini tidak ada bagian seperti itu; seluruh pemetaan di atas
didasarkan pada pembacaan langsung file sumber yang tercantum.*
