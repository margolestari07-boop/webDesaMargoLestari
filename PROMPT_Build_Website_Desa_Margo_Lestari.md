# PROMPT — Bangun Website Desa Margo Lestari (Next.js + Supabase)

> Salin seluruh isi file ini sebagai prompt pertama ke coding agent (misalnya Claude Code) yang dijalankan di dalam folder project lokal. Pastikan file `Analisis_Proposal_Website_Desa_Margo_Lestari.md` sudah ada di folder tersebut.

---

## PERAN

Kamu adalah engineer full-stack senior sekaligus desainer antarmuka. Kamu membangun **website resmi Desa Margo Lestari** sebagai media informasi, publikasi inovasi digital, dan transparansi desa. Kamu bekerja bertahap, disiplin, dan jujur: tidak mengarang data desa, tidak melompati review, dan melaporkan masalah apa adanya.

## ATURAN KERJA GLOBAL

1. **Siklus wajib per fitur:** `BUAT → REVIEW → TESTING → EVALUASI → REVISI`.
2. **Review di akhir setiap tugas.** Satu fitur terdiri dari beberapa tugas. Setelah *setiap* tugas selesai, jalankan blok **REVIEW TUGAS** (lihat di bawah) sebelum pindah ke tugas berikutnya. Jangan menggabungkan beberapa tugas lalu mereview sekaligus.
3. **Berhenti di akhir tiap fitur.** Setelah siklus fitur selesai (termasuk revisi), tampilkan ringkasan dan **tunggu konfirmasi saya** sebelum lanjut ke fitur berikutnya.
4. **Jangan mengarang data desa.** Semua konten yang belum ada di file `.md` harus berupa *placeholder* yang jelas berlabel (contoh: "Contoh data — belum divalidasi pihak desa") dan ditandai `is_sample = true` di database. Angka keuangan palsu tidak boleh tampil seolah-olah data asli.
5. **Jangan menyimpan rahasia di repo.** Kunci Supabase hanya di `.env.local` (masuk `.gitignore`). Sediakan `.env.example` tanpa nilai asli. `service_role` key tidak boleh dipakai di kode klien.
6. **Catat progres** di `docs/PROGRESS.md` (checklist fitur, tugas, status, tanggal, catatan masalah).
7. **Git:** inisialisasi git bila belum ada. Commit setelah tiap tugas lolos review, dengan format `feat(<fitur>): <ringkas>` atau `fix(<fitur>): <ringkas>`.
8. **Verifikasi versi.** Periksa versi Next.js dan library yang terpasang, dan ikuti dokumentasi versi tersebut. API bisa berubah antar versi (misalnya `params` dan `cookies()` yang asinkron di App Router versi baru). Jangan menulis kode dari asumsi lama.
9. Bila ada hal ambigu yang menghambat, ajukan **satu** pertanyaan singkat. Untuk hal kecil, pilih default yang masuk akal dan catat asumsinya di `docs/PROGRESS.md`.

### Blok REVIEW TUGAS (dijalankan setelah setiap tugas)

- [ ] `npm run lint` bersih.
- [ ] `npx tsc --noEmit` bersih.
- [ ] `npm run build` berhasil (jalankan minimal di akhir tiap fitur; untuk tugas kecil cukup lint dan tsc).
- [ ] Hasil tugas dicek terhadap deskripsi tugas dan `.md` proyek: ada yang terlewat atau berlebihan?
- [ ] Tidak ada rahasia, `console.log` sisa, kode mati, atau `any` tanpa alasan.
- [ ] UI (bila ada): dicek di lebar 360 px, 768 px, dan 1280 px, serta tema terang. Fokus keyboard terlihat.
- [ ] Tulis ringkasan review 3–6 baris (apa yang dibuat, apa yang dicek, temuan). Bila ada temuan, perbaiki dulu sebelum lanjut.

---

## FASE 0 — BACA FILE `.md` PROYEK (WAJIB PALING AWAL)

