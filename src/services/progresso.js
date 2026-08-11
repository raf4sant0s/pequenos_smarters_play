// src/services/progresso.js
import { supabase } from './supabase';

// Salva (ou atualiza) o resultado de uma fase
export async function salvarProgresso(ilha, fase, estrelas, erros) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('progresso').upsert(
    {
      user_id: user.id,
      ilha,
      fase,
      estrelas,
      erros,
      concluido: true,
      ultima_sessao: new Date().toISOString(),
    },
    { onConflict: 'user_id,ilha,fase' } // se já existe, atualiza
  );
  if (error) console.log('Erro ao salvar progresso:', error.message);
}

// Busca todo o progresso (usado no Painel dos Pais)
export async function buscarProgresso() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from('progresso').select('*').eq('user_id', user.id);
  return data || [];
}
