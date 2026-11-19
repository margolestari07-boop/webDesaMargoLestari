# Rencana Dinamisasi Konten Website Desa Margo Lestari

**Status:** implementasi disetujui; login admin memakai email + password Supabase Auth, dengan pengelolaan kredensial sendiri. Belum ada schema, migration, route, atau UI fitur dinamis yang dibuat.

## 1. Tujuan dan batas pekerjaan

Membuat konten yang sering berubah pada empat area publik dapat dikelola admin dengan aman dan jelas:

1. Beranda
2. Profil Desa
3. Kependudukan
4. APBDes

Konten hanya tampil di website setelah dipublikasikan. Data yang belum disahkan tetap kosong/draf dan tidak boleh diganti dengan angka atau narasi tebakan. File referensi maupun konten publik yang sudah ada tidak dihapus oleh rencana ini.

**Tidak termasuk:** membuat halaman publik baru, mengisi data desa tanpa sumber, merombak desain website publik, mengunggah data contoh sebagai data resmi, atau menerapkan perubahan autentikasi/role sebelum pilihan login dan kebijakan akun disetujui.

## 2. Kondisi proyek yang diperiksa

- Stack: Next.js 16.3.8 App Router, TypeScript, Tailwind CSS 4, Supabase.
- Area admin terlindungi memakai `requireAdmin`; rute yang ada mencakup `/admin`, `/admin/pengaturan`, dan `/admin/login`. Login saat ini memakai Supabase Auth email/password melalui `signInWithPassword`, lalu memeriksa keanggotaan aktif di `admin_users`.
- `requireAdmin` dipanggil oleh layout terlindungi dan server actions. Rencana gerbang login berlaku hanya untuk `/admin/*`; route publik tidak perlu login. Otorisasi server tetap harus dijalankan untuk setiap request/aksi terlindungi, bukan hanya mengandalkan pemeriksaan visual di browser.
- `/admin` saat ini hanya ringkasan dan tautan ke pengaturan. Pengaturan situs memakai form dengan status draf/terbit.
- Migration yang diperiksa mendefinisikan `site_settings`, `admin_users`, trigger waktu perubahan, dan RLS admin/publikasi. Belum ada schema CRUD untuk konten empat area tersebut.
- Ada komponen UI dasar yang dapat dipakai ulang: Button, Badge, Container, EmptyState, FieldError, Input, Label, SectionHeading, Select, Table, dan Textarea. `Reveal`/`Stagger` tersedia untuk UI yang memerlukan animasi.
- Data publik yang terlihat saat ini sebagian masih statis. Nilainya tidak dianggap sebagai data resmi sampai sumber dan persetujuan dikonfirmasi.
- Pemeriksaan schema database live belum berhasil karena autentikasi akun baca Supabase gagal. Rancangan ini hanya mengacu pada migration yang ada di repository; schema live perlu dibandingkan sebelum migration baru.
- File `plan1.md` adalah dokumen terpisah dan harus tetap dipertahankan.

## 3. Prinsip desain dan acuan TailAdmin

Gunakan TailAdmin sebagai **acuan pola dashboard** (sidebar bertingkat, header kerja, kartu ringkasan, tabel, form, status, dan layout responsif), bukan sebagai alasan mengganti stack, menyalin seluruh template, atau menambah dependency. Implementasi mengikuti Tailwind dan komponen proyek yang sudah ada; dependency baru tidak direncanakan.

Prinsip UX:

