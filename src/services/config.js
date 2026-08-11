// src/services/config.js
import { supabase } from './supabase';

export async function buscarConfig() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { som_ativo: true, voz_ativa: true };
  const { data } = await supabase.from('configuracoes').select('*').eq('user_id', user.id).single();
  return data || { som_ativo: true, voz_ativa: true };
}

export async function salvarConfig(somAtivo, vozAtiva) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('configuracoes').upsert(
    { user_id: user.id, som_ativo: somAtivo, voz_ativa: vozAtiva },
    { onConflict: 'user_id' }
  );
}
