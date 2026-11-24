-- Hapus fitur revisi sepenuhnya: semua konten langsung live.
--
-- Alasan: admin tidak lagi memakai alur draf -> terbit. Setiap simpan di
-- admin langsung tampil di halaman publik, tanpa revisi dan tanpa riwayat.
--
-- Data yang dipertahankan: hanya baris milik revisi yang sedang terbit
-- (ditunjuk content_sections.published_revision_id, diverifikasi
-- 2026-11-24 sebelum migrasi ini diterapkan):
--   home       ac1dbf98-250d-43e2-a932-e021f6716b45 (revisi 6 dari 6)
--   profile    735bbefd-d544-479a-b4c1-8dccd1664f3f (revisi 1 dari 1)
--   population 94a584e1-c65b-41c4-8161-1b28025ddd25 (revisi 1 dari 1)
--   apbdes     69d978fd-652d-4345-9c4b-395ee9e321c9 (revisi 1 dari 1)
-- Jumlah baris sebelum migrasi: home_content 6 -> 1, home_gallery_items
-- 36 -> 6, village_officers 72 -> 12; tabel lain tidak berubah jumlahnya.
--
-- Urutan penting: policy baca publik ditulis ulang dulu (policy lama
-- memakai EXISTS ke content_revisions), lalu trigger penegak draf
-- dihapus (tanpa ini penghapusan baris revisi lama ditolak trigger),
-- lalu baris revisi tak terbit dihapus, kolom revision_id dihapus,
-- terakhir tabel revisi dihapus, lalu fungsi revisi dihapus.

begin;

-- 1. Policy baca publik: semua baris kini langsung live (anon + authenticated).
drop policy if exists "Published home content is readable by everyone" on public.home_content;
create policy "Content is readable by everyone" on public.home_content for select using (true);

drop policy if exists "Published home gallery items are readable by everyone" on public.home_gallery_items;
create policy "Content is readable by everyone" on public.home_gallery_items for select using (true);

drop policy if exists "Published village officers are readable by everyone" on public.village_officers;
create policy "Content is readable by everyone" on public.village_officers for select using (true);

drop policy if exists "Published profile content is readable by everyone" on public.profile_content;
create policy "Content is readable by everyone" on public.profile_content for select using (true);

drop policy if exists "Published profile boundaries are readable by everyone" on public.profile_boundaries;
create policy "Content is readable by everyone" on public.profile_boundaries for select using (true);

drop policy if exists "Published village documents are readable by everyone" on public.village_documents;
create policy "Content is readable by everyone" on public.village_documents for select using (true);

drop policy if exists "Published population reports are readable by everyone" on public.population_reports;
create policy "Content is readable by everyone" on public.population_reports for select using (true);

drop policy if exists "Published population area uses are readable by everyone" on public.population_area_uses;
create policy "Content is readable by everyone" on public.population_area_uses for select using (true);

drop policy if exists "Published population occupations are readable by everyone" on public.population_occupations;
create policy "Content is readable by everyone" on public.population_occupations for select using (true);

drop policy if exists "Published apbdes reports are readable by everyone" on public.apbdes_reports;
create policy "Content is readable by everyone" on public.apbdes_reports for select using (true);

drop policy if exists "Published apbdes realizations are readable by everyone" on public.apbdes_realizations;
create policy "Content is readable by everyone" on public.apbdes_realizations for select using (true);

drop policy if exists "Published apbdes spending fields are readable by everyone" on public.apbdes_spending_fields;
create policy "Content is readable by everyone" on public.apbdes_spending_fields for select using (true);

drop policy if exists "Published apbdes revenue sources are readable by everyone" on public.apbdes_revenue_sources;
create policy "Content is readable by everyone" on public.apbdes_revenue_sources for select using (true);

drop policy if exists "Published media assets are readable by everyone" on public.media_assets;
create policy "Content is readable by everyone" on public.media_assets for select using (true);

drop policy if exists "Published site settings are readable by everyone" on public.site_settings;
create policy "Content is readable by everyone" on public.site_settings for select using (true);