1. Cari dan baca file `Analisis_Proposal_Website_Desa_Margo_Lestari.md` di root folder project lokal. Jika tidak ketemu, cari file `.md` lain di folder ini dan tanyakan apakah itu yang dimaksud. Jangan lanjut tanpa membacanya.
2. Tulis ringkasan pemahaman (maksimal 15 baris) yang memuat: tujuan proyek, identitas desa, daftar fitur, dan **temuan screening** di file tersebut.
3. Perhatikan temuan berikut dan perlakukan sebagai **hal yang harus bisa diubah admin, bukan konstanta di kode**:
   - Kecamatan tidak konsisten (Tanjung Bintang vs Jati Agung). Simpan sebagai nilai di tabel pengaturan situs, default **Tanjung Bintang** (sesuai mayoritas dokumen), dan beri catatan di `docs/PROGRESS.md` bahwa ini perlu diverifikasi ke pihak desa.
   - Menu transparansi keuangan tidak ada di daftar 9 menu awal. Tetap bangun sebagai menu tersendiri.
   - Jenis layanan, sumber dana desa, data demografi, dan koordinat lokasi belum tersedia. Siapkan struktur datanya agar admin bisa mengisi.
4. Simpan ringkasan tersebut di `docs/PROGRESS.md` bagian "Pemahaman Awal".

**Berhenti dan tampilkan ringkasan kepada saya. Lanjut ke Fase 1 setelah saya konfirmasi.**

---

## FASE 1 — CEK KETERSEDIAAN MCP SUPABASE (SEBELUM MENYENTUH DATABASE)

1. Periksa daftar tool/MCP server yang tersedia di sesi ini. Cari MCP **Supabase** (tool seperti `list_projects`, `get_project`, `apply_migration`, `execute_sql`, `list_tables`, `get_advisors`, `generate_typescript_types`; nama bisa berbeda).
2. **Jika MCP Supabase tersedia:**
   - Panggil `list_projects` dan tampilkan daftar project. **Tanyakan project mana yang dipakai.** Jangan membuat project baru tanpa persetujuan saya (bisa berbiaya).
   - Setelah project dipilih, catat `project_ref` dan URL project di `docs/PROGRESS.md` (bukan kunci rahasia).
   - Gunakan `apply_migration` untuk DDL (skema, RLS, storage) dan **juga simpan salinan SQL-nya** di `supabase/migrations/` agar bisa direproduksi. Gunakan `execute_sql` hanya untuk data seed/pengecekan.
   - Setelah setiap perubahan skema, jalankan `get_advisors` (security) dan perbaiki peringatan RLS sebelum lanjut. Gunakan `generate_typescript_types` untuk membuat `src/types/database.ts`.
   - Minta saya mengisi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local`. Jangan menebak atau menampilkan kunci.
3. **Jika MCP Supabase TIDAK tersedia:**
   - Beritahu saya jelas bahwa MCP belum terpasang, dan jelaskan cara memasangnya (cek dokumentasi resmi Supabase MCP untuk perintah terbaru; umumnya MCP server remote Supabase ditambahkan ke klien MCP dengan `project_ref`, dan disarankan memakai mode `read_only` bila hanya untuk pengecekan).
   - Tawarkan dua pilihan dan tunggu jawaban saya: (a) saya pasang MCP lalu restart sesi, atau (b) lanjut **tanpa MCP**: semua skema ditulis sebagai file SQL di `supabase/migrations/` (urut bernomor) dan saya yang menjalankannya lewat SQL Editor atau Supabase CLI. Pada opsi (b), tiap tugas database diakhiri instruksi singkat "jalankan file ini lalu konfirmasi".
4. Apa pun opsinya, tulis hasil pengecekan ("MCP: tersedia/tidak, project: …, mode kerja: …") di `docs/PROGRESS.md`.

---

## FASE 2 — INISIASI PROJECT DENGAN NPM (DI FOLDER PROJECT LOKAL)

Jalankan di folder project saat ini, **bukan** di subfolder baru.

1. Cek `node -v` dan `npm -v`. Pastikan Node memenuhi syarat versi Next.js terbaru; bila tidak, beritahu saya.
2. Inisiasi Next.js dengan NPM:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
   ```
   Jika perintah menolak karena folder tidak kosong (ada file `.md`), buat project di folder sementara lalu pindahkan isinya ke root **tanpa menimpa** file `.md` milik saya.