- **Navigasi berdasarkan area website:** admin berpikir dalam istilah halaman publik yang ia kelola.
- **Pengelompokan bertahap:** form panjang dibagi menjadi bagian yang dapat dipindai, bukan satu form padat.
- **Draf aman:** simpan draf tidak mengubah tampilan publik; aksi terbitkan terpisah dan jelas.
- **Sumber dan waktu terlihat:** statistik dan laporan menunjukkan sumber, tanggal data, status verifikasi, dan periode.
- **Tidak ada angka diam-diam:** field kosong ditandai “Belum diisi”/“Perlu verifikasi”; ringkasan dan grafik tidak membuat nilai.
- **Pratinjau sebelum terbit:** admin dapat memeriksa tampilan konten pada halaman publik sebelum mengonfirmasi publikasi.
- **Aksesibel dan responsif:** label form tetap terlihat, error dekat dengan field, navigasi keyboard/fokus jelas, tabel dapat dipakai di layar sempit, status tidak hanya dibedakan dengan warna.

### Struktur navigasi admin yang diusulkan

- **Ringkasan** — status publikasi, draf yang belum terbit, data yang belum lengkap, dan pintasan pekerjaan.
- **Beranda** — Struktur organisasi; Ringkasan kependudukan; Bantuan administrasi; Galeri/dokumentasi.
- **Profil Desa** — Sejarah; Batas dan luas wilayah; Bagan struktur; Dokumen desa.
- **Kependudukan** — Laporan/periode; Demografi; Penggunaan wilayah; Pekerjaan.
- **APBDes** — Tahun dan tahap anggaran; Realisasi; Penyerapan belanja; Sumber pendapatan.
- **Akun & keamanan** — email login dan kata sandi akun admin yang sedang masuk; perubahan kredensial hanya untuk akun sendiri dan tidak mengubah kredensial admin lain.
- **Pengaturan situs** — tetap menjadi lokasi identitas/kontak umum yang memang bersifat lintas halaman.

Struktur organisasi yang ditampilkan di Beranda dan Profil Desa sebaiknya memakai **satu sumber data admin** agar dua salinan tidak berbeda. Kedua halaman boleh memiliki presentasi berbeda, tetapi satu pengelolaan perangkat desa.

## 4. Pemetaan data ke halaman dan pengalaman edit

| Area admin | Data yang dapat dikelola | UX yang disarankan |
| --- | --- | --- |
| Beranda | Nama/jabatan struktur organisasi; ringkasan penduduk/KK/wilayah/jam layanan; nomor bantuan administrasi; media galeri/dokumentasi | Kartu status dan form terpisah. Statistik mengambil laporan Kependudukan yang dipilih/terbit, bukan input salinan tanpa sumber. Galeri berupa daftar media dengan urutan, judul, teks alternatif, dan status publikasi. |
| Profil Desa | Sejarah; bagan struktur; batas utara/selatan/barat/timur; luas; jumlah penduduk; jarak ke ibu kota; dokumen | Editor sejarah; field arah batas; field besaran beserta satuan; pengelola struktur bersama; daftar dokumen dengan jenis, deskripsi, dan status. |
| Kependudukan | Sumber dan tanggal pembaruan; jumlah penduduk, KK, laki-laki/perempuan, usia produktif; luas dan penggunaan wilayah; pekerjaan | Laporan memiliki periode/snapshot sendiri. Validasi total, satuan, sumber, dan tanggal; kategori penggunaan lahan/pekerjaan dapat ditambah, diubah, diurutkan, atau dihapus di dalam draf. |
| APBDes | Realisasi operasional desa dan pembiayaan desa; bidang penyerapan belanja; sumber pendapatan | Laporan per tahun dan tahap; input terstruktur untuk pagu/realisasi bila memang tersedia di sumber; total dihitung dari baris terkait jika definisi disetujui; simpan referensi dokumen sumber dan catatan verifikasi. |

### Alur kerja utama

1. Admin memilih salah satu area halaman di sidebar.
2. Ringkasan area menunjukkan versi terbit, draf terakhir, kelengkapan, dan sumber yang belum tersedia.
3. Admin mengedit satu subbagian dalam konteks versi draf. Daftar berulang (pejabat, kategori, dokumen, media) memiliki aksi tambah, edit, urutkan, dan hapus dengan konfirmasi untuk penghapusan.
4. Validasi sisi server menolak format tidak sah, nilai negatif yang tidak diperbolehkan, jumlah yang tidak konsisten, atau periode yang belum lengkap sesuai aturan yang disepakati.
5. Admin menyimpan draf, melihat pratinjau, lalu menerbitkan setelah pemeriksaan sumber/izin.
6. Sistem mencatat siapa, kapan, modul, dan versi yang berubah. Jika terjadi salah terbit, admin dapat memulihkan versi terdahulu sesuai kebijakan riwayat.

