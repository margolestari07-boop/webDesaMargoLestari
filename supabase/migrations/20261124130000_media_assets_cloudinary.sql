-- Media aset di Cloudinary (opsional, suplemen Supabase Storage).
-- Migration additive. Tidak mengubah atau menghapus tabel yang sudah ada.
-- Aset lama (Supabase Storage) tetap provider='supabase' dengan
-- bucket + storage_path terisi. Aset baru dari Cloudinary memakai
-- provider='cloudinary' dengan public_id + secure_url terisi.
-- RLS tidak diubah: kebijakan media_assets yang sudah ada tetap berlaku.
-- RLS tetap AKTIF, jangan dinonaktifkan.
-- Kolom mengikuti riset integrasi Cloudinary 24 Nov 2026 (dok resmi):
-- public_id adalah sumber kebenaran delivery URL; secure_url adalah
-- URL asli dari respons upload; asset_folder dicatat terpisah karena
-- akun baru memakai dynamic folder mode.

alter table public.media_assets
  add column if not exists provider text not null default 'supabase'
    check (provider in ('supabase', 'cloudinary')),
  add column if not exists public_id text,
  add column if not exists asset_id text,
  add column if not exists secure_url text,
  add column if not exists resource_type text not null default 'image'
    check (resource_type in ('image', 'video', 'raw')),
  add column if not exists format text,
  add column if not exists width integer,
  add column if not exists height integer,
  add column if not exists asset_folder text,
  add column if not exists original_filename text;

-- Aset Cloudinary tidak punya bucket/path Supabase: kedua kolom menjadi
-- nullable. Aset Supabase lama tetap terisi seperti sebelumnya.
alter table public.media_assets
  alter column bucket drop not null,
  alter column storage_path drop not null;

-- Aset Cloudinary wajib punya public_id dan secure_url.
alter table public.media_assets
  add constraint media_assets_cloudinary_check check (
    (provider <> 'cloudinary')
    or (public_id is not null and secure_url is not null)
  );

-- Aset Supabase wajib punya bucket dan storage_path.
alter table public.media_assets
  add constraint media_assets_supabase_check check (
    (provider <> 'supabase')
    or (bucket is not null and storage_path is not null)
  );

create unique index if not exists media_assets_public_id_idx
  on public.media_assets (public_id)
  where provider = 'cloudinary';

comment on column public.media_assets.provider is
  'supabase = file di Supabase Storage; cloudinary = file di Cloudinary.';
comment on column public.media_assets.public_id is
  'Identifier Cloudinary; sumber kebenaran delivery URL dan hapus aset.';
comment on column public.media_assets.secure_url is
  'Delivery URL HTTPS asli dari respons upload Cloudinary.';
comment on column public.media_assets.asset_folder is
  'Folder Cloudinary (dynamic folder mode); tidak tercermin di public_id.';
