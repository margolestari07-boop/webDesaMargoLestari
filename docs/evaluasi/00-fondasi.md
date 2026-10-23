# Evaluasi — Fitur 0: Fondasi

Tanggal: 2026-10-23

## Hasil review dan evaluasi

| Kriteria                         | Status                                | Bukti / catatan                                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fungsional                       | Perlu revisi                          | HTTP smoke membuktikan halaman login dan pengalihan anonim. Login valid/non-admin, penyimpanan pengaturan, serta efek publikasi belum diuji lewat akun nyata karena belum ada admin resmi. Implementasi code-path tersedia dan ditinjau.               |
| Kesesuaian dengan dokumen proyek | Lulus                                 | Data awal tetap bersumber pada proposal, status kecamatan dan kontak perlu diverifikasi, seed tetap draf, dan tidak ada nilai keuangan/konten sampel yang dikarang atau diterbitkan.                                                                   |
| UI dan arah desain               | Lulus pada pemeriksaan browser/source | Tema terang editorial memakai token warna, garis tipis, font editorial, label dan pesan form. Edge di 360/768/1280 px tidak menemukan overflow; review screenshot visual formal tetap terbatas.                                                        |
| Responsif 360/768/1280 px        | Lulus untuk layout dasar              | Playwright API dengan Edge mengunjungi `/`, `/profil`, `/sejarah`, dan `/admin/login` pada ketiga lebar tanpa horizontal overflow. Menu mobile terbuka pada 360 px.                                                                                    |
| Aksesibilitas dasar              | Lulus pada pengujian dasar            | Skip link menjadi fokus Tab pertama; halaman publik memiliki satu landmark `main`; navigasi mobile berlabel; login memiliki label input; reduced motion tidak menerapkan style motion pada main. Screen reader belum diuji.                            |
| Keamanan data                    | Perlu revisi operasional              | Migration Task 0.5 mengaktifkan RLS dan advisor security bersih; publik dibatasi pada status `published`, admin memerlukan membership aktif. Namun login nyata, akun non-admin, dan submit Server Action belum dapat diuji tanpa admin yang disetujui. |
| Performa                         | Lulus pada build                      | Halaman publik terprerender dengan revalidasi 5 menit; query identitas publik memakai cache tag 5 menit; halaman admin dinamis. Komponen klien hanya untuk navigasi, animasi terbatas, dan form interaktif.                                            |

## Revisi fitur

Review akhir menemukan landmark `<main>` bersarang karena `PublicLayout` membungkus `PageTransition`, yang juga merender `<main>`. Wrapper luar dihapus sehingga setiap halaman publik hanya memiliki satu landmark dan satu target skip link. Dua skenario E2E admin (login tanpa pendaftaran publik dan redirect anonim) ditambahkan. Setelah revisi, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:smoke`, dan `git diff --check` lulus.

E2E Chromium standar berhenti sebelum assertion karena executable browser tidak tersedia. Pengganti pemeriksaan browser menggunakan Edge berhasil untuk viewport, navigasi, skip link, reduced motion, dan redirect. Tidak ada revisi kode lebih lanjut yang dapat membuktikan alur autentikasi atau penulisan database tanpa akun resmi; hal tersebut dicatat sebagai isu operasional, bukan diasumsikan lulus.

## Isu terbuka dan tindak lanjut

1. Pemilik proyek/perangkat desa perlu menunjuk pengelola resmi dan membuat akun Auth serta membership `admin_users` menggunakan langkah di `docs/PANDUAN_ADMIN.md`.
2. Setelah akun dibuat, uji login sukses, kredensial gagal, akun non-admin, simpan draf, publikasi setelah verifikasi, dan revalidasi header/footer.
3. Jalankan ulang `npm run test:e2e` setelah Chromium Playwright tersedia; pengujian browser Edge saat ini hanya smoke test tambahan.
4. Kecamatan (Tanjung Bintang vs Jati Agung), keakuratan dan izin publikasi kontak, serta data identitas lain masih perlu persetujuan pihak desa sebelum status pengaturan menjadi `published`.

**Status fitur:** implementasi fondasi selesai; evaluasi teknis lulus sebagian dengan isu operasional terbuka pada verifikasi autentikasi/publikasi. Tunggu konfirmasi sebelum masuk fitur berikutnya.