3. Pasang dependensi dengan NPM:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr framer-motion zod clsx
   npm install -D @playwright/test prettier prettier-plugin-tailwindcss
   ```
   Tambahan boleh dipasang bila ada alasan jelas (contoh: `react-markdown` untuk konten berita, `lucide-react` untuk ikon garis tipis, `@axe-core/playwright` untuk uji aksesibilitas). Jelaskan alasan tiap dependensi tambahan di `docs/PROGRESS.md`. Hindari library UI besar yang membawa gaya bawaan "template".
4. Siapkan struktur:
   ```
   src/
     app/(public)/...        # halaman publik
     app/admin/...           # panel admin (terproteksi)
     components/ui/          # komponen dasar (Button, Input, Table, dll.)
     components/motion/      # wrapper animasi (Reveal, Stagger, PageTransition)
     lib/supabase/           # client.ts, server.ts, middleware helper
     lib/validators/         # skema zod
     types/database.ts
   supabase/migrations/
   docs/PROGRESS.md, docs/testing/, docs/evaluasi/
   .env.example
   ```
5. Tambahkan skrip di `package.json`: `typecheck` (`tsc --noEmit`), `format`, `test:e2e`.
6. Jalankan `npm run dev`, pastikan halaman awal terbuka tanpa error, lalu `npm run build`.
7. **REVIEW TUGAS** lalu commit `chore: init project`.

---

## ARAH DESAIN (BERLAKU UNTUK SEMUA FITUR)

Gaya: **minimalis, editorial, tenang, dan terasa dibuat manusia untuk sebuah desa**, bukan template generik.

**Tipografi**
- Pasang font lewat `next/font` (boleh Google Fonts). Rekomendasi: serif editorial untuk judul (misalnya *Newsreader* atau *Fraunces* dengan optical size rendah) dan sans netral untuk isi (misalnya *Instrument Sans*, *DM Sans*, atau *Geist*). Pilih satu pasangan, pakai konsisten.
- Skala tipografi tegas: judul besar dengan *tracking* sedikit rapat, isi 16–18 px dengan `line-height` lega, lebar baca maksimal ±68 karakter.

**Warna** (token CSS variable, mudah diubah)
- Latar putih gading hangat (contoh `#FAF8F4`), teks hampir hitam (`#1B1B18`), teks sekunder abu hangat (`#6B6B63`), garis tipis (`#E4E0D8`).
- **Satu** warna aksen saja, hijau tua yang membumi (contoh `#2F5D3A`) untuk tautan, tombol utama, dan penanda aktif. Tanpa gradien.

**Tata letak**
- Grid 12 kolom, margin luas, ritme vertikal konsisten (kelipatan 8 px). Pemisah memakai garis tipis 1 px, bukan bayangan tebal.
- Foto sebagai elemen utama bila ada. Bila foto belum ada, pakai blok datar netral berlabel, bukan ilustrasi stok atau gambar AI.
- Radius kecil (2–6 px). Bayangan hampir tidak dipakai.

**Yang DILARANG (ciri "AI slop")**
- Gradien ungu/biru/neon, efek glassmorphism, blob/bubble dekoratif, grid "bento" berlebihan.
- Pola klise "hero + tiga kartu berikon + CTA di tengah".
- Emoji sebagai ikon, ikon di dalam lingkaran berwarna pada setiap kartu.
- Teks lorem ipsum atau slogan generik ("Menuju era digital yang gemilang"). Tulis salinan yang spesifik, singkat, dan membumi dalam Bahasa Indonesia.
- Dark mode otomatis tanpa dirancang. Cukup satu tema terang yang matang, kecuali saya minta lain.
- Animasi berlebihan atau memantul.

**Animasi (Framer Motion)**
- Buat wrapper `Reveal` (fade + naik 12 px saat masuk viewport, `once: true`), `Stagger` untuk daftar, dan transisi halaman yang halus.
- Durasi 0.4–0.6 dtk, easing lembut (misalnya `[0.22, 1, 0.36, 1]`). Gunakan untuk memberi hierarki, bukan hiasan.
- **Wajib** menghormati `prefers-reduced-motion` (`useReducedMotion`). Hindari parallax dan efek yang membuat teks sulit dibaca.
- Animasi hanya pada `opacity` dan `transform` agar performa terjaga. Jaga agar Server Component tetap dominan; bungkus animasi dalam komponen klien kecil.

**Aksesibilitas dan performa**
- Kontras WCAG AA, label form jelas, urutan fokus benar, `alt` bermakna, elemen semantik.
- Gunakan `next/image` dengan ukuran eksplisit, `loading` yang tepat, dan render server/ISR untuk halaman konten.
- Mobile-first: banyak pengunjung desa memakai ponsel dengan koneksi terbatas.

---

## TEMPLATE SIKLUS PER FITUR

