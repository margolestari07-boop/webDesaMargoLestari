-- Fase 1: content revisions untuk Beranda, Profil Desa, Kependudukan, dan APBDes.
-- Migration additive. Tidak mengubah atau menghapus tabel yang sudah ada.
-- Tidak ada data desa yang di-seed di sini kecuali katalog 4 content_sections.
-- Nilai uang memakai numeric(19,2), bukan float.
-- RLS: publik hanya membaca revisi terbit aktif lewat pointer
-- content_sections.published_revision_id. Admin (private.is_admin())
-- mengelola draf. Publikasi atomik lewat public.publish_content_revision().
-- JANGAN terapkan ke database live sebelum schema live terverifikasi
-- (lihat plan.md bagian 9).

-- ---------------------------------------------------------------------------
-- 1. content_sections dan content_revisions
-- ---------------------------------------------------------------------------

create table public.content_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in ('home', 'profile', 'population', 'apbdes')),
  label text not null,
  published_revision_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.content_sections (id) on delete cascade,
  revision_no integer not null check (revision_no > 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references public.admin_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  source_note text,
  change_note text,
  constraint content_revisions_section_revision_no_key unique (section_id, revision_no),
  constraint content_revisions_draft_published_at_check check (
    status <> 'draft' or published_at is null
  ),
  constraint content_revisions_published_published_at_check check (
    status <> 'published' or published_at is not null
  )
);

-- Pointer publik menunjuk revisi dari section yang sama. FK ditambah setelah
-- content_revisions ada karena keduanya saling merujuk.
alter table public.content_sections
  add constraint content_sections_published_revision_id_fkey
  foreign key (published_revision_id)
  references public.content_revisions (id)
  on delete set null;

create index content_revisions_section_id_idx
  on public.content_revisions (section_id);
create index content_revisions_section_status_idx
  on public.content_revisions (section_id, status);

-- Pointer hanya boleh menunjuk revisi berstatus published dari section yang sama.
create or replace function public.validate_published_revision_pointer()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.published_revision_id is not null and not exists (
    select 1 from public.content_revisions
    where id = new.published_revision_id
      and section_id = new.id
      and status = 'published'
  ) then
    raise exception 'published_revision_id must reference a published revision of the same section';
  end if;
  return new;
end;
$$;

create trigger content_sections_validate_published_revision
before insert or update of published_revision_id on public.content_sections
for each row execute function public.validate_published_revision_pointer();

-- Transisi status yang diizinkan: draft -> published, draft -> archived,
-- published -> archived. Perubahan lain ditolak di database.
create or replace function public.validate_revision_status_transition()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.status = new.status then
    return new;
  end if;
  if (old.status = 'draft' and new.status in ('published', 'archived'))
    or (old.status = 'published' and new.status = 'archived') then
    return new;
  end if;
  raise exception 'invalid revision status transition from % to %', old.status, new.status;
end;
$$;

create trigger content_revisions_validate_status_transition
before update of status on public.content_revisions
for each row execute function public.validate_revision_status_transition();

-- ---------------------------------------------------------------------------
-- 2. Media library (bukan per revisi; penempatan publik diatur per revisi)
-- ---------------------------------------------------------------------------

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  checksum text,
  alt_text text,
  uploaded_by uuid references public.admin_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_bucket_path_key unique (bucket, storage_path)
);

create index media_assets_uploaded_by_idx on public.media_assets (uploaded_by);

-- ---------------------------------------------------------------------------
-- 3. Struktur organisasi bersama (satu sumber untuk Beranda dan Profil)
-- ---------------------------------------------------------------------------

