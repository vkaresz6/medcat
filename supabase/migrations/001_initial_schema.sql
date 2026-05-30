-- MedCAT Initial Schema
-- Migration: 001_initial_schema
-- Created: 2026-05-30

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";  -- fuzzy text search for TM

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  full_name     text,
  avatar_url    text,
  preferred_language  text default 'en',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- LANGUAGES (reference table)
-- ============================================================
create table if not exists public.languages (
  code    text primary key,   -- e.g. 'en', 'hu', 'de'
  name    text not null,
  native_name text
);

insert into public.languages (code, name, native_name) values
  ('en', 'English', 'English'),
  ('hu', 'Hungarian', 'Magyar'),
  ('de', 'German', 'Deutsch'),
  ('fr', 'French', 'Français'),
  ('es', 'Spanish', 'Español'),
  ('it', 'Italian', 'Italiano'),
  ('pl', 'Polish', 'Polski'),
  ('ro', 'Romanian', 'Română'),
  ('cs', 'Czech', 'Čeština'),
  ('sk', 'Slovak', 'Slovenčina')
on conflict (code) do nothing;

-- ============================================================
-- PROJECTS
-- ============================================================
create type public.project_status as enum ('active', 'completed', 'archived', 'on_hold');
create type public.project_domain as enum ('general', 'medical', 'pharmaceutical', 'legal', 'technical', 'marketing');

create table if not exists public.projects (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  description     text,
  source_language text not null references public.languages(code),
  target_language text not null references public.languages(code),
  domain          public.project_domain default 'general',
  status          public.project_status default 'active',
  deadline        date,
  owner_id        uuid not null references public.profiles(id) on delete restrict,
  word_count      integer default 0,
  progress        numeric(5,2) default 0.00,  -- 0.00 to 100.00
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index idx_projects_owner on public.projects(owner_id);
create index idx_projects_status on public.projects(status);

alter table public.projects enable row level security;

-- ============================================================
-- PROJECT MEMBERS
-- ============================================================
create type public.member_role as enum ('owner', 'leader', 'proofreader', 'translator');

create table if not exists public.project_members (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  role        public.member_role not null default 'translator',
  joined_at   timestamptz default now(),
  unique (project_id, user_id)
);

create index idx_project_members_project on public.project_members(project_id);
create index idx_project_members_user on public.project_members(user_id);

alter table public.project_members enable row level security;

-- RLS: project visible to members
create policy "Project members can view project"
  on public.projects for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.project_members pm
      where pm.project_id = id and pm.user_id = auth.uid()
    )
  );

create policy "Only owners can create projects"
  on public.projects for insert
  with check (auth.uid() = owner_id);

create policy "Leaders and owners can update project"
  on public.projects for update
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.project_members pm
      where pm.project_id = id and pm.user_id = auth.uid()
        and pm.role in ('owner', 'leader')
    )
  );

create policy "Members can view their memberships"
  on public.project_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- SEGMENTS
-- ============================================================
create type public.segment_status as enum ('untranslated', 'draft', 'translated', 'proofread', 'locked');

create table if not exists public.segments (
  id                  uuid primary key default uuid_generate_v4(),
  project_id          uuid not null references public.projects(id) on delete cascade,
  segment_number      integer not null,
  source_text         text not null,
  target_text         text,
  status              public.segment_status default 'untranslated',
  quality_score       numeric(5,2),   -- 0-100
  ai_confidence       numeric(5,2),   -- 0-100, populated by AI
  word_count          integer default 0,
  char_count          integer default 0,
  locked              boolean default false,
  translator_id       uuid references public.profiles(id),
  proofreader_id      uuid references public.profiles(id),
  translated_at       timestamptz,
  proofread_at        timestamptz,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  unique (project_id, segment_number)
);

create index idx_segments_project on public.segments(project_id);
create index idx_segments_status on public.segments(project_id, status);
create index idx_segments_source_trgm on public.segments using gin(source_text gin_trgm_ops);

alter table public.segments enable row level security;

create policy "Project members can view segments"
  on public.segments for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
      union
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "Translators and above can edit segments"
  on public.segments for update
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
    or exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- TRANSLATION MEMORIES (TM pools)
