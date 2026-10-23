# Panduan Admin Desa Margo Lestari

## 1. Persiapan akses

1. Pengelola harus memiliki akun email dan kata sandi di Supabase Auth.
2. Akun hanya dapat masuk jika UUID-nya tercatat sebagai admin aktif pada tabel `public.admin_users`.
3. Jangan membuat halaman pendaftaran publik. Akun admin pertama dibuat oleh pemilik proyek melalui Supabase Dashboard.

## 2. Mendaftarkan admin pertama

1. Di Supabase Dashboard proyek Desa Margo Lestari, buka **Authentication → Users** lalu tambahkan pengguna dengan email yang disetujui pemerintah desa. Atur kata sandi secara aman dan sampaikan kepada pengelola melalui saluran terpisah.
2. Buka **SQL Editor** dan jalankan query berikut. Ganti alamat email dan nama pengelola dengan nilai yang benar; jangan menebak UUID pengguna.

   ```sql
   insert into public.admin_users (id, display_name, is_active)
   select id, 'Nama Pengelola', true
   from auth.users
   where email = 'email-admin-yang-telah-dibuat'
   on conflict (id) do update
   set display_name = excluded.display_name,
       is_active = true;
   ```

3. Pastikan query menyisipkan atau memperbarui satu baris. Jika tidak ada baris yang cocok, periksa kembali email pada Auth Users.
4. Buka `/admin/login`, lalu masuk menggunakan email dan kata sandi tersebut. Tidak ada pendaftaran admin dari halaman website.

Untuk menonaktifkan akses, set `is_active` menjadi `false` pada baris admin terkait. Jangan menghapus akun Auth sebelum memastikan admin lain masih dapat mengelola proyek.

## 3. Menjalankan website secara lokal

1. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada `.env.local` dari pengaturan API proyek Supabase.
2. Jalankan `npm install`, kemudian `npm run dev`.
3. Kunjungi `http://localhost:3000/admin/login`.

`.env.local` tidak boleh dikomit. `anon` key memang digunakan sebagai kunci publik dan tetap dilindungi oleh RLS; jangan pernah menaruh `service_role` atau secret key di kode klien.

## 4. Keamanan akses

- Rute di bawah `/admin` diperiksa oleh Next.js Proxy untuk penyegaran sesi dan oleh layout server untuk memastikan identitas serta keanggotaan admin aktif.
- Server Action login memvalidasi email dan kata sandi di server. Pesan gagal dibuat sama untuk kredensial salah maupun akun yang tidak terdaftar sebagai admin.
- Jika pengelola tidak lagi bertugas, nonaktifkan barisnya di `admin_users` dan cabut akses akunnya di Supabase Auth.

Panel saat ini baru menyediakan autentikasi dan ringkasan. Menu pengaturan situs serta pengelolaan konten ditambahkan pada tugas fitur berikutnya.
