# Rencana 1 — Website Desa Margo Lestari

**Status:** implementasi bertahap; Fase 0, fondasi UI publik, dan Fitur 1 (Profil Desa) telah dikerjakan. Validasi browser/visual masih tertunda karena Chromium Playwright tidak tersedia.

## 1. Tujuan dan batas pekerjaan saat ini

Menyusun rencana pembangunan website resmi Desa Margo Lestari berdasarkan `PROMPT_Build_Website_Desa_Margo_Lestari.md` dan `Analisis_Proposal_Website_Desa_Margo_Lestari.md`.

Status pelaksanaan dan batas scope:

- Rencana awal hanya membuat `plan1.md`; setelah pengguna mengonfirmasi eksekusi, scaffold Next.js dan fondasi UI publik dibuat. Lihat `docs/PROGRESS.md` dan `docs/CHECKLIST_IMPLEMENTASI.md` untuk status aktual.
- Integrasi Supabase ditunda: tidak memeriksa atau memilih MCP/project, memasang SDK, membuat skema/migrasi, mengatur autentikasi, storage, RLS, CRUD persisten, atau meminta/menulis kredensial.
- Panel admin yang memerlukan autentikasi dan penyimpanan data ikut ditunda sampai pendekatan backend disetujui.
- Jika kelak diperlukan untuk merender UI sebelum Supabase tersedia, gunakan data lokal bertipe yang jelas sebagai contoh, bukan data desa terverifikasi. Untuk informasi yang belum tersedia gunakan empty state/placeholder; jangan membuat angka keuangan, demografi, potensi, atau layanan.
- Urutan pengerjaan tetap mengikuti siklus prompt: tugas kecil → review → testing/evaluasi/revisi per fitur → laporan → berhenti menunggu konfirmasi.

## 2. Pemahaman awal dari dokumen sumber

- Website menjadi pusat informasi online, publikasi inovasi digital, dan transparansi Desa Margo Lestari.
- Identitas yang tercantum: Desa Margo Lestari, Kabupaten Lampung Selatan, Provinsi Lampung. Dokumen mayoritas menyebut Kecamatan Tanjung Bintang, tetapi ada penyebutan Jati Agung yang harus diverifikasi.
- Riwayat yang tersedia: desa berasal dari pemekaran Gedung Meneng, Labuhan Ratu, Kecamatan Kedaton; Desa Persiapan Margo Lestari dibentuk pada 1986 di Kecamatan Tanjung Bintang.
- Fitur yang direncanakan: profil, sejarah, potensi, kegiatan, berita, galeri, layanan, lokasi, kontak, transparansi keuangan, dan beranda terpadu.
- Screening: data demografi dan potensi spesifik, rincian layanan, koordinat, sumber/penggunaan dana, serta kondisi media digital saat ini belum tersedia atau belum terverifikasi.
- Data kontak dalam proposal mencantumkan Kurniadi dan nomor `+62 821-1439-7667`; konfirmasi izin dan keakuratannya sebelum ditampilkan sebagai kontak publik.

## 3. Arah desain dan pedoman teknis

### Visual dan konten

- Ikuti arah desain eksplisit dalam prompt proyek: minimalis, editorial, tenang, terasa dibuat untuk desa; tema terang dengan latar putih gading, teks hampir hitam, teks sekunder abu hangat, garis tipis, dan satu aksen hijau tua yang membumi.
- Gunakan grid 12 kolom, ruang lega, ritme kelipatan 8 px, radius kecil, dan bayangan seminimal mungkin. Hindari gradien, glassmorphism, ornamen blob, bento berlebihan, serta pola generik “hero + tiga kartu ikon”.
- Tipografi yang direncanakan: serif editorial untuk judul dan sans-serif yang mudah dibaca untuk isi. Pilih pasangan final saat fondasi desain dikerjakan; muat melalui `next/font` dan cek pergeseran layout.
- Foto desa hanya digunakan setelah disediakan/divalidasi. Sebelum itu tampilkan placeholder netral yang diberi label; jangan menggantinya dengan foto stok atau gambar AI seolah-olah foto desa.
- Gunakan salinan Bahasa Indonesia yang spesifik, ringkas, dan bersumber. Jangan menulis slogan atau fakta yang tidak didukung dokumen.

### Penerapan dua skill