Untuk **setiap** fitur di bawah, ikuti urutan ini:

1. **BUAT** — kerjakan tugas satu per satu. Setiap tugas diakhiri **REVIEW TUGAS** (blok di atas) dan commit.
2. **REVIEW FITUR** — tinjau fitur utuh: konsistensi dengan fitur sebelumnya, desain sesuai arah desain, tidak ada duplikasi komponen yang seharusnya dipakai ulang.
3. **TESTING** — tulis `docs/testing/<nomor>-<fitur>.md` berisi tabel *black-box test* (kolom: ID, skenario, langkah, hasil diharapkan, hasil aktual, status). Jalankan: skenario manual lewat dev server (atau Playwright bila memungkinkan), `lint`, `typecheck`, `build`, dan (bila ada perubahan DB) `get_advisors`. Isi hasil aktual dengan jujur.
4. **EVALUASI** — tulis `docs/evaluasi/<nomor>-<fitur>.md`: nilai tiap kriteria **Lulus / Perlu revisi** beserta bukti singkat.
   - Fungsional (semua skenario test lulus)
   - Kesesuaian dengan `.md` proyek
   - UI sesuai arah desain, responsif 360/768/1280 px
   - Aksesibilitas dasar (kontras, fokus, label, `alt`)
   - Keamanan data (RLS aktif, publik hanya bisa membaca data berstatus terbit)
   - Performa (tidak ada gambar tanpa ukuran, tidak ada JS klien yang tak perlu)
5. **REVISI** — perbaiki semua butir "Perlu revisi" dan semua tes gagal. Ulangi TESTING pada skenario yang terdampak plus uji regresi singkat pada fitur lain yang berbagi komponen, lalu perbarui dokumen evaluasi. Maksimal 3 putaran revisi. Jika masih ada yang gagal, laporkan sebagai isu terbuka kepada saya.
6. **LAPOR** — tampilkan ringkasan fitur (apa yang jadi, hasil test, isu terbuka) dan **tunggu konfirmasi saya**.

Pola umum untuk fitur berbasis data (berlaku di setiap fitur kecuali dinyatakan lain):
- Tabel punya `id`, `created_at`, `updated_at`, `is_sample boolean default false`, dan bila relevan `status` (`draft`/`published`).
- **RLS aktif.** Publik (anon) hanya `SELECT` baris `published`. Tulis/ubah/hapus hanya untuk admin (pengguna yang ada di tabel `admin_users`).
- Validasi input dengan zod di sisi server. Form admin tidak boleh mengandalkan validasi klien saja.
- Halaman publik berupa Server Component dengan `revalidate` yang wajar. Setiap halaman punya `generateMetadata`.
- Tampilkan *empty state* yang rapi bila data belum diisi, bukan halaman kosong.

---

## FITUR 0 — FONDASI (SISTEM DESAIN, LAYOUT, AUTH ADMIN)

Prasyarat bagi semua fitur lain.

**Tugas 0.1 — Token desain dan font.** Pasang font, definisikan CSS variable warna/ruang/radius, konfigurasi Tailwind agar memakai token.
→ **Review 0.1:** font termuat tanpa layout shift, kontras warna lolos AA, tidak ada warna di luar token.

**Tugas 0.2 — Komponen dasar.** `Button`, `Input`, `Textarea`, `Select`, `Label`, `Badge`, `Table`, `Container`, `SectionHeading`, `EmptyState`.
→ **Review 0.2:** fokus keyboard terlihat, status disabled/error jelas, semua varian dipakai atau dihapus.

**Tugas 0.3 — Wrapper animasi.** `Reveal`, `Stagger`, `PageTransition` dengan dukungan `prefers-reduced-motion`.
→ **Review 0.3:** uji dengan reduced-motion aktif dan pastikan tidak ada animasi; pastikan hanya `opacity`/`transform`.

**Tugas 0.4 — Layout publik.** Header dengan navigasi (menu: Profil, Sejarah, Potensi, Kegiatan, Berita, Galeri, Layanan, Transparansi, Lokasi, Kontak), menu mobile yang rapi, footer berisi identitas desa dan kontak. Teks identitas diambil dari data, bukan di-*hardcode*.
→ **Review 0.4:** navigasi bisa dipakai dengan keyboard, penanda halaman aktif benar, tampilan 360 px tidak patah.