## 5. Rancangan schema database (usulan, belum diterapkan)

### 5.1 Strategi versi dan publikasi

Disarankan memakai satu **revisi per modul halaman** dengan tabel relasional untuk data berulang/angka. Dengan demikian perubahan satu halaman (termasuk baris daftar yang terkait) dapat disiapkan sebagai draf tanpa mencampur draf dengan konten publik.

- `content_sections`: katalog modul stabil, misalnya `home`, `profile`, `population`, `apbdes`; satu baris per modul.
- `content_revisions`: revisi per modul dengan nomor versi, status (`draft`, `published`, `archived`), pencatat, waktu dibuat/diterbitkan, catatan sumber/perubahan.
- Setiap tabel konten terstruktur memiliki `revision_id` FK ke `content_revisions`. Semua data anak untuk suatu halaman masuk ke revisi yang sama.
- Baris di `content_sections` menunjuk revisi terbit aktif. Penerbitan mengganti pointer tersebut dalam transaksi; publik hanya membaca revisi yang ditunjuk.
- Revisi yang sudah terbit tidak diedit langsung. Perubahan berikutnya membuat draf baru dari versi terbit.

Publikasi satu halaman harus atomik, termasuk baris anak. Implementasi sebaiknya menyediakan operasi server/RPC bertransaksi untuk validasi dan pergantian versi aktif. Hindari `jsonb` sebagai satu-satunya penyimpanan seluruh isi: angka, kategori, satuan, dan baris laporan memerlukan validasi dan query yang jelas. `jsonb` hanya dipakai untuk metadata yang benar-benar fleksibel bila dibutuhkan.

### 5.2 Entitas dan relasi yang direncanakan

Nama/kolom berikut adalah rancangan awal; tipe, constraint, indeks, trigger, kebijakan retensi, dan aturan migrasi final menunggu keputusan serta pemeriksaan schema live.

