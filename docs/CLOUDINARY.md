# Cloudinary sebagai Storage Media Aktif

Dokumen ini menjelaskan cara mengaktifkan Cloudinary untuk upload media
admin Website Desa Margo Lestari. Upload berjalan penuh server-side
(signed): file dari form admin dikirim ke Server Action Next.js, lalu
server mengunggah ke Cloudinary dan mencatat hasilnya ke tabel
`media_assets` di Supabase. `CLOUDINARY_API_SECRET` tidak pernah keluar
dari server.

Status saat dokumen ini ditulis (24 Nov 2026): integrasi kode SUDAH
selesai, akun Cloudinary BELUM dibuat, jadi upload belum bisa dicoba
sampai kredensial diisi. Modul admin Media tetap menampilkan aset lama
(Supabase Storage) dan pesan konfigurasi yang jelas.

## 1. Buat akun dan ambil kredensial

1. Buka https://cloudinary.com lalu klik Sign Up. Daftar gratis dengan
   email atau login sosial, lalu verifikasi email. Paket Free tanpa kartu
   kredit.
2. Setelah login, buka Console di https://console.cloudinary.com. Di
   Dashboard, bagian Product Environment Credentials menampilkan tiga
   nilai: **Cloud Name**, **API Key**, dan **API Secret**. Salin ketiganya.
   Bila API Secret tidak tampil, buka **Settings, API Keys** di Console.
3. Opsional tapi direkomendasikan: buat upload preset signed khusus admin
   di **Settings, Upload, Upload Presets, Add Upload Preset**. Isi nama
   preset (misalnya `margo_admin_signed`), biarkan **Signing Mode** di
   **Signed**, isi **Asset folder** dengan `margo-lestari`, batasi
   **Allowed formats** ke `jpg,jpeg,png,webp,avif`. Jangan ubah ke
   Unsigned untuk preset admin.
4. Periksa mode folder di **Settings, Upload**: akun baru memakai dynamic
   folder mode, jadi `asset_folder` dan `public_id` dicatat terpisah
   (sudah ditangani kode).

## 2. Isi environment variable

Lokal, di `.env.local` di root repo (file ini sudah di `.gitignore`,
jangan pernah commit):

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# Opsional, folder default upload admin:
CLOUDINARY_FOLDER=margo-lestari/galeri
```

Production dan Preview, di Vercel Dashboard, Project Settings,
Environment Variables, lalu redeploy. Jangan pernah menulis nilai
secret ke chat, issue, atau dokumen.

| Variable | Sifat | Keterangan |
| --- | --- | --- |
| `CLOUDINARY_CLOUD_NAME` | Publik (identifier) | Nama cloud dari Dashboard. Muncul di delivery URL. |
| `CLOUDINARY_API_KEY` | Server-only di proyek ini | Identifier akun untuk auth API. |
| `CLOUDINARY_API_SECRET` | **RAHASIA, server-only** | Kunci signature dan Basic Auth. Bila bocor, rotasi di Console, Settings, API Keys. |
| `CLOUDINARY_FOLDER` | Opsional | Folder default upload admin. |

## 3. Cara kerja di kode

- `src/lib/cloudinary.ts`: konfigurasi dari env, `uploadImageToCloudinary`
  (validasi MIME JPG/PNG/WebP/AVIF, maks 10 MB, `upload_stream`),
  `destroyCloudinaryAsset`, `cloudinaryImageUrl` (delivery URL dengan
  transformasi `q_auto/f_auto`).
- `src/app/admin/(protected)/media/actions.ts`: Server Action
  `uploadMedia` (upload lalu insert `media_assets` dengan
  `provider='cloudinary'`; bila insert gagal, aset Cloudinary dihapus
  lagi) dan `deleteMedia` (hapus Cloudinary dulu, baru hapus baris).
- `src/app/admin/(protected)/media/page.tsx`: daftar aset + form unggah.
  Aset Cloudinary ditandai "Cloudinary", aset lama "Supabase Storage".
- Skema: `supabase/migrations/20261124130000_media_assets_cloudinary.sql`
  menambah kolom `provider`, `public_id`, `asset_id`, `secure_url`,
  `resource_type`, `format`, `width`, `height`, `asset_folder`,
  `original_filename`; `bucket` dan `storage_path` menjadi nullable.
  RLS tidak diubah dan tetap aktif.
- Halaman publik: galeri Beranda memakai `secure_url` untuk aset
  Cloudinary dan `storage_path` (file lokal) untuk aset lama.

## 4. Uji setelah kredensial diisi

1. Restart dev server (`npm run dev`).
2. Login admin, buka **Media**, unggah satu gambar kecil.
3. Cek di Console Cloudinary, Media Library: aset muncul di folder yang
   benar dan `secure_url`-nya bisa dibuka.
4. Cek di panel Media: baris baru muncul dengan penyimpanan "Cloudinary".

## 5. MCP resmi Cloudinary (untuk agen dev, bukan runtime aplikasi)

MCP resmi tersedia dan aktif, dipakai supaya AI coding agent (Cursor,
Claude Desktop, Claude Code, VS Code) bisa mengoperasikan Cloudinary.
MCP bukan jalur upload aplikasi: upload admin tetap lewat Upload API /
Node SDK dari server.

| Server MCP | Endpoint remote |
| --- | --- |
| Asset Management | `https://asset-management.mcp.cloudinary.com/mcp` |
| Environment Config | `https://environment-config.mcp.cloudinary.com/mcp` |
| Structured Metadata | `https://structured-metadata.mcp.cloudinary.com/mcp` |
| Analysis | `https://analysis.mcp.cloudinary.com/sse` |

Cara pakai remote: tambahkan objek konfigurasi server ke file MCP client
(misalnya `mcpServers` di Cursor), lalu jalankan login flow OAuth di
browser dan pilih product environment (cloud) yang dipakai. Transport:
Streamable HTTP di endpoint `/mcp`. Alternatif lokal: `npx -y
--package @cloudinary/asset-management -- mcp start` dengan
`cloud_name`, `api_key`, dan `api_secret` di env (Node.js 18+).

Sumber: https://cloudinary.com/documentation/cloudinary_llm_mcp
