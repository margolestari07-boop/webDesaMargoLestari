# Prompt Lanjutan Proyek — Website Desa Margo Lestari

> Salin seluruh isi prompt ini ke AI coding agent pada perangkat lain setelah proyek tersedia di sana.

---

## Peran dan tujuan

Kamu adalah coding agent yang melanjutkan website publik Desa Margo Lestari di repository ini. Lanjutkan pekerjaan yang sudah ada; jangan membuat ulang scaffold atau mengganti arah desain. Kamu diizinkan membuat/mengedit kode dan menginstal dependency yang diperlukan, tetapi **jangan mengerjakan integrasi Supabase dahulu**.

Baca instruksi repository `AGENTS.md` terlebih dahulu, lalu baca dokumen status dan sumber yang disebut di bawah. Ikuti petunjuk versi Next.js yang terpasang. Jika dokumentasi lokal Next.js yang diwajibkan `AGENTS.md` tidak ada di `node_modules/next/dist/docs/`, jangan mengasumsikan API dari ingatan: periksa panduan resmi Next.js yang cocok dengan versi terpasang atau nyatakan keterbatasannya.

## Status proyek saat dipindahkan

- Stack di mesin sebelumnya: Next.js `16.3.8`, React `19.2.8`, TypeScript, Tailwind CSS 4, Node.js `v24.12.0`, npm `11.6.2`.
- Fondasi UI publik, halaman `/`, `/profil`, dan `/sejarah` telah dibuat.
- `/profil` menandai Kecamatan Tanjung Bintang sebagai perlu diverifikasi karena sumber lain menyebut Jati Agung; visi, misi, narasi, dan foto yang belum tersedia tidak direkayasa.
- `/sejarah` memuat dua fakta sejarah dari proposal saja. Label “Sebelum 1986” menunjukkan urutan sebelum peristiwa yang bertanggal; tidak ada tahun spesifik yang diciptakan untuk asal-usulnya.
- Implementasi lokal yang relevan ada di `src/app/`, `src/data/`, `src/components/`, `src/app/globals.css`, `scripts/smoke-check.mjs`, dan `tests/e2e/`.
- `docs/CHECKLIST_IMPLEMENTASI.md`, `docs/PROGRESS.md`, `docs/testing/`, dan `docs/evaluasi/` adalah catatan status aktual. `plan1.md` berisi rencana dan batas pekerjaan.
- Validasi terakhir untuk fitur sejarah: `npm run format`, `npm run lint`, `npm run typecheck`, `npm run build`, dan `npm run test:smoke` lulus. Smoke test meliputi `/`, `/profil`, dan `/sejarah`.
- E2E Playwright **belum berhasil dijalankan**. Perangkat sebelumnya tidak memiliki Chromium (`chrome-headless-shell`); `npm run test:e2e` berhenti saat meluncurkan browser sebelum assertion aplikasi. Jangan menyebutnya lulus. Coba ulang hanya jika browser tersedia pada perangkat baru.
- Repository lokal sebelumnya belum memiliki commit. Periksa status Git sebelum mengubah apa pun dan jangan commit kecuali diminta.

## Sumber yang harus dibaca

1. `PROMPT_Build_Website_Desa_Margo_Lestari.md` — terutama bagian **FITUR 3 — POTENSI DESA** dan alur review/testing/evaluasinya.
2. `Analisis_Proposal_Website_Desa_Margo_Lestari.md` — sumber fakta proyek dan batas data yang benar-benar tersedia.
3. `plan1.md`, `docs/PROGRESS.md`, dan `docs/CHECKLIST_IMPLEMENTASI.md` — status, keputusan, dan urutan kerja.
4. `docs/testing/02-sejarah.md` serta `docs/evaluasi/02-sejarah.md` — pola dokumentasi checkpoint fitur terakhir.
5. Skills lokal bila tersedia: `.agents/skills/ui-ux-pro-max/` dan `.agents/skills/vercel-react-best-practices/`. Terapkan aturan yang relevan; Server Components adalah default untuk halaman konten statis.

Jika skills tidak ada pada salinan repository, jangan menganggapnya terpasang. Lanjutkan dengan konvensi kode dan keputusan desain yang telah didokumentasikan, tanpa mengunduh atau memasang skill kecuali diminta.

## Batas fakta dan backend — wajib dipatuhi

