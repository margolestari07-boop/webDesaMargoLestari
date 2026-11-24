# Setup Lokal (Clean Reset)

Panduan menjalankan Website Desa Margo Lestari di komputer sendiri.
Ditulis 24 Nov 2026 setelah masalah "node package tertimpa mulu" di
laptop pengembang.

## Prasyarat

- Node.js **v24** (dokumen proyek menyebut v24.12.0; terverifikasi jalan
  di v24.22.1). Cek dengan `node --version`. Node 18/20 tidak
  direkomendasikan: proyek memakai Next.js 16 dan fitur Node 24.
- npm 11 (ikut terinstal bersama Node 24). Cek dengan `npm --version`.

## Kenapa package bisa "tertimpa"

- `npm install` tanpa argumen bisa menaikkan versi package sesuai range
  di `package.json` dan menulis ulang `package-lock.json`. Di repo ini
  `package-lock.json` SUDAH ter-commit: pakai `npm ci` supaya versi yang
  terinstal persis sama dengan lockfile, bukan versi terbaru yang cocok
  dengan range.
- Folder `node_modules/` dan `.next/` sudah di-ignore `.gitignore`,
  jadi tidak ikut ter-commit dan aman dihapus kapan saja.

## Reset bersih (bila install rusak atau aneh)

Jalankan dari root repo:

```bash
# 1. Hentikan dev server yang sedang jalan (Ctrl+C).
# 2. Hapus hasil install dan build lama.
rm -rf node_modules .next

# 3. Pastikan Node 24.
node --version   # harus v24.x

# 4. Install persis sesuai lockfile (bukan npm install).
npm ci

# 5. Salin env (sekali saja; .env.local sudah di-ignore, jangan commit).
cp .env.example .env.local
# Lalu isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
# di .env.local dengan nilai dari Supabase Dashboard project
# margolestari07-boop. Tanpa ini, halaman /admin akan menampilkan
# error "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# in .env.local." dan halaman publik jatuh ke konten statis.

# 6. (Opsional) Isi kredensial Cloudinary bila ingin menguji upload
# media. Lihat docs/CLOUDINARY.md. Tanpa ini, upload media menampilkan
# pesan konfigurasi; situs tetap jalan normal.

# 7. Jalankan.
npm run dev
# Buka http://localhost:3000 dan http://localhost:3000/admin/login
```

## Perintah yang dipakai sehari-hari

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) di http://localhost:3000 |
| `npm run typecheck` | Cek tipe TypeScript, harus 0 error |
| `npm run lint` | ESLint, harus 0 error |
| `npm run build` | Build production, harus 0 error dan 20/20 halaman |
| `npm run smoke` | Smoke test production (build dulu) |
| `npm test` | Unit test (Vitest) |

## Bila masih error setelah reset bersih

1. Pastikan tidak ada dua Node terinstal (misalnya lewat nvm dan lewat
   installer sistem). `which node` dan `which npm` harus menunjuk ke
   instalasi yang sama.
2. Pastikan tidak menjalankan `npm install` di tengah jalan: selalu
   `npm ci` setelah `git pull` bila `package-lock.json` berubah.
3. Bila error menyebut file di `node_modules` yang tidak ditemukan,
   ulangi langkah 2-4 di atas.
4. Bila error menyebut Supabase, cek isi `.env.local` (bukan
   `.env.example`) dan pastikan URL memakai project
   `ijbpdqywmfzsxcmopjnp.supabase.co`.
