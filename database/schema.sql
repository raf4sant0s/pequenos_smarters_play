-- ============================================================
--  Pequenos Smarters — Banco de Dados (PostgreSQL / Supabase)
--  Scripts de criação das tabelas, baseados na estrutura usada pelo app.
--  Rodar no Supabase em: SQL Editor -> New query -> colar -> Run.
-- ============================================================

-- ------------------------------------------------------------
-- Tabela: perfis
-- Dados do responsável e da criança, ligada ao usuário do Supabase Auth.
-- ------------------------------------------------------------
create table if not exists public.perfis (
  id                uuid        primary key references auth.users (id) on delete cascade,
  nome_responsavel  text        not null,
  nome_crianca      text        not null,
  idade             int,
  criado_em         timestamptz default now()
);

-- ------------------------------------------------------------
-- Tabela: progresso
-- Resultado de cada fase concluída (estrelas e erros) por criança.
-- ------------------------------------------------------------
create table if not exists public.progresso (
  id             bigint      generated always as identity primary key,
  user_id        uuid        not null references auth.users (id) on delete cascade,
  ilha           text        not null,
  fase           text        not null,
  estrelas       int         not null default 0,
  erros          int         not null default 0,
  concluido      boolean     not null default false,
  ultima_sessao  timestamptz default now(),
  -- garante 1 registro por (usuário, ilha, fase) — usado no upsert do app
  unique (user_id, ilha, fase)
);

-- ============================================================
--  Segurança em nível de linha (RLS)
--  Cada usuário só acessa os próprios dados.
-- ============================================================
alter table public.perfis    enable row level security;
alter table public.progresso enable row level security;

-- Políticas — perfis
create policy "Usuario le o proprio perfil"
  on public.perfis for select using (auth.uid() = id);
create policy "Usuario cria o proprio perfil"
  on public.perfis for insert with check (auth.uid() = id);
create policy "Usuario atualiza o proprio perfil"
  on public.perfis for update using (auth.uid() = id);

-- Políticas — progresso
create policy "Usuario le o proprio progresso"
  on public.progresso for select using (auth.uid() = user_id);
create policy "Usuario insere o proprio progresso"
  on public.progresso for insert with check (auth.uid() = user_id);
create policy "Usuario atualiza o proprio progresso"
  on public.progresso for update using (auth.uid() = user_id);

-- ============================================================
--  (Opcional) Dados de exemplo / seed
--  Os perfis e o progresso são criados pelo próprio app no cadastro/jogo,
--  então normalmente não é necessário seed manual.
-- ============================================================