| Tabel usulan | Isi dan relasi penting |
| --- | --- |
| `content_sections` | `id`, `key` unik, `label`, `published_revision_id` nullable, timestamps. Pointer publik hanya boleh menunjuk revisi dari section yang sama dan berstatus terbit. |
| `content_revisions` | `id`, `section_id`, `revision_no`, `status`, `created_by` FK admin, `created_at`, `published_at`, `source_note`, `change_note`. Unik per `(section_id, revision_no)`. Status dibatasi enum/check. |
| `village_officers` | `id`, `revision_id`, `parent_id` nullable untuk hierarki, nama, jabatan, deskripsi/tugas opsional, urutan, foto opsional, status aktif pada revisi. Satu revisi dapat dipakai untuk tampilan Beranda dan Profil. |
| `home_content` | Satu baris per revisi Beranda untuk teks/opsi yang memang perlu dikelola. Nomor bantuan ditautkan ke kontak pengaturan situs jika diputuskan sebagai satu nilai bersama, bukan diduplikasi tanpa alasan. |
| `profile_content` | Satu baris per revisi Profil: bentuk narasi sejarah (setelah diputuskan), luas wilayah dan satuan, jumlah/jarak ke ibu kota beserta satuan, serta catatan sumber. Jika sejarah dipilih sebagai linimasa, gunakan baris anak tersendiri. |
| `profile_boundaries` | Satu baris per arah (`north`, `south`, `east`, `west`) per revisi Profil, label/narasi batas, urutan tetap, dan sumber bila berbeda. Constraint mencegah arah ganda dalam revisi yang sama. |
| `village_documents` | Metadata dokumen yang dipakai oleh revisi Profil: judul, jenis, deskripsi, `storage_path`, MIME/ukuran opsional, teks alternatif bila relevan, urutan, status/izin publik. Objek file berada di Supabase Storage, bukan byte di Postgres. |
| `media_assets` | Metadata file unggahan (bucket/path unik, MIME, byte, checksum opsional, alt text, uploader, timestamps). Aset dapat dipakai sebagai galeri/dokumentasi; setiap penempatan/urutan publikasi dikelola oleh baris yang terikat revisi. |
| `home_gallery_items` | Relasi media ke revisi Beranda: `revision_id`, `media_asset_id`, judul/caption, urutan, alt override jika dibutuhkan. Aset yang belum terbit tidak terlihat publik. |
| `population_reports` | Satu laporan per revisi Kependudukan: periode/tanggal berlaku, label dan referensi sumber, waktu data terakhir diperbarui, total penduduk, KK, laki-laki, perempuan, usia produktif, luas wilayah dan satuan. Nilai nullable sampai diverifikasi. |
| `population_area_uses` | Baris penggunaan wilayah pada laporan: kategori, luas/nilai, satuan, urutan, catatan sumber. Constraint nilai dan keunikan kategori sesuai keputusan. |
| `population_occupations` | Baris pekerjaan pada laporan: nama kategori, jumlah opsional (jika bersumber), urutan. Jangan menyimpulkan jumlah dari kategori. |
| `apbdes_reports` | Satu laporan per revisi APBDes: tahun anggaran, tahap/periode laporan, tanggal, sumber dokumen, catatan, dan aturan publikasi yang disetujui. Hindari mengasumsikan jenis tahap. |
| `apbdes_realizations` | Nilai terstruktur untuk jenis realisasi yang disepakati, termasuk operasional desa/pembiayaan desa; kolom nilai, label, mata uang (Rupiah), dan definisi pagu/realisasi ditetapkan setelah sumber contoh ditinjau. |
| `apbdes_spending_fields` | Baris bidang penyerapan belanja per laporan: nama bidang, pagu, realisasi, urutan, referensi/keterangan sumber; jumlah dapat nullable jika dokumen tidak menyediakan. |
| `apbdes_revenue_sources` | Baris sumber pendapatan per laporan: nama sumber, nilai/pagu/realisasi sesuai format data resmi, urutan, keterangan dan sumber. Tidak membuat kategori atau angka default sebagai fakta. |
| `content_audit_events` | Audit append-only untuk aksi penting: actor admin, modul, revisi, aksi, timestamp, ringkasan; tidak menyimpan rahasia/kredensial. Apakah perlu audit rinci tiap perubahan field perlu disepakati. |

### 5.3 Hubungan dengan schema yang sudah ada

- Pertahankan `site_settings` sebagai sumber identitas dan kontak umum yang sudah ada; jangan membuat ulang pengaturan desa di tabel konten tanpa kebutuhan.
- Gunakan `admin_users` dan pemeriksaan admin yang sudah tersedia sebagai dasar otorisasi awal. Skema sekarang hanya mencatat `is_active`, belum membedakan peran.
- Rancangan revisi baru memerlukan migration additive. Jangan mengubah atau menghapus tabel existing tanpa persetujuan dan rencana migrasi.
- Kebijakan RLS harus eksplisit: publik hanya `SELECT` konten pada revisi terbit aktif; admin terautentikasi/berwenang mengelola draf dan menerbitkan; upload hanya ke bucket/prefix yang diizinkan. Server Action/API tetap memeriksa hak admin—RLS bukan pengganti validasi server.
- Uji RLS untuk anon, user biasa, admin aktif, admin nonaktif, dan seluruh aksi terlarang sebelum data dinamis dipakai.

### 5.5 Gerbang login Supabase dan kredensial admin

