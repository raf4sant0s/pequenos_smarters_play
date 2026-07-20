// src/services/auth.js
import { supabase } from './supabase';

// Cadastro: cria a conta do responsável e o perfil (com nome da criança)
export async function cadastrar(nomeResponsavel, nomeCrianca, email, senha) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  });
  if (error) throw error;

  // Cria a linha de perfil ligada ao usuário recém-criado
  const userId = data.user.id;
  const { error: erroPerfil } = await supabase.from('perfis').insert({
    id: userId,
    nome_responsavel: nomeResponsavel,
    nome_crianca: nomeCrianca,
  });
  if (erroPerfil) throw erroPerfil;

  return data;
}

// Login
export async function entrar(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });
  if (error) throw error;
  return data;
}

// Sair
export async function sair() {
  await supabase.auth.signOut();
}

// Pega o nome da criança pra mostrar nas telas
export async function buscarPerfil() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('perfis').select('*').eq('id', user.id).single();
  return data;
}