**Tugas 0.5 — Supabase client dan skema dasar.** `lib/supabase/{client,server}.ts` memakai `@supabase/ssr`, middleware penyegar sesi, tabel `site_settings` (nama desa, tagline, kecamatan, kabupaten, provinsi, alamat, lat, lng, kontak person, telepon, email, jam layanan, tautan sosial) dan `admin_users`, beserta RLS. Seed `site_settings` dari data di `.md` (nama desa, kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Provinsi Lampung, kontak person dan telepon sesuai `.md`).
→ **Review 0.5:** `get_advisors` bersih (atau skrip SQL terverifikasi bila tanpa MCP), tidak ada kunci rahasia di kode, `.env.example` lengkap.

**Tugas 0.6 — Autentikasi admin.** Login email-password lewat Supabase Auth di `/admin/login`, proteksi semua rute `/admin/*` (middleware + pengecekan di server), tombol keluar, layout admin yang sederhana. Panduan membuat akun admin pertama ditulis di `docs/PANDUAN_ADMIN.md`.
→ **Review 0.6:** akses `/admin` tanpa login dialihkan; pengguna login yang bukan admin ditolak; pesan galat tidak membocorkan detail.

**Tugas 0.7 — Pengaturan situs di admin.** Form untuk mengubah isi `site_settings` (termasuk kecamatan).
→ **Review 0.7:** perubahan langsung tampil di header/footer setelah revalidasi.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 1 — PROFIL DESA
*Rujukan: Profil Desa (Butir 6 no. 1, Butir 3a). Menjadi identitas resmi desa.*

**Tugas 1.1 — Skema.** Tabel `village_profile` (satu baris): `nama`, `deskripsi` (markdown), `visi`, `misi` (daftar), `foto_url`. Identitas wilayah (kecamatan, kabupaten, provinsi) dibaca dari `site_settings`. Struktur dibuat siap diperluas untuk data demografi dan potensi (belum tersedia di `.md`).
→ **Review 1.1:** RLS benar, tipe TS dibuat ulang, seed berlabel sampel bila isi belum ada.

**Tugas 1.2 — Halaman publik `/profil`.** Judul editorial, paragraf pengantar, blok identitas wilayah (tabel garis tipis), visi-misi, foto bila ada. Animasi `Reveal` yang halus.
→ **Review 1.2:** responsif, tidak ada teks yang bukan berasal dari data, *empty state* rapi.

**Tugas 1.3 — Form admin.** Halaman `/admin/profil` untuk mengubah semua kolom, termasuk unggah foto ke Supabase Storage (bucket `site-media`, publik-baca, tulis hanya admin).
→ **Review 1.3:** validasi zod di server, batas ukuran/tipe berkas, tidak bisa menulis tanpa login admin.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 2 — SEJARAH DESA
*Rujukan: Sejarah Desa (Butir 6 no. 2) dan riwayat pemekaran di Butir 3 `.md`.*

**Tugas 2.1 — Skema dan seed.** Tabel `history_entries`: `tahun`, `judul`, `isi`, `urutan`, `status`. Seed dua entri dari `.md`: pemekaran dari Desa/Kelurahan Gedung Meneng, Labuhan Ratu, Kecamatan Kedaton; dan pembentukan Desa Persiapan Margo Lestari tahun 1986 di Kecamatan Tanjung Bintang. Jangan menambah fakta di luar `.md`.
→ **Review 2.1:** isi seed persis sesuai `.md`, tidak ada tambahan karangan.

**Tugas 2.2 — Halaman publik `/sejarah`.** Linimasa vertikal minimalis (garis tipis, tahun besar bergaya serif), entri muncul bertahap dengan `Stagger`.
→ **Review 2.2:** terbaca baik di 360 px, urutan kronologis benar.

**Tugas 2.3 — CRUD admin.** Daftar, tambah, ubah, hapus, atur urutan entri.
→ **Review 2.3:** konfirmasi sebelum hapus, urutan tersimpan, validasi server.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 3 — POTENSI DESA
*Rujukan: Potensi Desa (Butir 6 no. 3). Isi potensi spesifik belum ada di `.md`.*

**Tugas 3.1 — Skema.** Tabel `potentials`: `slug` (unik), `judul`, `kategori`, `ringkasan`, `isi` (markdown), `cover_url`, `status`.
→ **Review 3.1:** indeks pada `slug` dan `status`, RLS benar.

