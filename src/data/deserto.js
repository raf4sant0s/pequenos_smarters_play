// src/data/deserto.js
const VOGAIS = ['A', 'E', 'I', 'O', 'U'];
const CONSOANTES = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

// Fase 1 — Desafios dos Espinhos (TrilhaEspinhos)
// O Ziggy atravessa o deserto pisando SÓ no grupo certo (vogais OU consoantes).
// Cada "trilha" tem vários passos; em cada passo há 1 letra certa + 1 espinho.
function sortear(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
// sorteia um item diferente do anterior (evita repetir a mesma letra de um passo pro outro)
function sortearDiferente(arr, evitar) {
  const opcoes = arr.length > 1 ? arr.filter((x) => x !== evitar) : arr;
  return sortear(opcoes);
}
function criarTrilha(grupo) {
  const certas = grupo === 'vogal' ? VOGAIS : CONSOANTES;
  const espinhos = grupo === 'vogal' ? CONSOANTES : VOGAIS;
  const passos = [];
  let ultimaCerta = null, ultimoEspinho = null;
  for (let n = 0; n < 6; n++) {
    const certa = sortearDiferente(certas, ultimaCerta);
    const espinho = sortearDiferente(espinhos, ultimoEspinho);
    passos.push({ certa, espinho });
    ultimaCerta = certa;
    ultimoEspinho = espinho;
  }
  return {
    grupo,
    instrucao: grupo === 'vogal'
      ? 'PISE SÓ NAS VOGAIS PRA ATRAVESSAR!'
      : 'PISE SÓ NAS CONSOANTES PRA ATRAVESSAR!',
    passos,
  };
}
export function espinhos() {
  // 2 travessias: uma de vogais, uma de consoantes
  return [criarTrilha('vogal'), criarTrilha('consoante')];
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