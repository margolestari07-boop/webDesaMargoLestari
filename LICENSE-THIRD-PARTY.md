# Lisensi Pihak Ketiga

## TailAdmin — Free Next.js Admin Dashboard Template

Panel pengelola (`/admin`) memakai kode dari template TailAdmin gratis
(https://github.com/TailAdmin/free-nextjs-admin-dashboard), berlisensi MIT.

- **Sumber:** https://github.com/TailAdmin/free-nextjs-admin-dashboard
- **Lisensi:** MIT — salinan lisensi lengkap tersimpan di
  `src/components/tailadmin/LICENSE-TailAdmin`. Copyright notice template
  tidak dihapus.
- **Yang di-port ke repo ini** (di `src/components/tailadmin/`): komponen
  layout (Sidebar, Header, konteks tema), komponen UI (Button, Input,
  Select, Table, Badge, Alert, Field, dan lain-lain), ikon SVG, kartu
  metrik, kartu komponen, breadcrumb, dan halaman sign-in; ditambah
  utility dan token tema dari `src/app/globals.css` template.
- **Yang diubah dari template:** skala warna `brand-*` dipetakan ke token
  warna halaman depan situs ini (biru #005d90 / #0077b6, bukan biru/indigo
  default TailAdmin); teks diterjemahkan ke Bahasa Indonesia; pencarian,
  notifikasi, dan widget upsell "TailAdmin Pro" tidak dipakai; dukungan
  i18n (`next-intl`) diganti teks literal; grafik (apexcharts) tidak
  dipakai. Mengganti ke warna default TailAdmin tinggal mengganti token
  `brand-*` di `src/app/globals.css`.
- **Logika aplikasi** (autentikasi, validasi, query Supabase, RPC publish,
  RLS, alur simpan-langsung-terbit) adalah milik proyek ini dan tidak
  berasal dari template.