- **Cakupan gerbang:** autentikasi hanya diminta saat membuka route `/admin/*`. Route publik seperti `/`, `/profil`, `/infografis`, dan `/infografis/apbdes` tetap dapat dibuka tanpa login. Route `/admin/login` menjadi satu-satunya route admin yang dapat dibuka sebelum autentikasi.
- **Otorisasi server:** semua halaman terlindungi, server actions, dan operasi baca/tulis admin tetap memanggil pemeriksaan sesi Supabase dan status admin aktif. Jika sesi tidak ada/tidak valid atau admin nonaktif, arahkan ke `/admin/login`; jangan melakukan gate global terhadap seluruh website.
- **Identifier login yang diputuskan:** admin masuk menggunakan **email + password** melalui Supabase Auth yang sudah digunakan proyek. Email adalah identifier akun admin, bukan username terpisah.
- **Pengelolaan kredensial sendiri:** sediakan halaman terlindungi (usulan `/admin/akun`) yang hanya mengubah email dan password milik user Supabase yang sedang aktif. Password diperbarui lewat Supabase Auth dan tidak pernah disimpan di tabel aplikasi, log, atau metadata. Perubahan email dilakukan melalui API/alur Supabase Auth dan mengikuti konfirmasi email yang dikonfigurasi. Minta verifikasi kredensial saat ini/re-autentikasi sebelum perubahan sensitif dan tampilkan hasil/error generik.
- **Schema akun:** gunakan relasi `admin_users.id` yang sudah terhubung ke `auth.users.id`; tidak perlu menambah kolom username untuk login. Email dan password tetap dikelola oleh Supabase Auth, bukan disalin ke `admin_users`.
- **Perubahan password:** gunakan API Supabase Auth untuk update password setelah sesi yang sah dan re-autentikasi/validasi yang disetujui. Jangan menyimpan hash atau password sendiri pada `admin_users`; pengelolaan credential/hashing tetap tanggung jawab Supabase Auth. Pertimbangkan notifikasi perubahan dan pencabutan sesi lain sesuai kemampuan/konfigurasi Auth.
- **Keamanan akun:** admin hanya dapat memperbarui email/password akun yang sedang aktif; status aktif, role, dan hak admin tidak boleh dapat dinaikkan sendiri. Pesan login gagal harus generik dan percobaan login perlu dibatasi/rate-limited.
- **Audit dan pemulihan:** catat waktu dan actor perubahan credential tanpa mencatat nilai password. Tentukan proses bootstrap dan pemulihan jika satu-satunya admin kehilangan akses; jangan menaruh credential awal/rahasia di source code atau seed publik.
- **Batas teknis:** jangan mengirim Supabase service-role key ke browser. Pertahankan alur Supabase Auth server-side/cookie yang sudah ada dan verifikasi konfigurasi konfirmasi email serta reset password sebelum peluncuran.

### 5.4 Sumber, satuan, dan integritas

- Setiap laporan Kependudukan/APBDes harus menyimpan sumber, periode/tanggal berlaku, dan waktu pencatatan. Dokumen sumber dapat dilampirkan bila disetujui.
- Nilai uang menggunakan tipe numerik tetap (bukan floating point), dalam Rupiah, dengan aturan pembulatan/format tampilan yang konsisten.
- Luas dan jarak wajib menyimpan satuan eksplisit. Jangan menganggap hektare/kilometer sebelum dikonfirmasi.
- Total laki-laki + perempuan hanya divalidasi terhadap total penduduk jika definisi dan cakupan datanya sama. Perbedaan tidak boleh diselesaikan dengan menyesuaikan angka otomatis; tampilkan error/peringatan untuk ditinjau.
- Statistik Beranda sebaiknya mengambil snapshot Kependudukan yang dipilih/terbit agar sumbernya konsisten; hubungan dan kebijakan stale-data menunggu keputusan.

## 6. Fase implementasi setelah rencana disetujui

### Fase 0 — Keputusan dan verifikasi