**Tugas 3.2 — Daftar publik `/potensi`.** Daftar editorial (bukan kartu seragam berikon): gambar, kategori, judul, ringkasan; filter kategori sederhana.
→ **Review 3.2:** gambar memakai `next/image` dengan ukuran, filter bisa dipakai keyboard.

**Tugas 3.3 — Detail `/potensi/[slug]`.** Konten markdown disanitasi, metadata sosial, tautan kembali.
→ **Review 3.3:** slug tak dikenal menampilkan 404 yang rapi, tidak ada XSS dari markdown.

**Tugas 3.4 — CRUD admin + unggah cover.**
→ **Review 3.4:** slug otomatis dan unik, status draft tidak muncul di publik.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 4 — KEGIATAN DESA
*Rujukan: Kegiatan Desa (Butir 6 no. 4).*

**Tugas 4.1 — Skema.** Tabel `activities`: `slug`, `judul`, `deskripsi`, `tanggal_mulai`, `tanggal_selesai`, `lokasi`, `cover_url`, `status`.
→ **Review 4.1:** validasi tanggal selesai ≥ mulai, zona waktu konsisten (WIB).

**Tugas 4.2 — Halaman publik `/kegiatan`.** Dua bagian: "Akan datang" dan "Telah berlangsung", tanggal ditampilkan dengan format Indonesia.
→ **Review 4.2:** pembagian akan datang/lampau benar terhadap tanggal hari ini, *empty state* tiap bagian.

**Tugas 4.3 — Detail `/kegiatan/[slug]`.**
→ **Review 4.3:** 404 rapi, metadata benar.

**Tugas 4.4 — CRUD admin.**
→ **Review 4.4:** validasi server, unggah cover aman.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 5 — BERITA
*Rujukan: Berita (Butir 6 no. 5).*

**Tugas 5.1 — Skema.** Tabel `news`: `slug`, `judul`, `ringkasan`, `konten` (markdown), `cover_url`, `penulis`, `published_at`, `status`.
→ **Review 5.1:** indeks `published_at desc`, RLS membatasi publik ke `published` dan `published_at <= now()`.

**Tugas 5.2 — Daftar `/berita` dengan paginasi.** Berita terbaru ditonjolkan satu, sisanya daftar teks bergaya editorial.
→ **Review 5.2:** paginasi benar di halaman pertama/terakhir, performa query (hanya kolom yang perlu).

**Tugas 5.3 — Detail `/berita/[slug]`.** Tipografi artikel nyaman, tanggal, penulis, metadata Open Graph, tombol bagikan sederhana (salin tautan).
→ **Review 5.3:** konten markdown aman, gambar responsif, 404 rapi.

**Tugas 5.4 — CRUD admin + editor markdown + pratinjau + penjadwalan terbit.**
→ **Review 5.4:** draft tidak bocor ke publik, pratinjau sama dengan tampilan akhir.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 6 — GALERI
*Rujukan: Galeri (Butir 6 no. 6; foto sebagai materi konten di Butir 4 Tahap 2).*

**Tugas 6.1 — Skema dan storage.** Tabel `gallery_albums` (`judul`, `deskripsi`, `cover_url`, `status`) dan `gallery_items` (`album_id`, `image_url`, `caption`, `urutan`). Bucket `gallery` dengan kebijakan baca publik dan tulis admin.
→ **Review 6.1:** kebijakan storage diuji (anon tidak bisa unggah), `get_advisors` bersih.

**Tugas 6.2 — Halaman `/galeri` dan `/galeri/[album]`.** Grid foto dengan rasio asli (masonry sederhana berbasis CSS), muat bertahap.
→ **Review 6.2:** tidak ada *layout shift*, `next/image` dengan `sizes` yang tepat.

**Tugas 6.3 — Lightbox.** Dengan Framer Motion (`AnimatePresence`), navigasi keyboard (←, →, Esc), penguncian scroll, fokus terkurung di dialog.
→ **Review 6.3:** aksesibilitas dialog (`role`, label, pengembalian fokus), reduced-motion dihormati.

**Tugas 6.4 — Admin: kelola album dan unggah banyak foto** dengan batas ukuran/tipe dan kompresi sisi klien bila memungkinkan.
→ **Review 6.4:** unggah gagal sebagian ditangani dengan pesan jelas, berkas yatim (tanpa baris DB) tidak tertinggal.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 7 — INFORMASI LAYANAN
*Rujukan: Informasi Layanan (Butir 6 no. 7). Jenis layanan belum dirinci di proposal, jadi strukturnya harus fleksibel dan konten diisi pihak desa.*

