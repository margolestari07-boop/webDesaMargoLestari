# PROMPT DINAMIS — Edit 1 Page per Orang (Anti-Konflik Merge)

> Template prompt ini diisi (ganti semua `{{...}}`) lalu diberikan ke AI/agent
> atau dibaca sendiri oleh setiap anggota tim sebelum mulai mengedit.
> Setiap orang memegang **tepat satu page**, bekerja di **branch sendiri**.

---

## BAGIAN A — ISI DULU

```
PAGE YANG DIPEGANG : infografis    
RUTE HALAMAN        : /infografis          
USERNAME GITHUB     : settianisimanjuntak
CATATAN TUGAS       : 
```

> Branch kerja **tidak perlu diisi** — dibuat otomatis saat mulai kerja
> dengan format `fitur/{{username-github}}-{{slug-page}}`, lihat Bagian C.

---

## BAGIAN B — PETA KEPEMILIKAN FILE (WAJIB DITAATI)

### 1. File yang BOLEH kamu edit

- **Folder page-mu** (berikut semua file di dalamnya), mengikuti pola proyek
  ini (`page.tsx`/`page.jsx` sebagai wrapper metadata + satu file konten):

| Page       | Folder milikmu                        | File konten                          |
| ---------- | ------------------------------------- | ------------------------------------ |
| Beranda    | `src/app/(public)/`                   | `page.tsx`, `homepage-content.tsx`   |
| Profil     | `src/app/(public)/profil/`            | `page.tsx`, `profile-content.tsx`    |
| Sejarah    | `src/app/(public)/sejarah/`           | `page.tsx`                           |
| Infografis | `src/app/(public)/infografis/`        | `page.tsx`, `infografis-content.tsx` |
| APBDes     | `src/app/(public)/infografis/apbdes/` | `page.jsx`                           |
| Berita     | `src/app/(public)/berita/`            | `page.jsx`                           |
| Admin      | `src/app/admin/`                      | semua file di dalamnya               |

- **Komponen baru di `src/components/`** — kamu boleh membuat file komponen
  BARU di sana (contoh: `src/components/berita-search-bar.jsx`).
  **Syarat:** namanya harus unik dan spesifik ke page-mu (awali dengan slug
  page-mu, misal `berita-`, `profil-`, `apbdes-`) agar tidak menabrak file
  teman lain.

### 2. File BERSAMA — DILARANG EDIT tanpa koordinasi

```
src/app/layout.tsx                 (root layout)
src/app/(public)/layout.tsx        (layout publik: header/footer/font)
src/app/globals.css                (1.600+ baris, dipakai semua page)
src/components/site-header.tsx     (navigasi semua page)
src/components/site-footer.tsx
src/components/ui/*                (design system bersama)
src/components/motion/*            (animasi bersama)
src/components/news-*.jsx / apbdes-cards.jsx / newsletter-form.jsx
                                   (komponen yang sudah ada, dipakai lintas page)
src/data/*                         (identitas situs, menu, profil desa)
src/lib/*                          (supabase, settings, validators)
src/types/*
package.json / package-lock.json   (dependency bersama)
next.config.ts / tsconfig.json / eslint.config.mjs
supabase/*                         (migrasi database bersama)
```

### 3. Protokol jika KAMU TERPAKSA mengubah file bersama

1. Koordinasikan dulu di grup tim: sebutkan file, alasan, dan cakupan
   perubahannya. Tunggu konfirmasi.
2. Ubah sesedikit mungkin — **additive** (menambah, bukan mengubah/menghapus
   kode lama). Contoh: tambahkan class baru di akhir `globals.css`, tambahkan
   1 item di array `navigationItems` tanpa mengurutkan ulang.
3. Commit file bersama itu dalam **commit terpisah** dengan awalan `shared:`.
4. Merge secepatnya — jangan menumpuk perubahan shared lama.

---

## BAGIAN C — ALUR KERJA GIT (WAJIB)

```bash
# 1. Mulai dari main terbaru
git checkout main
git pull origin main

# 2. Buat branch pribadimu — WAJIB pakai format:
#    fitur/<username-github>-<slug-page>
#    contoh: fitur/budi-berita
git checkout -b fitur/{{username-github}}-{{slug-page}}

# 3. Kerjakan HANYA file milikmu, commit kecil & sering
git add src/app/(public)/{{folder-page}}/ src/components/{{slug-page}}-*
git commit -m "feat({{slug-page}}): {{deskripsi-singkat}}"

# 4. Sebelum merge, selalu sinkron ulang
git checkout main && git pull origin main
git checkout fitur/{{username-github}}-{{slug-page}}
git rebase main          # selesaikan konflik di sini, di branch-mu sendiri

# 5. Push & buat Pull Request ke main
git push -u origin fitur/{{username-github}}-{{slug-page}}
```