- Informasi potensi spesifik (misalnya pertanian, UMKM, produk, angka, atau kategori) **belum tersedia/terverifikasi** dalam dokumen proyek. Jangan mengarang atau menyajikan contoh sebagai fakta Desa Margo Lestari.
- Bila belum ada materi resmi, halaman `/potensi` harus menyatakan dengan jelas bahwa informasi potensi belum tersedia/menunggu konfirmasi. Jangan membuat kartu potensi contoh atau filter kategori kosong yang tidak berguna.
- Jangan menambahkan foto stok/AI seolah-olah dokumentasi desa, angka demografi/keuangan, atau klaim promosi tanpa sumber.
- Kecamatan Tanjung Bintang/Jati Agung tetap perlu diverifikasi. Kontak yang tercantum di proposal perlu dikonfirmasi keakuratan dan izin publikasinya sebelum ditampilkan.
- Atas permintaan pengguna, **Supabase tetap di luar cakupan**: jangan pasang SDK, akses MCP/project, meminta/menulis kredensial, membuat schema/migration/RLS/storage/auth, atau menambah operasi tulis/persistensi/admin CRUD.
- Data presentasional lokal bertipe hanya boleh dipakai jika diperlukan, dengan keadaan kosong yang eksplisit dan tidak menyerupai data desa terverifikasi. Jangan menyebut data lokal sebagai seed database.

## Checkpoint berikutnya: Fitur 3 — Potensi Desa

Mulai dari fitur yang belum dikerjakan, yaitu **Potensi Desa**, bukan mengulang fitur fondasi/profil/sejarah. Ikuti rincian Fitur 3 pada prompt proyek, tetapi hormati penundaan backend di atas:

- Kerjakan halaman publik `/potensi` dengan gaya editorial, responsif, dan konsisten dengan halaman yang sudah ada.
- Karena belum ada materi potensi yang terverifikasi, gunakan empty state informatif; jangan membuat kategori, ringkasan, detail, atau gambar fiktif.
- Daftar/filter kategori hanya dibuat bila ada data resmi yang mendukungnya. Jangan membuat kontrol yang tidak memiliki fungsi atau daftar kosong dekoratif.
- Jika halaman detail `/potensi/[slug]` dibangun tanpa entri, slug yang tidak dikenal harus berakhir pada 404 yang rapi. Jangan menambahkan konten dummy hanya untuk membuat detail terlihat berisi.
- Tugas schema `potentials` dan CRUD/admin/upload cover dari prompt tetap ditunda karena memerlukan Supabase.
- Gunakan `next/image` bila nanti ada gambar resmi. Konten Markdown kelak harus disanitasi bila memang ada sumber konten dan implementasinya disetujui.
- Ikuti aksesibilitas, fokus keyboard, semantik, kontras, reduced motion, ukuran sentuh, dan aturan performa skills yang tersedia. Hindari pola kartu generik berikon.

## Siklus kerja wajib

1. Periksa `git status`, struktur proyek, scripts/dependencies yang tersedia, serta dokumen sumber/status. Jangan menimpa atau menghapus pekerjaan yang sudah ada.
2. Tinjau bagian yang relevan dari dua skill lokal dan prompt Fitur 3.
3. Implementasikan hanya Fitur 3 dan cakupan publik yang bisa dikerjakan tanpa data/backend; tidak perlu mengubah desain global tanpa alasan.
4. Tambahkan/ubah test black-box yang sesuai (terutama HTTP smoke check; tambahkan skenario Playwright bila sesuai, meski eksekusi browser mungkin terhalang).
5. Lakukan review isi terhadap sumber, lalu jalankan `npm run format`, `npm run lint`, `npm run typecheck`, `npm run build`, dan `npm run test:smoke`. Jalankan `npm run test:e2e` bila dapat dilakukan; catat secara jujur jika browser tidak tersedia.
6. Evaluasi fungsi, ketepatan konten, desain, responsif, aksesibilitas, dan performa. Revisi maksimal tiga putaran sesuai instruksi prompt. Jangan mengklaim inspeksi visual/keyboard berhasil tanpa benar-benar menjalankannya.
7. Buat `docs/testing/03-potensi.md` dan `docs/evaluasi/03-potensi.md` dengan status aktual, bukti perintah, isu lingkungan, dan tindak lanjut.
8. Perbarui checklist, log/status pada `docs/PROGRESS.md`, dan status `plan1.md` agar sesuai implementasi sebenarnya. Jangan centang backend yang ditunda.
9. Di akhir, rangkum perubahan, pengujian yang lulus/gagal/terhalang, data yang masih perlu diverifikasi, dan file dokumentasi yang diperbarui. **Berhenti di checkpoint Fitur 3 dan tunggu konfirmasi pengguna sebelum melanjutkan ke Fitur 4 — Kegiatan Desa.**

Mulai dengan membaca dokumen dan keadaan repo. Jangan menganggap isi handoff ini lebih baru daripada kode atau dokumen status: bila ada perbedaan, periksa sumbernya dan laporkan sebelum membuat asumsi.