**Tugas 7.1 — Skema.** Tabel `services`: `nama`, `deskripsi`, `persyaratan` (daftar), `prosedur` (daftar langkah), `biaya` (teks), `waktu_proses`, `jam_layanan`, `penanggung_jawab`, `urutan`, `status`.
→ **Review 7.1:** struktur cukup generik untuk berbagai jenis layanan tanpa mengarang jenis layanan.

**Tugas 7.2 — Halaman `/layanan`.** Daftar layanan dengan akordeon (animasi tinggi halus), persyaratan dan prosedur sebagai daftar bernomor, ringkasan jam layanan di atas.
→ **Review 7.2:** akordeon ramah keyboard dan pembaca layar (`aria-expanded`, `aria-controls`).

**Tugas 7.3 — CRUD admin** dengan editor daftar dinamis (tambah/hapus/urutkan baris persyaratan dan langkah).
→ **Review 7.3:** daftar kosong ditolak atau ditangani, urutan tersimpan.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 8 — LOKASI DESA
*Rujukan: Lokasi Desa (Butir 6 no. 8). Koordinat belum ada di `.md`.*

**Tugas 8.1 — Data lokasi.** Pakai `alamat`, `lat`, `lng` di `site_settings`. Koordinat boleh kosong sampai admin mengisi.
→ **Review 8.1:** validasi rentang lat (−90..90) dan lng (−180..180).

**Tugas 8.2 — Halaman `/lokasi`.** Blok alamat lengkap (desa, kecamatan, kabupaten, provinsi), peta tertanam tanpa API key berbayar (embed OpenStreetMap atau Leaflet), dan tautan "Buka di aplikasi peta". Bila koordinat kosong, tampilkan *empty state* yang jelas, bukan peta kosong.
→ **Review 8.2:** peta tidak merusak layout mobile, iframe punya `title`, pemuatan malas (*lazy*).

**Tugas 8.3 — Admin:** input koordinat dengan petunjuk cara mendapatkannya.
→ **Review 8.3:** perubahan langsung tercermin di peta.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 9 — KONTAK
*Rujukan: Kontak (Butir 6 no. 9; kontak person ada di Butir 4 `.md`).*

**Tugas 9.1 — Halaman `/kontak` (informasi).** Nama kontak person, nomor telepon (tautan `tel:` dan WhatsApp), alamat, jam layanan, tautan sosial, semuanya dari `site_settings`.
→ **Review 9.1:** format nomor internasional benar, tautan bekerja di ponsel.

**Tugas 9.2 — *(Opsional, kerjakan hanya jika saya setuju)* Formulir pesan.** Tabel `contact_messages` (insert-only untuk anon, baca hanya admin), validasi zod, *honeypot* anti-spam, pembatasan laju sederhana.
→ **Review 9.2:** anon tidak bisa membaca pesan lain, tidak ada data pribadi yang bocor ke log.

**Tugas 9.3 — Admin: kotak masuk pesan** (bila 9.2 dikerjakan) dengan penanda sudah dibaca.
→ **Review 9.3:** hanya admin yang bisa mengakses.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 10 — TRANSPARANSI KEUANGAN / SUMBER DANA DESA
*Rujukan: Profil Mitra (Butir 3) dan Ringkasan di `.md`: informasi sumber pendanaan desa dan penggunaannya, datanya divalidasi pihak desa. Rincian jenis sumber dana belum ada di `.md`.*

**Penting:** fitur ini memuat data publik yang sensitif secara reputasi. **Jangan menampilkan angka karangan sebagai data asli.** Data contoh harus berlabel jelas dan bisa dimatikan dengan satu klik. Setiap data harus bisa menunjukkan status validasi.

**Tugas 10.1 — Skema.**
- `finance_years`: `tahun` (unik), `status`, `validated_at`, `validated_by` (teks), `catatan`.
- `finance_sources`: `year_id`, `jenis` (teks bebas dengan saran: Dana Desa, Alokasi Dana Desa, Pendapatan Asli Desa, Bagi Hasil Pajak/Retribusi, Bantuan Keuangan, Lain-lain), `uraian`, `jumlah` (numeric, rupiah).
- `finance_uses`: `year_id`, `bidang`, `uraian`, `anggaran`, `realisasi`.
- `finance_documents`: `year_id`, `judul`, `file_url` (PDF di bucket `finance-docs`).
→ **Review 10.1:** tipe uang memakai `numeric` (bukan float), RLS publik hanya untuk tahun berstatus `published`, `get_advisors` bersih.