Aturan tambahan:

- Jangan pernah commit langsung ke `main`.
- Satu PR = satu page. Jangan campur pekerjaan page lain dalam PR-mu.
- `package-lock.json` berubah sendiri setelah `npm install`? Jangan ikut
  di-commit kecuali kamu memang menambah dependency (dengan izin tim).

---

## BAGIAN D — ATURAN KUALITAS (agar build tim tidak rusak)

Sebelum bilang "selesai", jalankan semua ini dan pastikan lulus:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:smoke
```

Aturan konten proyek (dari README & docs):

- Jangan mengarang fakta, statistik, angka keuangan, atau data desa yang
  belum terverifikasi — gunakan placeholder/empty state yang jelas.
- Ikuti gaya UI yang sudah ada: font portal (`--font-portal`), token warna
  Tailwind di `globals.css`, komponen `ui/*` dan `motion/*`.
- Animasi wajib lewat komponen `Reveal`/`Stagger`/`PageTransition` yang sudah
  menghormati *reduced motion* — jangan menambah library animasi baru.
- Tambahkan `metadata` (title/description) di `page.tsx`/`page.jsx` milikmu.
- Versi framework: **Next.js 16.3.8 + React 19** — cek dokumentasi lokal di
  `node_modules/next/dist/docs/` bila ragu (API-nya bisa beda dari tutorial lama).

---

## BAGIAN E — PROMPT JADI (salin ke AI/agent setelah diisi)

> Kamu adalah asisten pengembang untuk proyek **Website Desa Margo Lestari**
> (Next.js 16.3.8 App Router, TypeScript/JSX, Tailwind CSS 4, folder `src/`).
>
> Saya memegang page Infografis di rute /infografis, di branch
fitur/settianisimanjuntak-infografis (buat dari main terbaru bila belum ada).
>
> **Zona kerja saya:**
> 1. Folder `src/app/(public)/{{folder-page}}/` beserta seluruh isinya.
> 2. Komponen BARU di `src/components/` yang namanya diawali slug page saya
>     `{{slug-page}}-*`, agar tidak menabrak komponen teman lain.
>
> **Larangan mutlak:**
> 1. Jangan edit file bersama: `src/app/layout.tsx`,
>    `src/app/(public)/layout.tsx`, `src/app/globals.css`,
>    `src/components/site-header.tsx`, `src/components/site-footer.tsx`,
>    `src/components/ui/*`, `src/components/motion/*`, komponen lama yang
>    sudah ada di `src/components/`, `src/data/*`, `src/lib/*`,
>    `src/types/*`, `package.json`, config apa pun, dan folder `supabase/`.
> 2. Jika fitur saya benar-benar butuh perubahan file bersama, BERHENTI dan
>    tanyakan ke saya; saya akan koordinasikan ke tim dulu. Perubahan yang
>    disetujui harus bersifat additive (menambah, bukan mengubah kode lama)
>    dan di-commit terpisah dengan awalan `shared:`.
> 3. Jangan menambah dependency baru tanpa izin saya.
> 4. Jangan mengarang data desa; pakai placeholder/empty state untuk data
>    yang belum terverifikasi.
>
> **Gaya wajib:** konsisten dengan design system yang ada — komponen dari
> `src/components/ui/*`, animasi via `Reveal`/`Stagger`, font `--font-portal`,
> token Tailwind di `globals.css`. Tambahkan metadata di file page saya.
>
> **Rencana kerja saya:** {{DESKRIPSI_SINGKAT_YANG_HARUS_DIUBAH_DITAMBAHKAN}}
>
> Baca dulu struktur folder page saya, lalu usulkan rencana perubahan
> (file apa saja yang akan dibuat/diubah, semuanya di dalam zona kerja saya)
> SEBELUM menulis kode. Setelah selesai, ingatkan saya menjalankan:
> `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:smoke`.

---

## Ringkasan 5 Emas

1. **Satu orang = satu page = satu folder = satu branch = satu PR.**
2. **Folder page-mu adalah kerajaanmu** — bebas berkreasi di dalamnya.
3. **Komponen baru di `src/components/` boleh**, asal namanya diawali slug
   page-mu dan tidak mengubah komponen lama milik bersama.
4. **File bersama itu ranah publik** — ubah hanya dengan koordinasi,
   sifatnya additive, dan commit terpisah `shared:`.
5. **Lint + typecheck + build + smoke lulus** baru bilang selesai.
