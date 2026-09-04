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

// Decide em qual ilha a criança deve entrar, com base no progresso salvo.
// Regra atual: se já terminou a última fase da Natureza -> vai pro Deserto.
// Senão -> Natureza. (À medida que novas ilhas ficarem prontas, é só estender aqui.)
export async function proximaIlha() {
  const progresso = await buscarProgresso();
  // se já tem QUALQUER progresso no Deserto, ou já terminou a Natureza -> retoma no Deserto
  const temDeserto = progresso.some((p) => p.ilha === 'deserto');
  const naturezaCompleta = progresso.some((p) => p.ilha === 'natureza' && p.fase === 'fase3');
  return (temDeserto || naturezaCompleta) ? 'Deserto' : 'Natureza';
}

// Lista as fases já concluídas de uma ilha (ex.: ['fase1','fase2']).
// Usado nas telas das ilhas pra decidir quais fases ficam trancadas (cadeado).
export async function fasesConcluidas(ilha) {
  const progresso = await buscarProgresso();
  return progresso
    .filter((p) => p.ilha === String(ilha).toLowerCase())
    .map((p) => p.fase);
}