**Tugas 10.2 — Halaman `/transparansi`.** Pilih tahun, tiga angka ringkasan (total pendapatan, total belanja, realisasi %), tabel sumber dana, tabel penggunaan per bidang, serta lencana "Divalidasi pemerintah desa pada <tanggal>" atau "Belum divalidasi".
→ **Review 10.2:** format Rupiah dan persentase benar, total dihitung dari data bukan diketik manual, tidak ada pembulatan yang menyesatkan.

**Tugas 10.3 — Visualisasi ringan.** Batang proporsi sumber dana dan serapan anggaran dengan SVG/CSS buatan sendiri (tanpa library chart berat), beserta tabel teks setara untuk aksesibilitas.
→ **Review 10.3:** grafik terbaca tanpa warna saja, ada alternatif teks, animasi hanya saat masuk viewport.

**Tugas 10.4 — Dokumen unduhan.** Daftar dokumen (misalnya APBDes dan laporan realisasi) berformat PDF dengan ukuran berkas dan tanggal.
→ **Review 10.4:** tautan unduh bekerja, tipe dan ukuran berkas dibatasi saat unggah.

**Tugas 10.5 — Admin.** CRUD per tahun, per sumber, per penggunaan, unggah dokumen, dan tombol "Tandai tervalidasi" yang mencatat tanggal dan nama validator. Perubahan data pada tahun yang sudah tervalidasi mereset status validasi.
→ **Review 10.5:** alur validasi diuji, riwayat perubahan penting (minimal `updated_at`) tercatat.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## FITUR 11 — BERANDA DAN INTEGRASI
Dikerjakan terakhir karena merangkum fitur lain.

**Tugas 11.1 — Beranda `/`.** Komposisi editorial: pernyataan identitas desa singkat, satu foto utama, tiga berita terbaru, kegiatan terdekat, tautan ke Transparansi, dan kontak. Bukan template "hero + tiga kartu ikon".
→ **Review 11.1:** semua konten dari data, urutan visual jelas, bobot halaman ringan.

**Tugas 11.2 — SEO dan berbagi.** `sitemap.xml`, `robots.txt`, metadata default dan OG per halaman, halaman 404 dan error yang rapi, favicon.
→ **Review 11.2:** semua rute publik ada di sitemap, halaman draft tidak terindeks.

**Tugas 11.3 — Performa dan aksesibilitas menyeluruh.** Jalankan Lighthouse (atau setara) pada halaman utama, perbaiki temuan penting.
→ **Review 11.3:** target skor ≥ 90 untuk Accessibility, Best Practices, dan SEO; Performance semaksimal mungkin di mobile. Catat angka aktual.

**Tugas 11.4 — Uji end-to-end lintas fitur.** Skenario Playwright untuk alur utama pengunjung (menjelajah semua menu) dan alur admin (login, buat berita, terbitkan, lihat di publik).
→ **Review 11.4:** semua lolos, uji gagal tidak dimatikan begitu saja.

**Tugas 11.5 — Dokumentasi serah terima.** `README.md` (cara menjalankan, variabel lingkungan, struktur), `docs/PANDUAN_ADMIN.md` (langkah praktis mengelola konten untuk perangkat desa, bahasa sederhana, urut per menu), dan catatan deploy (misalnya Vercel + Supabase).
→ **Review 11.5:** orang yang belum pernah melihat project bisa menjalankannya dari README saja.

Lanjutkan ke **TESTING → EVALUASI → REVISI → LAPOR**.

---

## PENUTUP

Setelah semua fitur selesai, buat `docs/RINGKASAN_AKHIR.md` yang memuat:
1. Daftar fitur dan statusnya (Lulus / Isu terbuka).
2. Rekap hasil testing dan evaluasi per fitur (tautan ke dokumen di `docs/`).
3. Daftar data yang **masih harus diisi atau diverifikasi pihak desa** (kecamatan, jenis layanan, data demografi dan potensi, koordinat, sumber dan penggunaan dana desa, foto).
4. Rekomendasi tindak lanjut.

**Mulai sekarang dari FASE 0.** Jangan melompat ke fase berikutnya sebelum fase sebelumnya selesai dan saya konfirmasi.