create table public.village_officers (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.content_revisions (id) on delete cascade,
  parent_id uuid references public.village_officers (id) on delete set null,
  full_name text not null,
  position text not null,
  description text,
  sort_order integer not null default 0 check (sort_order >= 0),
  photo_asset_id uuid references public.media_assets (id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint village_officers_parent_not_self_check check (
    parent_id is null or parent_id <> id
  )
);

create index village_officers_revision_id_idx on public.village_officers (revision_id);
create index village_officers_parent_id_idx on public.village_officers (parent_id);

-- ---------------------------------------------------------------------------
-- 4. Konten Beranda dan Profil Desa
-- ---------------------------------------------------------------------------

create table public.home_content (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null unique references public.content_revisions (id) on delete cascade,
  hero_title text,
  hero_subtitle text,
  help_phone text,
  help_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_content (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null unique references public.content_revisions (id) on delete cascade,
  history_text text,
  area_value numeric(12, 2) check (area_value is null or area_value >= 0),
  area_unit text,
  population_count integer check (population_count is null or population_count >= 0),
  distance_to_capital_value numeric(10, 2) check (
    distance_to_capital_value is null or distance_to_capital_value >= 0
  ),
  distance_to_capital_unit text,
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_content_area_unit_check check (
    (area_value is null) = (area_unit is null)
  ),
  constraint profile_content_distance_unit_check check (
    (distance_to_capital_value is null) = (distance_to_capital_unit is null)
  )
);

create table public.profile_boundaries (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.content_revisions (id) on delete cascade,
  direction text not null check (direction in ('north', 'south', 'east', 'west')),
  label text not null,
  description text,
  source_note text,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_boundaries_revision_direction_key unique (revision_id, direction)
);

create index profile_boundaries_revision_id_idx on public.profile_boundaries (revision_id);

create table public.village_documents (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.content_revisions (id) on delete cascade,
  title text not null,
  doc_type text not null,
  description text,
  storage_path text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  alt_text text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index village_documents_revision_id_idx on public.village_documents (revision_id);

create table public.home_gallery_items (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.content_revisions (id) on delete cascade,
  media_asset_id uuid not null references public.media_assets (id) on delete cascade,
  title text,
  caption text,
  alt_override text,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint home_gallery_items_revision_media_key unique (revision_id, media_asset_id)
);

create index home_gallery_items_revision_id_idx on public.home_gallery_items (revision_id);
create index home_gallery_items_media_asset_id_idx on public.home_gallery_items (media_asset_id);

-- ---------------------------------------------------------------------------
-- 5. Kependudukan
-- ---------------------------------------------------------------------------

create table public.population_reports (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null unique references public.content_revisions (id) on delete cascade,
  period_label text not null,
  period_start date,
  period_end date,
  source_name text,
  source_reference text,
  data_updated_at timestamptz,
  total_population integer check (total_population is null or total_population >= 0),
  total_households integer check (total_households is null or total_households >= 0),
  male_count integer check (male_count is null or male_count >= 0),
  female_count integer check (female_count is null or female_count >= 0),
  productive_age_count integer check (
    productive_age_count is null or productive_age_count >= 0
  ),
  area_value numeric(12, 2) check (area_value is null or area_value >= 0),
  area_unit text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint population_reports_period_check check (
    period_start is null or period_end is null or period_end >= period_start
  ),
  constraint population_reports_gender_total_check check (
    total_population is null
    or male_count is null
    or female_count is null
    or male_count + female_count = total_population
  ),
  constraint population_reports_area_unit_check check (
    (area_value is null) = (area_unit is null)
  )
);

create table public.population_area_uses (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.population_reports (id) on delete cascade,
  category text not null,
  area_value numeric(12, 2) check (area_value is null or area_value >= 0),
  area_unit text,
  sort_order integer not null default 0 check (sort_order >= 0),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint population_area_uses_report_category_key unique (report_id, category),
  constraint population_area_uses_unit_check check (
    (area_value is null) = (area_unit is null)
  )
);

create index population_area_uses_report_id_idx on public.population_area_uses (report_id);

create table public.population_occupations (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.population_reports (id) on delete cascade,
  name text not null,
  person_count integer check (person_count is null or person_count >= 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint population_occupations_report_name_key unique (report_id, name)
);

create index population_occupations_report_id_idx on public.population_occupations (report_id);

-- ---------------------------------------------------------------------------
-- 6. APBDes (uang dalam Rupiah, numeric(19,2))
-- ---------------------------------------------------------------------------

create table public.apbdes_reports (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null unique references public.content_revisions (id) on delete cascade,
  fiscal_year integer not null check (fiscal_year between 2000 and 2100),
  period_label text not null,
  period_start date,
  period_end date,
  source_document text,
  source_note text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint apbdes_reports_period_check check (
    period_start is null or period_end is null or period_end >= period_start
  )
);

create index apbdes_reports_fiscal_year_idx on public.apbdes_reports (fiscal_year);

create table public.apbdes_realizations (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.apbdes_reports (id) on delete cascade,
  kind text not null check (kind in ('operasional', 'pembiayaan')),
  label text not null,
  budget numeric(19, 2) check (budget is null or budget >= 0),
  realization numeric(19, 2) check (realization is null or realization >= 0),
  currency text not null default 'IDR',
  sort_order integer not null default 0 check (sort_order >= 0),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint apbdes_realizations_report_kind_label_key unique (report_id, kind, label)
);

create index apbdes_realizations_report_id_idx on public.apbdes_realizations (report_id);

create table public.apbdes_spending_fields (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.apbdes_reports (id) on delete cascade,
  field_name text not null,
  budget numeric(19, 2) check (budget is null or budget >= 0),
  realization numeric(19, 2) check (realization is null or realization >= 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint apbdes_spending_fields_report_field_key unique (report_id, field_name)
);

create index apbdes_spending_fields_report_id_idx on public.apbdes_spending_fields (report_id);

create table public.apbdes_revenue_sources (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.apbdes_reports (id) on delete cascade,
  source_name text not null,
  budget numeric(19, 2) check (budget is null or budget >= 0),
  realization numeric(19, 2) check (realization is null or realization >= 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint apbdes_revenue_sources_report_source_key unique (report_id, source_name)
);

create index apbdes_revenue_sources_report_id_idx on public.apbdes_revenue_sources (report_id);

-- ---------------------------------------------------------------------------
-- 7. Audit append-only
-- ---------------------------------------------------------------------------

create table public.content_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.admin_users (id) on delete set null,
  section_key text,
  revision_id uuid references public.content_revisions (id) on delete set null,
  action text not null,
  summary text,
  created_at timestamptz not null default now()
);

create index content_audit_events_revision_id_idx on public.content_audit_events (revision_id);
create index content_audit_events_created_at_idx on public.content_audit_events (created_at);

create or replace function public.prevent_audit_event_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'content_audit_events is append-only';
end;
$$;

create trigger content_audit_events_prevent_change
before update or delete on public.content_audit_events
for each row execute function public.prevent_audit_event_change();

-- ---------------------------------------------------------------------------
-- 8. Guard: baris konten hanya boleh diubah selama revisinya masih draft.
-- Revisi yang sudah terbit tidak diedit langsung; perubahan berikutnya
-- memakai draf baru. Revisi yang hilang (mis. saat cascade delete) diizinkan
-- lewat agar penghapusan draf beserta anaknya tidak terhalang.
-- ---------------------------------------------------------------------------

create or replace function public.ensure_revision_is_draft()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_revision_id uuid;
  v_status text;
begin
  if tg_op = 'DELETE' then
    v_revision_id := old.revision_id;
  else
    v_revision_id := new.revision_id;
  end if;

  select status into v_status
  from public.content_revisions
  where id = v_revision_id;

  if v_status is null then
    if tg_op = 'DELETE' then
      return old;
    end if;
    return new;
  end if;

  if v_status <> 'draft' then
    raise exception 'only draft revisions can be changed';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create or replace function public.ensure_report_revision_is_draft()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_revision_id uuid;
  v_status text;
begin
  if tg_table_name in ('population_area_uses', 'population_occupations') then
    if tg_op = 'DELETE' then
      select revision_id into v_revision_id
      from public.population_reports where id = old.report_id;
    else
      select revision_id into v_revision_id
      from public.population_reports where id = new.report_id;
    end if;
  elsif tg_table_name in ('apbdes_realizations', 'apbdes_spending_fields', 'apbdes_revenue_sources') then
    if tg_op = 'DELETE' then
      select revision_id into v_revision_id
      from public.apbdes_reports where id = old.report_id;
    else
      select revision_id into v_revision_id
      from public.apbdes_reports where id = new.report_id;
    end if;
  else
    raise exception 'unsupported table for report draft guard: %', tg_table_name;
  end if;

  select status into v_status
  from public.content_revisions
  where id = v_revision_id;

  if v_status is null then
    if tg_op = 'DELETE' then
      return old;
    end if;
    return new;
  end if;

  if v_status <> 'draft' then
    raise exception 'only draft revisions can be changed';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 9. Trigger updated_at (memakai public.set_updated_at() yang sudah ada)
-- ---------------------------------------------------------------------------

create trigger content_sections_set_updated_at
before update on public.content_sections
for each row execute function public.set_updated_at();

create trigger content_revisions_set_updated_at
before update on public.content_revisions
for each row execute function public.set_updated_at();

create trigger media_assets_set_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

create trigger village_officers_set_updated_at
before update on public.village_officers
for each row execute function public.set_updated_at();

create trigger home_content_set_updated_at
before update on public.home_content
for each row execute function public.set_updated_at();

create trigger profile_content_set_updated_at
before update on public.profile_content
for each row execute function public.set_updated_at();

create trigger profile_boundaries_set_updated_at
before update on public.profile_boundaries
for each row execute function public.set_updated_at();

create trigger village_documents_set_updated_at
before update on public.village_documents
for each row execute function public.set_updated_at();

create trigger home_gallery_items_set_updated_at
before update on public.home_gallery_items
for each row execute function public.set_updated_at();

create trigger population_reports_set_updated_at
before update on public.population_reports
for each row execute function public.set_updated_at();

create trigger population_area_uses_set_updated_at
before update on public.population_area_uses
for each row execute function public.set_updated_at();

create trigger population_occupations_set_updated_at
before update on public.population_occupations
for each row execute function public.set_updated_at();

create trigger apbdes_reports_set_updated_at
before update on public.apbdes_reports
for each row execute function public.set_updated_at();

create trigger apbdes_realizations_set_updated_at
before update on public.apbdes_realizations
for each row execute function public.set_updated_at();

create trigger apbdes_spending_fields_set_updated_at
before update on public.apbdes_spending_fields
for each row execute function public.set_updated_at();

create trigger apbdes_revenue_sources_set_updated_at
before update on public.apbdes_revenue_sources
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 10. Trigger guard draf pada tabel anak
-- ---------------------------------------------------------------------------

create trigger village_officers_ensure_draft
before insert or update or delete on public.village_officers
for each row execute function public.ensure_revision_is_draft();

create trigger home_content_ensure_draft
before insert or update or delete on public.home_content
for each row execute function public.ensure_revision_is_draft();

create trigger profile_content_ensure_draft
before insert or update or delete on public.profile_content
for each row execute function public.ensure_revision_is_draft();

create trigger profile_boundaries_ensure_draft
before insert or update or delete on public.profile_boundaries
for each row execute function public.ensure_revision_is_draft();

create trigger village_documents_ensure_draft
before insert or update or delete on public.village_documents
for each row execute function public.ensure_revision_is_draft();

create trigger home_gallery_items_ensure_draft
before insert or update or delete on public.home_gallery_items
for each row execute function public.ensure_revision_is_draft();

create trigger population_reports_ensure_draft
before insert or update or delete on public.population_reports
for each row execute function public.ensure_revision_is_draft();

create trigger apbdes_reports_ensure_draft
before insert or update or delete on public.apbdes_reports
for each row execute function public.ensure_revision_is_draft();

create trigger population_area_uses_ensure_draft
before insert or update or delete on public.population_area_uses
for each row execute function public.ensure_report_revision_is_draft();

create trigger population_occupations_ensure_draft
before insert or update or delete on public.population_occupations
for each row execute function public.ensure_report_revision_is_draft();

create trigger apbdes_realizations_ensure_draft
before insert or update or delete on public.apbdes_realizations
for each row execute function public.ensure_report_revision_is_draft();

create trigger apbdes_spending_fields_ensure_draft
before insert or update or delete on public.apbdes_spending_fields
for each row execute function public.ensure_report_revision_is_draft();

create trigger apbdes_revenue_sources_ensure_draft
before insert or update or delete on public.apbdes_revenue_sources
for each row execute function public.ensure_report_revision_is_draft();

-- ---------------------------------------------------------------------------
-- 11. RLS
-- ---------------------------------------------------------------------------

alter table public.content_sections enable row level security;
alter table public.content_revisions enable row level security;
alter table public.media_assets enable row level security;
alter table public.village_officers enable row level security;
alter table public.home_content enable row level security;
alter table public.profile_content enable row level security;
alter table public.profile_boundaries enable row level security;
alter table public.village_documents enable row level security;
alter table public.home_gallery_items enable row level security;
alter table public.population_reports enable row level security;
alter table public.population_area_uses enable row level security;
alter table public.population_occupations enable row level security;
alter table public.apbdes_reports enable row level security;
alter table public.apbdes_realizations enable row level security;
alter table public.apbdes_spending_fields enable row level security;
alter table public.apbdes_revenue_sources enable row level security;
alter table public.content_audit_events enable row level security;

-- Grants mengikuti pola migration yang sudah ada: select publik untuk anon
-- dan authenticated, tulis hanya untuk authenticated; RLS yang membatasi
-- tulis hanya untuk admin aktif (private.is_admin()).
revoke all on table public.content_sections from anon, authenticated;
revoke all on table public.content_revisions from anon, authenticated;
revoke all on table public.media_assets from anon, authenticated;
revoke all on table public.village_officers from anon, authenticated;
revoke all on table public.home_content from anon, authenticated;
revoke all on table public.profile_content from anon, authenticated;
revoke all on table public.profile_boundaries from anon, authenticated;
revoke all on table public.village_documents from anon, authenticated;
revoke all on table public.home_gallery_items from anon, authenticated;
revoke all on table public.population_reports from anon, authenticated;
revoke all on table public.population_area_uses from anon, authenticated;
revoke all on table public.population_occupations from anon, authenticated;
revoke all on table public.apbdes_reports from anon, authenticated;
revoke all on table public.apbdes_realizations from anon, authenticated;
revoke all on table public.apbdes_spending_fields from anon, authenticated;
revoke all on table public.apbdes_revenue_sources from anon, authenticated;
revoke all on table public.content_audit_events from anon, authenticated;

grant select on table public.content_sections to anon, authenticated;
grant select on table public.content_revisions to anon, authenticated;
grant select on table public.media_assets to anon, authenticated;
grant select on table public.village_officers to anon, authenticated;
grant select on table public.home_content to anon, authenticated;
grant select on table public.profile_content to anon, authenticated;
grant select on table public.profile_boundaries to anon, authenticated;
grant select on table public.village_documents to anon, authenticated;
grant select on table public.home_gallery_items to anon, authenticated;
grant select on table public.population_reports to anon, authenticated;
grant select on table public.population_area_uses to anon, authenticated;
grant select on table public.population_occupations to anon, authenticated;
grant select on table public.apbdes_reports to anon, authenticated;
grant select on table public.apbdes_realizations to anon, authenticated;
grant select on table public.apbdes_spending_fields to anon, authenticated;
grant select on table public.apbdes_revenue_sources to anon, authenticated;
grant select on table public.content_audit_events to authenticated;

grant insert, update, delete on table public.content_sections to authenticated;
grant insert, update, delete on table public.content_revisions to authenticated;
grant insert, update, delete on table public.media_assets to authenticated;
grant insert, update, delete on table public.village_officers to authenticated;
grant insert, update, delete on table public.home_content to authenticated;
grant insert, update, delete on table public.profile_content to authenticated;
grant insert, update, delete on table public.profile_boundaries to authenticated;
grant insert, update, delete on table public.village_documents to authenticated;
grant insert, update, delete on table public.home_gallery_items to authenticated;
grant insert, update, delete on table public.population_reports to authenticated;
grant insert, update, delete on table public.population_area_uses to authenticated;
grant insert, update, delete on table public.population_occupations to authenticated;
grant insert, update, delete on table public.apbdes_reports to authenticated;
grant insert, update, delete on table public.apbdes_realizations to authenticated;
grant insert, update, delete on table public.apbdes_spending_fields to authenticated;
grant insert, update, delete on table public.apbdes_revenue_sources to authenticated;
grant insert on table public.content_audit_events to authenticated;

-- Publik hanya membaca katalog section.
create policy "Content sections are readable by everyone"
on public.content_sections
for select
to anon, authenticated
using (true);

-- Publik hanya membaca revisi yang sedang ditunjuk sebagai revisi terbit.
create policy "Active published revisions are readable by everyone"
on public.content_revisions
for select
to anon, authenticated
using (
  status = 'published'
  and exists (
    select 1 from public.content_sections s
    where s.id = content_revisions.section_id
      and s.published_revision_id = content_revisions.id
  )
);

-- Publik hanya membaca aset yang dipakai galeri terbit atau foto pejabat terbit.
create policy "Published media assets are readable by everyone"
on public.media_assets
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.home_gallery_items gi
    join public.content_revisions r on r.id = gi.revision_id
    join public.content_sections s on s.id = r.section_id
    where gi.media_asset_id = media_assets.id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
  or exists (
    select 1
    from public.village_officers vo
    join public.content_revisions r on r.id = vo.revision_id
    join public.content_sections s on s.id = r.section_id
    where vo.photo_asset_id = media_assets.id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

-- Publik hanya membaca baris anak dari revisi terbit aktif.
create policy "Published village officers are readable by everyone"
on public.village_officers
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = village_officers.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published home content is readable by everyone"
on public.home_content
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = home_content.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published profile content is readable by everyone"
on public.profile_content
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = profile_content.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published profile boundaries are readable by everyone"
on public.profile_boundaries
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = profile_boundaries.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published village documents are readable by everyone"
on public.village_documents
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = village_documents.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published home gallery items are readable by everyone"
on public.home_gallery_items
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = home_gallery_items.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published population reports are readable by everyone"
on public.population_reports
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = population_reports.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published population area uses are readable by everyone"
on public.population_area_uses
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.population_reports pr
    join public.content_revisions r on r.id = pr.revision_id
    join public.content_sections s on s.id = r.section_id
    where pr.id = population_area_uses.report_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published population occupations are readable by everyone"
on public.population_occupations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.population_reports pr
    join public.content_revisions r on r.id = pr.revision_id
    join public.content_sections s on s.id = r.section_id
    where pr.id = population_occupations.report_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published apbdes reports are readable by everyone"
on public.apbdes_reports
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.content_revisions r
    join public.content_sections s on s.id = r.section_id
    where r.id = apbdes_reports.revision_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published apbdes realizations are readable by everyone"
on public.apbdes_realizations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.apbdes_reports ar
    join public.content_revisions r on r.id = ar.revision_id
    join public.content_sections s on s.id = r.section_id
    where ar.id = apbdes_realizations.report_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published apbdes spending fields are readable by everyone"
on public.apbdes_spending_fields
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.apbdes_reports ar
    join public.content_revisions r on r.id = ar.revision_id
    join public.content_sections s on s.id = r.section_id
    where ar.id = apbdes_spending_fields.report_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

create policy "Published apbdes revenue sources are readable by everyone"
on public.apbdes_revenue_sources
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.apbdes_reports ar
    join public.content_revisions r on r.id = ar.revision_id
    join public.content_sections s on s.id = r.section_id
    where ar.id = apbdes_revenue_sources.report_id
      and r.status = 'published'
      and s.published_revision_id = r.id
  )
);

-- Admin mengelola semua tabel konten (termasuk draf).
create policy "Administrators manage content sections"
on public.content_sections
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage content revisions"
on public.content_revisions
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage media assets"
on public.media_assets
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage village officers"
on public.village_officers
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage home content"
on public.home_content
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage profile content"
on public.profile_content
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage profile boundaries"
on public.profile_boundaries
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage village documents"
on public.village_documents
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage home gallery items"
on public.home_gallery_items
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage population reports"
on public.population_reports
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage population area uses"
on public.population_area_uses
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage population occupations"
on public.population_occupations
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage apbdes reports"
on public.apbdes_reports
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage apbdes realizations"
on public.apbdes_realizations
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage apbdes spending fields"
on public.apbdes_spending_fields
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators manage apbdes revenue sources"
on public.apbdes_revenue_sources
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

-- Audit hanya bisa dibaca dan ditulis admin; tidak ada policy update/delete.
create policy "Administrators read content audit events"
on public.content_audit_events
for select
to authenticated
using ((select private.is_admin()));

create policy "Administrators insert content audit events"
on public.content_audit_events
for insert
to authenticated
with check ((select private.is_admin()));

-- ---------------------------------------------------------------------------
-- 12. Publikasi atomik: draft -> published, arsipkan revisi terbit lama,
-- ganti pointer section, catat audit. Satu transaksi. Hanya admin.
-- ---------------------------------------------------------------------------

create or replace function public.publish_content_revision(p_revision_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_section_id uuid;
  v_old_published_id uuid;
begin
  if not (select private.is_admin()) then
    raise exception 'only administrators can publish content revisions';
  end if;

  select section_id into v_section_id
  from public.content_revisions
  where id = p_revision_id
  for update;

  if v_section_id is null then
    raise exception 'revision not found';
  end if;

  if exists (
    select 1 from public.content_revisions
    where id = p_revision_id and status <> 'draft'
  ) then
    raise exception 'only draft revisions can be published';
  end if;

  select published_revision_id into v_old_published_id
  from public.content_sections
  where id = v_section_id
  for update;

  update public.content_revisions
  set status = 'published', published_at = pg_catalog.now()
  where id = p_revision_id;

  if v_old_published_id is not null and v_old_published_id <> p_revision_id then
    update public.content_revisions
    set status = 'archived'
    where id = v_old_published_id;
  end if;

  update public.content_sections
  set published_revision_id = p_revision_id
  where id = v_section_id;

  insert into public.content_audit_events (actor_id, section_key, revision_id, action, summary)
  select (select auth.uid()), cs.key, p_revision_id, 'published', 'Revisi diterbitkan.'
  from public.content_sections cs
  where cs.id = v_section_id;

  return p_revision_id;
end;
$$;

revoke all on function public.publish_content_revision(uuid) from public, anon;
grant execute on function public.publish_content_revision(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 13. Seed katalog section saja (tanpa angka atau data desa).
-- ---------------------------------------------------------------------------

insert into public.content_sections (key, label) values
  ('home', 'Beranda'),
  ('profile', 'Profil Desa'),
  ('population', 'Kependudukan'),
  ('apbdes', 'APBDes')
on conflict (key) do nothing;
