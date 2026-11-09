# Website Desa Margo Lestari

Website informasi Desa Margo Lestari yang dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS. Konten yang belum dikonfirmasi pihak desa tidak disajikan sebagai fakta.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Perintah kualitas yang tersedia:

```bash
npm run lint
npm run typecheck
npm run build
npm run format
npm run test:e2e
npm run test:smoke
```

## Status implementasi

Fondasi UI publik telah dibuat bertahap. Rute navigasi akan terisi per fitur. Integrasi Supabase, autentikasi/admin, storage, dan operasi tulis ditunda; jangan menambahkan kredensial ke repository. E2E browser masih tertunda karena Chromium Playwright belum berhasil diunduh.

## Sumber dan validasi data

Data identitas awal dirangkum dari `Analisis_Proposal_Website_Desa_Margo_Lestari.md`. Kecamatan memiliki catatan inkonsistensi dan perlu diverifikasi oleh pihak desa. Demografi, potensi, layanan, koordinat, foto, dan informasi keuangan belum tersedia untuk publikasi.

Lihat `docs/PROGRESS.md` untuk status pekerjaan dan `docs/CHECKLIST_IMPLEMENTASI.md` untuk daftar fitur yang sudah/belum dibuat.
