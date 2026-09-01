-- Supabase (Postgres) schema for the whitelist table.
-- Run once in the Supabase SQL editor. Unique constraints handle
-- duplicate guarding at the DB layer as well as in the API.

create table public.whitelist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  handle text not null,
  wallet text not null,
  follow_attested boolean not null default false,
  like_attested boolean not null default false,
  quote_url text,
  reply_url text,
  timestamp text,
  ip text,
  constraint whitelist_wallet_key unique (wallet),
  constraint whitelist_handle_key unique (handle)
);

create index whitelist_handle_idx on public.whitelist (handle);
create index whitelist_wallet_idx on public.whitelist (wallet);

alter table public.whitelist enable row level security;
-- Service-role key bypasses RLS; the anon key should NOT insert.
create policy "anon cannot read"
  on public.whitelist for select
  using (false);
