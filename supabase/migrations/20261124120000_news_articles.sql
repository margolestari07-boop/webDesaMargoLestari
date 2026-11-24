-- Berita desa (news_articles).
-- Migration additive. Tidak mengubah atau menghapus tabel yang sudah ada.
-- Tabel ini tidak memakai sistem content_revisions: berita diterbitkan
-- langsung lewat kolom status (draft/published), karena berita terbit
-- per artikel, bukan per revisi section.
-- RLS mengikuti pola migration content_revisions: publik hanya membaca
-- artikel berstatus published; admin (private.is_admin()) mengelola
-- semuanya. RLS tetap AKTIF, jangan dinonaktifkan.
-- Kategori mengikuti yang dipakai halaman statis lama; 'Lainnya' untuk
-- kategori baru. Slug unik dan dipakai rute detail /berita/[slug].

create table public.news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Pengumuman'
    check (category in (
      'Pembangunan', 'Kesehatan', 'Pertanian', 'Pengumuman',
      'Kemasyarakatan', 'UMKM & Ekonomi', 'Pemerintahan',
      'Pendidikan & Pemuda', 'Kebudayaan', 'Lainnya'
    )),
  excerpt text,
  content text,
  author text,
  image_url text,
  image_alt text,
  views integer not null default 0 check (views >= 0),
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_articles_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint news_articles_published_check check (
    (status <> 'published') = (published_at is null)
  )
);

create index news_articles_status_published_at_idx
  on public.news_articles (status, published_at desc);
create index news_articles_category_idx
  on public.news_articles (category);

create trigger news_articles_set_updated_at
before update on public.news_articles
for each row execute function public.set_updated_at();

alter table public.news_articles enable row level security;

revoke all on table public.news_articles from anon, authenticated;
grant select on table public.news_articles to anon, authenticated;
grant insert, update, delete on table public.news_articles to authenticated;

-- Publik hanya membaca artikel yang sudah diterbitkan.
create policy "Published news articles are readable by everyone"
on public.news_articles
for select
to anon, authenticated
using (status = 'published');

-- Admin mengelola semua artikel berita.
create policy "Administrators manage news articles"
on public.news_articles
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