1. Jawab keputusan terbuka pada bagian 8 tentang verifikasi perubahan email/password, pencabutan sesi, dan pemulihan akun.
2. Cocokkan migration repository dengan schema Supabase live melalui akses yang sah; inventarisasi tabel, bucket, policy, auth configuration, dan data yang sudah ada.
3. Tentukan data resmi serta sumber dokumen yang diizinkan. Tandai field yang belum ada sebagai belum tersedia.
4. Review rancangan relasi, satuan, workflow, keamanan gerbang login, dan UX sebelum migration.

**Gerbang:** tidak membuat migration atau CRUD sebelum keputusan penting dan schema live diverifikasi.

### Fase 1 — Schema, keamanan, dan data access

1. Buat migration additive untuk content sections/revisions, struktur bersama, laporan, dan media metadata yang disetujui. Login email/password tetap dikelola Supabase Auth dan tidak memerlukan kolom username atau password baru pada `admin_users`.
2. Tambah constraints/indexes/triggers yang diperlukan dan policies RLS dengan prinsip least privilege, termasuk pembatasan edit profil akun sendiri.
3. Definisikan validasi server dengan schema bertipe dan operasi tertransaksikan untuk membuat draf/menerbitkan.
4. Pastikan `requireAdmin`/guard hanya melindungi route dan aksi `/admin/*`; publik tetap anonim. Semua Server Actions admin melakukan validasi sesi dan status admin di server.
5. Pertahankan login email/password Supabase Auth yang ada; implementasikan halaman perubahan email/password melalui Supabase Auth, tambahkan re-autentikasi dan batas percobaan bila tersedia, serta jangan mengekspos service-role key.
6. Siapkan repository/data access server-side; pastikan pengambilan publik hanya mengikuti pointer versi terbit.
7. Tambah test migration/RLS dan validasi tanpa memasukkan data desa rekaan.

### Fase 2 — Kerangka UX admin

1. Ubah kerangka protected admin menjadi dashboard dengan sidebar responsif dan navigasi terkelompok; pertahankan/sempurnakan login, `requireAdmin`, dan logout.
2. Buat dashboard ringkasan yang menampilkan status draf/terbit dan pekerjaan yang memerlukan sumber/verifikasi, tanpa membuat metrik palsu.
3. Tambah halaman akun pribadi untuk mengubah email dan password melalui Supabase Auth; jangan tampilkan/mengubah credential akun lain.
4. Tambah label/status, breadcrumbs, feedback sukses/error, empty state, konfirmasi penghapusan, serta navigasi keyboard.
5. Uji penggunaan desktop, tablet, dan mobile; gunakan komponen yang ada dan tambah primitive baru hanya bila diperlukan.

### Fase 3 — CRUD menurut prioritas

1. **Kependudukan:** laporan dengan sumber/tanggal, agregat dan daftar rincian; menjadi sumber ringkasan Beranda jika disepakati.
2. **Struktur organisasi bersama:** pengelolaan posisi/nama/hierarki serta urutan; render ke Beranda dan Profil dari satu sumber.
3. **Profil Desa:** sejarah, batas wilayah, luas/jarak, dokumen.
4. **APBDes:** laporan berdasarkan tahun/tahap, kategori dan sumber, validasi nilai, ringkasan realisasi.
5. **Beranda:** pengaturan ringkasan, kontak bantuan, dan kurasi galeri; tautan silang ke data kanonis yang sudah dikelola di modul lain.
6. Hubungkan komponen publik yang terkait hanya setelah data terbit tersedia; pertahankan empty state untuk konten yang tidak memiliki versi terbit.

Urutan ini usulan untuk mencegah statistik ganda, bukan keputusan final.

### Fase 4 — Media dan publikasi

1. Siapkan bucket/prefix Storage, batas jenis/ukuran file, validasi MIME, izin unggah/hapus, dan lifecycle file yang belum dipakai.
2. Buat pratinjau sebelum publikasi untuk konten/media yang relevan.
3. Sediakan riwayat revisi dan pemulihan sesuai kebijakan retensi yang disetujui.
4. Uji bahwa file privat/draf tidak bisa diakses publik dan file terbit dapat dilayani dengan benar.