- **UI/UX Pro Max:** pencarian lokal menghasilkan rekomendasi aksesibilitas tinggi-kontras untuk layanan publik, fokus keyboard yang jelas, skip link, reduced motion, serta target sentuh sekitar 44×44 px. Rekomendasi pola “Minimal Single Column” dan warna navy/biru tidak diikuti secara literal karena tidak cocok dengan kebutuhan banyak halaman dan arah editorial/hijau yang ditetapkan prompt proyek. Pemeriksaan aksesibilitas skill tetap digunakan.
- **Vercel React Best Practices:** jadikan Server Components sebagai default; batasi Client Components pada interaksi yang memerlukannya. Hindari komponen didefinisikan di dalam komponen. Saat data server independen kelak tersedia, hindari waterfall dengan mengambilnya paralel. Tunda komponen berat yang tidak dibutuhkan saat render awal, misalnya lightbox galeri.
- **Next.js:** gunakan App Router, TypeScript, Tailwind, metadata per halaman, `next/image` dengan ukuran/layout responsif, dan render konten publik di server. Versi Next.js aktual harus diperiksa ketika project diinisiasi; hasil pencarian skill untuk Next.js bersifat panduan, bukan pengganti verifikasi dokumentasi versi terpasang.

## 4. Struktur halaman yang direncanakan

| Rute                               | Isi dan perlakuan data                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                | Beranda editorial, dikerjakan terakhir; identitas singkat, satu foto utama bila tersedia, berita terbaru, kegiatan mendatang, tautan transparansi, dan kontak. Hindari komposisi template generik.   |
| `/profil`                          | Identitas wilayah, pengantar, visi-misi, dan foto bila tersedia. Bagian yang belum memiliki data memakai empty state/label menunggu verifikasi.                                                      |
| `/sejarah`                         | Linimasa minimalis dengan hanya fakta yang tercantum di proposal, termasuk pembentukan Desa Persiapan pada 1986.                                                                                     |
| `/potensi` dan `/potensi/[slug]`   | Daftar dan detail editorial. Tidak mengarang kategori atau potensi; tampilkan empty state sampai materi divalidasi.                                                                                  |
| `/kegiatan` dan `/kegiatan/[slug]` | Kegiatan mendatang dan lampau, format tanggal Indonesia dan zona WIB, dengan empty state untuk masing-masing bagian.                                                                                 |
| `/berita` dan `/berita/[slug]`     | Daftar editorial berpaginasi dan detail berita; fitur draft/publikasi, penjadwalan, dan editor admin menunggu integrasi backend.                                                                     |
| `/galeri` dan `/galeri/[album]`    | Album dan foto dengan layout responsif; lightbox aksesibel, navigasi keyboard, fokus terkelola, dan penghormatan pada reduced motion.                                                                |
| `/layanan`                         | Daftar fleksibel dengan akordeon aksesibel. Jenis layanan dan isinya menunggu data resmi; jangan mengarang layanan.                                                                                  |
| `/lokasi`                          | Alamat dan peta OpenStreetMap tanpa API key berbayar hanya setelah alamat/koordinat dikonfirmasi. Jika koordinat belum tersedia, tampilkan empty state yang jelas.                                   |
| `/kontak`                          | Kontak, jam, alamat, dan tautan komunikasi setelah diverifikasi. Formulir pesan bersifat opsional dan tidak dikerjakan tanpa persetujuan eksplisit serta keputusan penyimpanan/anti-spam.            |
| `/transparansi`                    | Halaman publik untuk data dan dokumen yang telah divalidasi desa. Jangan tampilkan angka contoh seolah data asli; jika belum ada data tervalidasi, tampilkan status belum tersedia/belum divalidasi. |
| `/admin/*`                         | Tidak dibangun pada tahap tanpa Supabase karena autentikasi dan penyimpanan aman belum tersedia. Rencanakan ulang setelah integrasi disepakati.                                                      |

## 5. Tahapan pengerjaan setelah rencana disetujui

### Tahap A — Fase 0: validasi pemahaman

1. Pertahankan dua dokumen sumber dan catat sumber data yang boleh dipublikasikan.
2. Tulis ringkasan pemahaman dan screening maksimal 15 baris ke `docs/PROGRESS.md` saat implementasi dimulai, sesuai prompt asli.
3. Laporkan ringkasan kepada pengguna dan **berhenti menunggu konfirmasi**. Belum melakukan inisiasi Next.js pada tahap ini.

### Tahap B — Fondasi project dan UI publik (tanpa Supabase)

**Status: dikerjakan.** Next.js 16.3.8 diinisiasi di root setelah checkpoint Fase 0 disetujui. Dokumen sumber dan `.agents/skills` dipertahankan. Fondasi visual publik mencakup token desain/font, komponen dasar, animasi reduced-motion, layout, navigasi mobile, dan footer. Client/skema/auth Supabase, admin, pengaturan persisten, serta dependency Supabase tetap ditunda. Review browser masih terbuka karena Chromium Playwright gagal diunduh; detail ada di `docs/testing/00-fondasi.md`.

