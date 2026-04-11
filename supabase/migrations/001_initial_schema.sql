-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  role text check (role in ('admin', 'writer')) default 'writer',
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- Blog Posts
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content jsonb not null default '{}',
  excerpt text,
  cover_image_url text,
  author_id uuid references public.profiles(id),
  status text check (status in ('draft', 'published', 'scheduled')) default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  seo_keywords text[] default '{}',
  schema_type text check (schema_type in ('article', 'faq', 'howto')) default 'article',
  structured_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.blog_posts enable row level security;

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);
alter table public.categories enable row level security;

-- Post <-> Category junction
create table public.post_categories (
  post_id uuid references public.blog_posts(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (post_id, category_id)
);
alter table public.post_categories enable row level security;

-- Inquiries
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_interested text,
  message text not null,
  recaptcha_score real,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  status text check (status in ('new', 'contacted', 'closed')) default 'new',
  created_at timestamptz default now()
);
alter table public.inquiries enable row level security;

-- Portfolio Items
create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  images jsonb default '[]',
  category text,
  awards jsonb default '[]',
  display_order int default 0,
  created_at timestamptz default now()
);
alter table public.portfolio_items enable row level security;

-- Webinars
create table public.webinars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamptz,
  youtube_url text,
  thumbnail_url text,
  status text check (status in ('upcoming', 'past')) default 'upcoming',
  created_at timestamptz default now()
);
alter table public.webinars enable row level security;

-- ============ RLS POLICIES ============

-- Profiles: users read own, admin reads all
create policy "Users read own profile" on public.profiles for select using (id = auth.uid());
create policy "Admin reads all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Blog: public reads published, auth users manage own
create policy "Public reads published posts" on public.blog_posts for select using (status = 'published');
create policy "Auth users read own posts" on public.blog_posts for select using (author_id = auth.uid());
create policy "Auth users insert posts" on public.blog_posts for insert with check (author_id = auth.uid());
create policy "Auth users update own posts" on public.blog_posts for update using (
  author_id = auth.uid() or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin deletes posts" on public.blog_posts for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Categories: public read, admin write
create policy "Public reads categories" on public.categories for select using (true);
create policy "Admin manages categories" on public.categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Post categories: public read
create policy "Public reads post_categories" on public.post_categories for select using (true);

-- Inquiries: public insert, admin read/update
create policy "Public submits inquiry" on public.inquiries for insert with check (true);
create policy "Admin reads inquiries" on public.inquiries for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin updates inquiry status" on public.inquiries for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Portfolio: public read, admin write
create policy "Public reads portfolio" on public.portfolio_items for select using (true);
create policy "Admin manages portfolio" on public.portfolio_items for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Webinars: public read, admin write
create policy "Public reads webinars" on public.webinars for select using (true);
create policy "Admin manages webinars" on public.webinars for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============ AUTO-CREATE PROFILE ON SIGNUP ============
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.email), 'writer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============ STORAGE BUCKETS ============
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true);

-- Storage policies
create policy "Auth users upload images" on storage.objects for insert with check (
  auth.role() = 'authenticated'
);
create policy "Public reads images" on storage.objects for select using (true);
