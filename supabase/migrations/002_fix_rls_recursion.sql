-- ============================================================
-- Fix: infinite recursion in RLS policies for "profiles" table
--
-- Root cause: policies on blog_posts, inquiries, etc. check
-- admin status via:
--   exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
-- But profiles has RLS enabled, so that subquery triggers the
-- profiles policies, which query profiles again → infinite loop.
--
-- Fix: a SECURITY DEFINER function reads profiles bypassing RLS,
-- then all policies call this function instead of querying profiles.
-- ============================================================

-- 1. Helper function — runs as the function owner (bypasses RLS)
create or replace function public.get_my_role()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- 2. Drop all existing policies that cause the recursion
drop policy if exists "Admin reads all profiles"         on public.profiles;
drop policy if exists "Auth users update own posts"      on public.blog_posts;
drop policy if exists "Admin deletes posts"              on public.blog_posts;
drop policy if exists "Admin manages categories"         on public.categories;
drop policy if exists "Admin reads inquiries"            on public.inquiries;
drop policy if exists "Admin updates inquiry status"     on public.inquiries;
drop policy if exists "Admin manages portfolio"          on public.portfolio_items;
drop policy if exists "Admin manages webinars"           on public.webinars;

-- 3. Recreate policies using get_my_role() instead of subqueries

-- Profiles
create policy "Admin reads all profiles" on public.profiles
  for select using (public.get_my_role() = 'admin');

-- Blog posts
create policy "Auth users update own posts" on public.blog_posts
  for update using (
    author_id = auth.uid() or public.get_my_role() = 'admin'
  );

create policy "Admin deletes posts" on public.blog_posts
  for delete using (public.get_my_role() = 'admin');

-- Categories
create policy "Admin manages categories" on public.categories
  for all using (public.get_my_role() = 'admin');

-- Inquiries
create policy "Admin reads inquiries" on public.inquiries
  for select using (public.get_my_role() = 'admin');

create policy "Admin updates inquiry status" on public.inquiries
  for update using (public.get_my_role() = 'admin');

-- Portfolio
create policy "Admin manages portfolio" on public.portfolio_items
  for all using (public.get_my_role() = 'admin');

-- Webinars
create policy "Admin manages webinars" on public.webinars
  for all using (public.get_my_role() = 'admin');