-- ============================================================
create table if not exists public.translation_memories (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  description     text,
  source_language text not null references public.languages(code),
  target_language text not null references public.languages(code),
  domain          public.project_domain default 'general',
  owner_id        uuid not null references public.profiles(id),
  is_public       boolean default false,
  entry_count     integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index idx_tm_owner on public.translation_memories(owner_id);
create index idx_tm_languages on public.translation_memories(source_language, target_language);

alter table public.translation_memories enable row level security;

create policy "Public TMs or own TMs are visible"
  on public.translation_memories for select
  using (is_public = true or owner_id = auth.uid());

create policy "Owners manage their TMs"
  on public.translation_memories for all
  using (owner_id = auth.uid());

-- ============================================================
-- TM ENTRIES
-- ============================================================
create table if not exists public.tm_entries (
  id          uuid primary key default uuid_generate_v4(),
  tm_id       uuid not null references public.translation_memories(id) on delete cascade,
  source_text text not null,
  target_text text not null,
  quality     numeric(5,2) default 100.0,
  usage_count integer default 0,
  metadata    jsonb default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index idx_tm_entries_tm on public.tm_entries(tm_id);
create index idx_tm_entries_source_trgm on public.tm_entries using gin(source_text gin_trgm_ops);

alter table public.tm_entries enable row level security;

create policy "TM entries inherit TM visibility"
  on public.tm_entries for select
  using (
    exists (
      select 1 from public.translation_memories tm
      where tm.id = tm_id and (tm.is_public = true or tm.owner_id = auth.uid())
    )
  );

create policy "TM owners manage entries"
  on public.tm_entries for all
  using (
    exists (
      select 1 from public.translation_memories tm
      where tm.id = tm_id and tm.owner_id = auth.uid()
    )
  );

-- ============================================================
-- TERMBASE
-- ============================================================
create table if not exists public.termbase_entries (
  id                  uuid primary key default uuid_generate_v4(),
  project_id          uuid references public.projects(id) on delete cascade,
  source_term         text not null,
  target_term         text not null,
  source_language     text not null references public.languages(code),
  target_language     text not null references public.languages(code),
  domain              public.project_domain default 'general',
  definition          text,
  notes               text,
  is_forbidden        boolean default false,   -- forbidden term flag
  is_medical          boolean default false,   -- medical/pharma term flag
  created_by          uuid references public.profiles(id),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index idx_termbase_project on public.termbase_entries(project_id);
create index idx_termbase_source_trgm on public.termbase_entries using gin(source_term gin_trgm_ops);
create index idx_termbase_medical on public.termbase_entries(is_medical) where is_medical = true;

alter table public.termbase_entries enable row level security;

create policy "Project members can view termbase"
  on public.termbase_entries for select
  using (
    project_id is null  -- global terms
    or exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
      union
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "Leaders/owners manage termbase"
  on public.termbase_entries for all
  using (
    exists (
      select 1 from public.projects p
      left join public.project_members pm on pm.project_id = p.id and pm.user_id = auth.uid()
      where p.id = project_id
        and (p.owner_id = auth.uid() or pm.role in ('owner', 'leader'))
    )
  );

-- ============================================================
-- EVALUATIONS (AI quality scores, human reviews)
-- ============================================================
create type public.evaluation_type as enum ('ai_auto', 'human_review', 'peer_review');

create table if not exists public.evaluations (
  id              uuid primary key default uuid_generate_v4(),
  segment_id      uuid not null references public.segments(id) on delete cascade,
  project_id      uuid not null references public.projects(id) on delete cascade,
  evaluation_type public.evaluation_type default 'ai_auto',
  score           numeric(5,2) not null,   -- 0-100
  feedback        text,
  error_categories jsonb default '{}',     -- {"fluency": 10, "accuracy": 5, ...}
  evaluator_id    uuid references public.profiles(id),
  created_at      timestamptz default now()
);

create index idx_evaluations_segment on public.evaluations(segment_id);
create index idx_evaluations_project on public.evaluations(project_id);

alter table public.evaluations enable row level security;

create policy "Project members can view evaluations"
  on public.evaluations for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
      union
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- QA CHECKS
-- ============================================================
create type public.qa_issue_type as enum (
  'untranslated', 'whitespace', 'missing_term', 'forbidden_term',
  'number_mismatch', 'punctuation', 'length_issue', 'duplicate'
);
create type public.qa_severity as enum ('error', 'warning', 'info');

create table if not exists public.qa_checks (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  segment_id  uuid not null references public.segments(id) on delete cascade,
  issue_type  public.qa_issue_type not null,
  severity    public.qa_severity default 'warning',
  message     text,
  resolved    boolean default false,
  resolved_by uuid references public.profiles(id),
  resolved_at timestamptz,
  created_at  timestamptz default now()
);

create index idx_qa_checks_project on public.qa_checks(project_id, resolved);
create index idx_qa_checks_segment on public.qa_checks(segment_id);

alter table public.qa_checks enable row level security;

create policy "Project members can view QA checks"
  on public.qa_checks for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
      union
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- AI CACHE (avoid redundant Gemini API calls)
-- ============================================================
create table if not exists public.ai_cache (
  id          uuid primary key default uuid_generate_v4(),
  cache_key   text not null unique,   -- hash of (operation + source_text + lang_pair)
  operation   text not null,          -- 'translate', 'evaluate', 'segment', etc.
  input_hash  text not null,
  response    jsonb not null,
  model       text default 'gemini-2.5-flash',
  hit_count   integer default 0,
  expires_at  timestamptz,
  created_at  timestamptz default now()
);

create index idx_ai_cache_key on public.ai_cache(cache_key);
create index idx_ai_cache_expires on public.ai_cache(expires_at) where expires_at is not null;

-- No RLS on ai_cache -- server-side only (service role)

-- ============================================================
-- NOTIFICATIONS / INBOX
-- ============================================================
create type public.notification_type as enum (
  'task_assigned', 'segment_reviewed', 'project_completed',
  'comment_added', 'mention', 'deadline_reminder'
);

create table if not exists public.notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  project_id  uuid references public.projects(id) on delete cascade,
  type        public.notification_type not null,
  title       text not null,
  body        text,
  read        boolean default false,
  action_url  text,
  created_at  timestamptz default now()
);

create index idx_notifications_user on public.notifications(user_id, read, created_at desc);

alter table public.notifications enable row level security;

create policy "Users see own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "Users can update own notifications"
  on public.notifications for update
  using (user_id = auth.uid());

-- ============================================================
-- UTILITY: updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_updated_at_projects
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger set_updated_at_segments
  before update on public.segments
  for each row execute function public.set_updated_at();

create trigger set_updated_at_tm
  before update on public.translation_memories
  for each row execute function public.set_updated_at();

create trigger set_updated_at_tm_entries
  before update on public.tm_entries
  for each row execute function public.set_updated_at();

create trigger set_updated_at_termbase
  before update on public.termbase_entries
  for each row execute function public.set_updated_at();

-- ============================================================
-- SEGMENT word count auto-update
-- ============================================================
create or replace function public.update_segment_counts()
returns trigger language plpgsql as $$
begin
  new.word_count = array_length(string_to_array(trim(new.source_text), ' '), 1);
  new.char_count = char_length(new.source_text);
  return new;
end;
$$;

create trigger segment_counts
  before insert or update of source_text on public.segments
  for each row execute function public.update_segment_counts();

-- ============================================================
-- PROJECT progress auto-update
-- ============================================================
create or replace function public.update_project_progress()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_total integer;
  v_done  integer;
begin
  select count(*), count(*) filter (where status in ('translated', 'proofread'))
  into v_total, v_done
  from public.segments
  where project_id = coalesce(new.project_id, old.project_id);

  update public.projects
  set
    progress = case when v_total > 0 then round((v_done::numeric / v_total) * 100, 2) else 0 end,
    word_count = (select coalesce(sum(word_count), 0) from public.segments where project_id = coalesce(new.project_id, old.project_id))
  where id = coalesce(new.project_id, old.project_id);

  return coalesce(new, old);
end;
$$;

create trigger update_project_progress
  after insert or update of status or delete on public.segments
  for each row execute function public.update_project_progress();
