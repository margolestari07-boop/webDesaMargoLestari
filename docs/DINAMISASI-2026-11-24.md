# Dinamisasi Konten: Admin + Database + Berita + Cloudinary

Catatan perubahan 24 Nov 2026. Sebelum perubahan ini, database konten
kosong (0 revisi, `site_settings` berstatus draft) sehingga semua halaman
publik memakai konten statis dan dashboard admin menampilkan 0/4
"Belum ada data". Setelah perubahan ini, halaman publik membaca data
terbit dari database, dengan fallback statis hanya bila belum ada data
terbit.

## Yang diisi ke database (seed dari konten statis repo)

Semua nilai disalin dari kode statis di repo, tidak ada data desa yang
dikarang. Skrip seed: `/tmp/seed_margo.py` (tidak di-commit; hanya alat
sekali pakai).

- Revisi terbit: home, profile, population, apbdes (masing-masing
  `revision_no` 1, status published).
- `site_settings`: status diubah draft menjadi published; email
  `margolestari07@gmail.com`, jam layanan "Senin – Jumat: 08.00 – 15.30
  WIB", alamat memakai Kecamatan Tanjung Bintang (sesuai site_settings).
- Beranda: hero, nomor bantuan +62 821-1439-7667, 12 pejabat, 6 item
  galeri (file lokal di `/public`).
- Profil: teks sejarah, 4 batas wilayah, luas 1.011,5 Ha, jarak 90 Km.
- Kependudukan: total 3.062 jiwa (laki-laki 1.587, perempuan 1.475),
  952 KK, 17 pekerjaan (total tercatat 2.118 jiwa).
- APBDes TA 2024: realisasi pendapatan/belanja/pembiayaan, 5 bidang
  belanja, 4 sumber pendapatan.
- Berita: 13 artikel (9 utama + 4 populer) dari halaman statis lama,
  lengkap dengan gambar dan alt text.

## Yang masih perlu verifikasi desa (jangan dianggap final)

- Kecamatan: footer lama menulis Jati Agung, `site_settings` dan teks
  sejarah menulis Tanjung Bintang. Dipakai Tanjung Bintang; perlu
  konfirmasi desa.
- Jumlah penduduk: Beranda lama 2.938, Profil lama 1.587, Infografis
  3.062. Dipakai 3.062 (Profil Desa 2025, data paling lengkap).
- Nama "Sukamaju" masih ada di beberapa tempat sebagai nama lama desa
  (judul berita, analisis APBDes, alt text gambar). Judul metadata dan
  teks WA sudah diperbaiki; isi artikel dibiarkan apa adanya sampai
  desa mengonfirmasi.
- Jabatan Misngadi: Beranda menulis Kaur Perencanaan, Profil lama
  menulis Kasi Perencanaan. Dipakai Kaur Perencanaan (data pejabat).
- Rincian penggunaan lahan (1.116 Ha) bertentangan dengan luas
  1.011,5 Ha, jadi TIDAK di-seed dan TIDAK ditampilkan sebagai angka
  final. Usia produktif juga belum terverifikasi (ditampilkan "Belum
  tersedia").
- Angka APBDes disalin dari halaman statis; perlu verifikasi ke
  SISKEUDES. Tren 2020-2023 di grafik masih data arsip statis.

## Perubahan kode

- Header/footer memakai `getPublicSiteSettings` (hanya yang berstatus
  published) lewat props dari layout publik.
- Beranda, Profil, Infografis, APBDes, Sejarah: memakai loader
  `getPublished*` dengan fallback statis bila belum ada revisi terbit.
  Komponen blok "Data terbit" (`published-data.tsx`) dihapus karena
  halaman utama sekarang sudah dinamis.
- Profil: seksi Visi & Misi ditambahkan (id `visi-misi`, memakai
  konstanta misi/nilai yang sebelumnya tidak dirender); tombol mati
  "Unduh SK & Bagan PDF", "Lihat Tupoksi", dan "Unduh Buku Profil Desa"
  dihapus; nomor telepon memakai pengaturan situs.
- APBDes: judul metadata diperbaiki dari "Desa Sukamaju"; select tahun
  yang mati diganti label tahun aktif; klaim "Sinkronisasi SISKEUDES
  Online" dihapus karena belum ada integrasi itu; donat pendapatan dan
  semua angka dihitung dari data terbit.
- Berita: tabel baru `news_articles` + migrasi
  `supabase/migrations/20261124120000_news_articles.sql` (RLS aktif:
  publik hanya baca yang published, admin manage). Halaman `/berita`
  memakai database dengan pencarian, filter kategori, pengurutan, dan
  paginasi lewat parameter URL. Rute detail `/berita/[slug]` baru.
  Modul admin CRUD di `/admin/berita` (daftar, tambah, ubah, hapus,
  status draft/terbit) + entri sidebar.
- Media: kolom Cloudinary di `media_assets` + migrasi
  `supabase/migrations/20261124130000_media_assets_cloudinary.sql`
  (RLS tidak diubah, tetap aktif). Helper `src/lib/cloudinary.ts`,
  modul admin `/admin/media` (unggah + hapus, signed server-side),
  env di `.env.example`. Akun Cloudinary BELUM dibuat; lihat
  `docs/CLOUDINARY.md` untuk langkahnya.
- Tabel `dummy_mcp_test` (sisa tes, RLS nonaktif) dihapus dari database.

## RLS

Semua tabel (termasuk `news_articles` yang baru) memakai RLS aktif
dengan pola yang sama: anon hanya select baris published, admin
(`private.is_admin()`) manage. Tidak ada RLS yang dinonaktifkan.

## Verifikasi

`npm run typecheck`, `npm run lint`, `npm run build` harus 0 error.
Screenshot hasil ada di `~/workspace/margo-screenshots/`.