-- 2. Hapus trigger penegak draf pada tabel konten (tanpa ini penghapusan baris revisi lama dan simpan admin
-- akan ditolak karena trigger memeriksa status draf revisi).
drop trigger if exists home_content_ensure_draft on public.home_content;
drop trigger if exists home_gallery_items_ensure_draft on public.home_gallery_items;
drop trigger if exists village_officers_ensure_draft on public.village_officers;
drop trigger if exists profile_content_ensure_draft on public.profile_content;
drop trigger if exists profile_boundaries_ensure_draft on public.profile_boundaries;
drop trigger if exists village_documents_ensure_draft on public.village_documents;
drop trigger if exists population_reports_ensure_draft on public.population_reports;
drop trigger if exists population_area_uses_ensure_draft on public.population_area_uses;
drop trigger if exists population_occupations_ensure_draft on public.population_occupations;
drop trigger if exists apbdes_reports_ensure_draft on public.apbdes_reports;
drop trigger if exists apbdes_realizations_ensure_draft on public.apbdes_realizations;
drop trigger if exists apbdes_spending_fields_ensure_draft on public.apbdes_spending_fields;
drop trigger if exists apbdes_revenue_sources_ensure_draft on public.apbdes_revenue_sources;

-- 3. Hapus baris milik revisi yang tidak terbit (anak laporan dulu, baru laporan).
delete from public.population_area_uses
where report_id in (select id from public.population_reports where revision_id <> '94a584e1-c65b-41c4-8161-1b28025ddd25');
delete from public.population_occupations
where report_id in (select id from public.population_reports where revision_id <> '94a584e1-c65b-41c4-8161-1b28025ddd25');
delete from public.apbdes_realizations
where report_id in (select id from public.apbdes_reports where revision_id <> '69d978fd-652d-4345-9c4b-395ee9e321c9');
delete from public.apbdes_spending_fields
where report_id in (select id from public.apbdes_reports where revision_id <> '69d978fd-652d-4345-9c4b-395ee9e321c9');
delete from public.apbdes_revenue_sources
where report_id in (select id from public.apbdes_reports where revision_id <> '69d978fd-652d-4345-9c4b-395ee9e321c9');

delete from public.home_content where revision_id <> 'ac1dbf98-250d-43e2-a932-e021f6716b45';
delete from public.home_gallery_items where revision_id <> 'ac1dbf98-250d-43e2-a932-e021f6716b45';
delete from public.village_officers where revision_id <> 'ac1dbf98-250d-43e2-a932-e021f6716b45';
delete from public.profile_content where revision_id <> '735bbefd-d544-479a-b4c1-8dccd1664f3f';
delete from public.profile_boundaries where revision_id <> '735bbefd-d544-479a-b4c1-8dccd1664f3f';
delete from public.village_documents where revision_id <> '735bbefd-d544-479a-b4c1-8dccd1664f3f';
delete from public.population_reports where revision_id <> '94a584e1-c65b-41c4-8161-1b28025ddd25';
delete from public.apbdes_reports where revision_id <> '69d978fd-652d-4345-9c4b-395ee9e321c9';

-- 4. Hapus kolom revision_id dari tabel konten.
alter table public.home_content drop column revision_id;
alter table public.home_gallery_items drop column revision_id;
alter table public.village_officers drop column revision_id;
alter table public.profile_content drop column revision_id;
alter table public.profile_boundaries drop column revision_id;
alter table public.village_documents drop column revision_id;
alter table public.population_reports drop column revision_id;
alter table public.apbdes_reports drop column revision_id;

-- 5. Pengaturan situs selalu live: hapus kolom status dan is_sample.
alter table public.site_settings drop column status;
alter table public.site_settings drop column is_sample;

-- 6. Hapus tabel revisi (policy dan trigger di atasnya ikut terhapus).
-- CASCADE: kedua tabel saling merujuk (content_revisions.section_id ->
-- content_sections, content_sections.published_revision_id ->
-- content_revisions) sehingga harus dihapus beserta constraint yang
-- menggantung; semua yang ikut terhapus adalah objek revisi itu sendiri.
drop table public.content_sections cascade;
drop table public.content_audit_events cascade;
drop table public.content_revisions cascade;

-- 7. Hapus fungsi-fungsi revisi.
drop function if exists public.publish_content_revision(uuid);
drop function if exists public.ensure_revision_is_draft();
drop function if exists public.ensure_report_revision_is_draft();
drop function if exists public.validate_published_revision_pointer();
drop function if exists public.validate_revision_status_transition();
drop function if exists public.prevent_audit_event_change();

commit;
