create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  village_name text not null,
  tagline text,
  subdistrict text not null,
  regency text not null,
  province text not null,
  address text,
  latitude numeric(9, 6) check (latitude between -90 and 90),
  longitude numeric(9, 6) check (longitude between -180 and 180),
  contact_person text,
  phone text,
  email text,
  service_hours text,
  social_links jsonb not null default '{}'::jsonb check (jsonb_typeof(social_links) = 'object'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where id = (select auth.uid())
      and is_active
  );
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger admin_users_set_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;

revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.site_settings to anon, authenticated;
grant insert, update, delete on table public.site_settings to authenticated;
grant select, insert, update, delete on table public.admin_users to authenticated;

grant usage on schema public to anon, authenticated;

create policy "Published site settings are readable by everyone"
on public.site_settings
for select
to anon, authenticated
using (status = 'published');

create policy "Administrators manage site settings"
on public.site_settings
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Users and administrators read admin membership"
on public.admin_users
for select
to authenticated
using (id = (select auth.uid()) or (select public.is_admin()));

create policy "Administrators manage admin membership"
on public.admin_users
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

insert into public.site_settings (
  singleton,
  village_name,
  subdistrict,
  regency,
  province,
  contact_person,
  phone,
  status,
  is_sample
)
values (
  true,
  'Desa Margo Lestari',
  'Tanjung Bintang',
  'Lampung Selatan',
  'Lampung',
  'Kurniadi',
  '+62 821-1439-7667',
  'draft',
  false
)
on conflict (singleton) do nothing;
