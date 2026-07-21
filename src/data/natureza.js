// src/data/natureza.js
const VOGAIS = ['A', 'E', 'I', 'O', 'U'];
const CONSOANTES = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

// Fase 1 — Floresta das Vogais (EncontrarAlvos): 6 rodadas geradas
export function florestaDasVogais() {
  return Array.from({ length: 3 }, () => ({
    itens: embaralhar([...VOGAIS, ...embaralhar(CONSOANTES).slice(0, 4)]),
    alvos: VOGAIS,
  }));
}

// Fase 2 — Lago das Letras (SelecaoUnica): clique na vogal
export const lagoDasLetras = [
  { enunciado: 'CLIQUE NA VOGAL', opcoes: [{ id: 'A', texto: 'A' }, { id: 'B', texto: 'B' }], correta: 'A' },
  { enunciado: 'CLIQUE NA VOGAL', opcoes: [{ id: 'Q', texto: 'Q' }, { id: 'E', texto: 'E' }], correta: 'E' },
  { enunciado: 'CLIQUE NA VOGAL', opcoes: [{ id: 'I', texto: 'I' }, { id: 'M', texto: 'M' }], correta: 'I' },
  { enunciado: 'CLIQUE NA VOGAL', opcoes: [{ id: 'D', texto: 'D' }, { id: 'O', texto: 'O' }], correta: 'O' },
  { enunciado: 'CLIQUE NA VOGAL', opcoes: [{ id: 'U', texto: 'U' }, { id: 'T', texto: 'T' }], correta: 'U' },
];

// Fase 3 — Penhasco das Consoantes (SelecaoUnica): clique na consoante
export const penhascoConsoantes = [
  { enunciado: 'CLIQUE NA CONSOANTE', opcoes: [{ id: 'B', texto: 'B' }, { id: 'A', texto: 'A' }], correta: 'B' },
  { enunciado: 'CLIQUE NA CONSOANTE', opcoes: [{ id: 'C', texto: 'C' }, { id: 'I', texto: 'I' }], correta: 'C' },
  { enunciado: 'CLIQUE NA CONSOANTE', opcoes: [{ id: 'O', texto: 'O' }, { id: 'F', texto: 'F' }], correta: 'F' },
  { enunciado: 'CLIQUE NA CONSOANTE', opcoes: [{ id: 'D', texto: 'D' }, { id: 'U', texto: 'U' }], correta: 'D' },
  { enunciado: 'CLIQUE NA CONSOANTE', opcoes: [{ id: 'E', texto: 'E' }, { id: 'G', texto: 'G' }], correta: 'G' },
];