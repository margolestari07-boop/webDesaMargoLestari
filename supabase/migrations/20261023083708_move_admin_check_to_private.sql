create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
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

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

drop policy "Administrators manage site settings" on public.site_settings;
drop policy "Users and administrators read admin membership" on public.admin_users;
drop policy "Administrators manage admin membership" on public.admin_users;

drop function public.is_admin();

create policy "Administrators manage site settings"
on public.site_settings
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Users and administrators read admin membership"
on public.admin_users
for select
to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));

create policy "Administrators manage admin membership"
on public.admin_users
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