### Tahap C — Halaman publik per fitur

Ikuti urutan fitur pada prompt, satu tugas dalam satu waktu:

1. **Profil desa — implementasi selesai, validasi browser parsial:** halaman dan struktur konten presentasional dibuat; kecamatan ditandai untuk verifikasi dan bagian yang belum memiliki data memakai empty state. Catatan testing/evaluasi: `docs/testing/01-profil.md` dan `docs/evaluasi/01-profil.md`.
2. **Sejarah — UI selesai, validasi browser parsial:** linimasa `/sejarah` memuat dua peristiwa dari proposal saja. Data lokal sementara; tabel/seed Supabase dan CRUD ditunda. Review/testing/evaluasi: `docs/testing/02-sejarah.md` dan `docs/evaluasi/02-sejarah.md`.
3. **Potensi:** daftar/detail dan filter hanya jika materi tersedia.
4. **Kegiatan:** tampilan mendatang/lampau dan detail.
5. **Berita:** daftar, detail, metadata berbagi; backend/editor admin ditunda.
6. **Galeri:** halaman album/foto dan lightbox aksesibel; penggunaan foto menunggu materi desa.
7. **Layanan:** struktur informasi generik dengan empty state.
8. **Lokasi:** alamat/peta/tautan aplikasi peta hanya berdasarkan data terverifikasi.
9. **Kontak:** informasi kontak terverifikasi; formulir pesan menunggu persetujuan tersendiri.
10. **Transparansi:** tampilan publik dan status validasi; tanpa data finansial palsu.
11. **Beranda dan integrasi:** rangkum halaman publik setelah komponen/fitur tersedia, lalu SEO, 404/error, sitemap, dan robots.

Setelah setiap fitur selesai, lakukan testing black-box, evaluasi, revisi maksimal tiga putaran, dan laporan. Berhenti di akhir fitur sampai pengguna menyetujui fitur berikutnya. CRUD, jadwal terbit, upload, validasi admin, dan persistensi data tetap ditunda bersama Supabase.

### Tahap D — Verifikasi dan serah terima

- Jalankan lint, typecheck, dan build sesuai skrip yang tersedia; catat hasil aktual tanpa mengklaim tes yang tidak dijalankan.
- Uji alur halaman dan tautan secara black-box; tambahkan Playwright/E2E bila cakupan dan konfigurasi project sudah siap.
- Uji responsif pada ukuran wajib prompt: 360 px, 768 px, dan 1280 px; lakukan pemeriksaan tambahan pada 375 px, 1024 px, dan 1440 px.
- Audit kontras teks, fokus keyboard, label/semantik, alt gambar, skip link, kontrol keyboard, target sentuh, reduced motion, dan layout tanpa horizontal scroll.
- Tinjau performa: Server Components untuk konten statis, Client Components seminimal mungkin, gambar dengan ukuran jelas/lazy loading yang sesuai, serta pemuatan tertunda untuk komponen berat.
- Dokumentasi testing/evaluasi dan README/panduan admin diselesaikan sesuai kondisi implementasi. Panduan admin final menunggu admin/backend nyata agar tidak menjanjikan fungsi yang belum tersedia.

## 6. Checkpoint yang perlu dipertahankan

- Tidak melompati konfirmasi setelah Fase 0 maupun setelah setiap fitur.
- Kecamatan default per prompt adalah **Tanjung Bintang**, tetapi statusnya tetap perlu diverifikasi karena dokumen lain menyebut **Jati Agung**.
- Konten profil, demografi, potensi, kegiatan, layanan, lokasi, dan keuangan harus menunggu data desa; penanda contoh tidak boleh menyerupai klaim resmi.
- Formulir pesan hanya dikerjakan jika disetujui; angka transparansi hanya dipublikasikan setelah divalidasi.
- Integrasi Supabase, MCP, skema, RLS, storage, akun admin, dan semua operasi tulis tetap berada di luar cakupan tahap ini sampai diminta kembali.

## 7. Status tindakan

Rencana ini disusun dari prompt proyek, analisis proposal, dan skill lokal `ui-ux-pro-max` serta `vercel-react-best-practices`. Fase 0, fondasi Next.js/UI publik, dan Fitur 1 (Profil Desa) telah dikerjakan. Review/evaluasi fondasi ada di `docs/testing/00-fondasi.md` dan `docs/evaluasi/00-fondasi.md`; Fitur 1 di `docs/testing/01-profil.md` dan `docs/evaluasi/01-profil.md`. Checklist aktual ada di `docs/CHECKLIST_IMPLEMENTASI.md`. Implementasi berikutnya adalah Potensi Desa dan menunggu checkpoint pengguna.
