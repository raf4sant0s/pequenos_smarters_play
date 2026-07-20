// src/data/deserto.js
const VOGAIS = ['A', 'E', 'I', 'O', 'U'];
const CONSOANTES = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

// Fase 1 — Desafio dos Espinhos (EncontrarAlvos): toque nas consoantes
export function espinhos() {
  return Array.from({ length: 5 }, () => {
    const itens = embaralhar([...embaralhar(CONSOANTES).slice(0, 5), ...embaralhar(VOGAIS).slice(0, 3)]);
    return { itens, alvos: itens.filter((l) => CONSOANTES.includes(l)) };
  });
}

// Fase 2 — Seca (SelecaoUnica): complete a palavra com a consoante
export const seca = [
  { enunciado: 'Complete: BATA', destaque: '_ A T A', opcoes: [{ id: 'B', texto: 'B' }, { id: 'F', texto: 'F' }, { id: 'P', texto: 'P' }], correta: 'B' },
  { enunciado: 'Complete: CASA', destaque: 'C A _ A', opcoes: [{ id: 'S', texto: 'S' }, { id: 'T', texto: 'T' }, { id: 'L', texto: 'L' }], correta: 'S' },
  { enunciado: 'Complete: MESA', destaque: 'M E _ A', opcoes: [{ id: 'N', texto: 'N' }, { id: 'S', texto: 'S' }, { id: 'R', texto: 'R' }], correta: 'S' },
  { enunciado: 'Complete: PATO', destaque: 'P A _ O', opcoes: [{ id: 'G', texto: 'G' }, { id: 'T', texto: 'T' }, { id: 'D', texto: 'D' }], correta: 'T' },
  { enunciado: 'Complete: BOLA', destaque: 'B O _ A', opcoes: [{ id: 'L', texto: 'L' }, { id: 'M', texto: 'M' }, { id: 'N', texto: 'N' }], correta: 'L' },
];

// Fase 3 — Penhasco (OrdenarSequencia): organize as letras
export const penhascoDeserto = [
  { dica: 'SOL', itens: ['O', 'S', 'L'], correta: ['S', 'O', 'L'] },
  { dica: 'MEL', itens: ['L', 'M', 'E'], correta: ['M', 'E', 'L'] },
  { dica: 'MAR', itens: ['A', 'R', 'M'], correta: ['M', 'A', 'R'] },
  { dica: 'PÉ', itens: ['P', 'É'], correta: ['P', 'É'] },
];