### Fase 5 — Verifikasi dan serah terima

- Jalankan `npm run lint`, `npm run typecheck`, `npm run build`, dan `npm run test:smoke`; jalankan test RLS/E2E yang ditambahkan.
- Uji tiap area admin: load, validasi, simpan draf, reload, pratinjau, terbitkan, akses publik, batal/restore sesuai workflow.
- Uji akses kontrol dan link langsung bagi anon, user biasa, admin aktif/nonaktif.
- Periksa halaman publik `/`, `/profil`, `/infografis`, dan `/infografis/apbdes` yang menggunakan data tersebut; pastikan hanya membaca revisi terbit dan tidak memunculkan konten draf.
- Uji responsif, keyboard, label, fokus, error, kontras/status, format angka/tanggal, dan empty state.
- Dokumentasikan penggunaan admin, sumber data, pemulihan konten, dan keterbatasan yang masih ada.

## 7. Kriteria penerimaan

- Setiap field pada daftar kebutuhan memiliki editor admin yang jelas dan lokasi menu yang dapat ditemukan.
- Struktur organisasi tidak mempunyai dua sumber edit yang bisa saling bertentangan.
- Beranda dan Kependudukan memakai hubungan/snapshot yang disepakati; metadata sumber/tanggal dapat ditinjau admin.
- Angka, satuan, kategori dan dokumen hanya tampil jika berasal dari data yang diisi dan diterbitkan admin berwenang.
- Draf tidak terlihat pada route publik; publikasi satu modul bersifat atomik; riwayat dapat ditelusuri sesuai keputusan.
- Semua operasi tulis divalidasi dan dilindungi server-side serta RLS; file Storage mengikuti izin publikasi.
- Route publik tidak memerlukan login; route admin terlindungi dari server-side dan menolak sesi invalid/admin nonaktif.
- Admin masuk menggunakan email + password melalui Supabase Auth; admin dapat mengubah email/password akunnya sendiri melalui alur aman, password tidak tersimpan pada tabel aplikasi, dan admin tidak dapat mengubah akun orang lain.
- Admin dapat menyimpan/memuat ulang draf tanpa kehilangan data, memahami error, dan melihat status publikasi.
- Tidak ada data desa yang di-seed sebagai nilai resmi tanpa verifikasi dan persetujuan.
- Test dan build lulus atau kegagalan yang tidak terkait dicatat secara eksplisit.

## 8. Keputusan yang perlu Anda tetapkan sebelum implementasi

1. **Sumber dan validasi:** Apa sumber resmi untuk data penduduk, KK, jenis kelamin, usia produktif, pekerjaan, luas wilayah/penggunaan, sejarah, batas, jarak, serta APBDes? Siapa yang menyetujui data? Adakah berkas/dokumen contoh yang boleh dijadikan acuan? Data yang belum ada sebaiknya tetap kosong atau ditampilkan dengan label “Belum tersedia” setelah halaman mendukungnya?
2. **Satuan wilayah:** Luas/jarak menggunakan satuan apa (mis. ha/km)? Untuk penggunaan wilayah, apakah satuan dan kategori mengikuti format dokumen resmi yang sudah digunakan desa?
3. **Ringkasan Beranda:** Apakah jumlah penduduk/KK di Beranda harus selalu menggunakan laporan Kependudukan terbaru yang berstatus terbit, atau admin perlu memilih laporan tertentu/snapshot? Jika data laporan menjadi lama, apakah perlu peringatan atau menyembunyikan angka?
4. **Sejarah:** Apakah sejarah berupa satu narasi panjang, linimasa peristiwa, atau keduanya? Field apa yang wajib untuk satu peristiwa (tanggal/tahun, judul, uraian, foto/dokumen)?
5. **Struktur organisasi:** Field apa yang diperlukan untuk tiap perangkat (nama, jabatan, NIP/identitas, foto, masa jabatan, kontak, uraian tugas)? Apakah hierarki harus mendukung tingkat di bawah Kepala Dusun/RT? Apakah data yang sama memang harus tampil di Beranda dan Profil?
6. **Dokumen dan galeri:** Jenis dokumen apa yang diizinkan (PDF, gambar, lainnya), batas ukuran, dan apakah setiap dokumen dapat diunduh publik? Apakah galeri perlu video atau hanya foto? Siapa yang mengurus hak publikasi, caption, alt text, dan penghapusan media?
7. **APBDes (diputuskan):** Laporan dikelompokkan per tahun anggaran/periode. Baris belanja menyimpan pagu dan realisasi bila tersedia dari sumber; sumber pendapatan juga dicatat per laporan. Kategori, angka, dan dokumen tidak di-seed sebagai fakta dan harus mengikuti dokumen resmi.
8. **Kontak bantuan:** Apakah nomor bantuan administrasi sama dengan nomor `phone` pada `site_settings` dan kontak publik lain, atau perlu nomor terpisah? Pastikan nomor yang boleh dipublikasikan dan izin pemiliknya.
9. **Publikasi/persetujuan (diputuskan):** Hanya ada satu admin; admin aktif dapat menyimpan draf dan menerbitkan langsung. Publikasi terjadwal tidak direncanakan untuk tahap ini.
10. **Akun dan hak akses (diputuskan):** Sistem menggunakan satu admin tanpa pembagian role editor/pemeriksa/penerbit. Bootstrap/pemulihan akun tetap perlu ditetapkan sebelum akun produksi dibuat.
11. **Login admin:** Email + password telah dipilih sebagai kredensial login melalui Supabase Auth. Apakah perubahan email harus menunggu konfirmasi email baru sebelum berlaku?
12. **Perubahan credential:** Apakah admin wajib memasukkan password saat ini/re-login sebelum mengubah email atau password? Setelah password berubah, apakah sesi di perangkat lain harus dicabut?
13. **Pemulihan akun:** Apakah email akun login juga menjadi alamat reset password, dan siapa yang berwenang membantu jika satu-satunya admin kehilangan akses?
14. **Bootstrap dan hak akses akun:** Bagaimana admin pertama dibuat? Apakah admin boleh mengelola akun admin lain, atau hanya mengubah akun sendiri? Siapa yang boleh menambah/menonaktifkan akun?
15. **Audit dan pemulihan konten:** Berapa lama riwayat versi disimpan? Perlu log detail per field atau cukup snapshot revisi dengan nama admin/waktu/catatan? Siapa yang boleh memulihkan versi lama?
16. **Nama metrik dan format:** Konfirmasi format angka/tanggal publik (mis. pemisah ribuan, tanggal Indonesia) dan apakah nilai Rupiah ditampilkan bulat atau dapat memiliki desimal.

## 9. Hal yang belum dikerjakan

- Belum ada schema/migration, bucket Storage, halaman pengelolaan credential, route admin baru, form CRUD konten, atau perubahan data publik yang diimplementasikan.
- MCP berhasil dibaca, tetapi koneksinya hanya menampilkan `public.dummy_mcp_test` dan satu migration uji; tabel aplikasi `site_settings`, `admin_users`, serta fungsi `private.is_admin()` tidak ada. Pastikan MCP mengarah ke project Supabase website sebelum migration aplikasi diterapkan. `dummy_mcp_test` juga terdeteksi tanpa RLS.
- Belum ada sumber data resmi yang diserahkan untuk mengisi nilai demografi, wilayah, pekerjaan, maupun APBDes.
- Pemasangan skill eksternal `frontend-design` sebelumnya mengalami timeout saat clone; tidak dicoba ulang. Rencana UX menggunakan skill lokal `ui-ux-pro-max` dan referensi TailAdmin resmi yang diminta.
