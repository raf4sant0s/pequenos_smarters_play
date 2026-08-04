// src/data/natureza.js — conteúdo das 3 fases da Ilha da Natureza
const VOGAIS = ['A', 'E', 'I', 'O', 'U'];
const CONSOANTES = 'BCDFGHJKLMNPQRSTVZ'.split('');
function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

// ── Fase 1 — Floresta das Vogais (EncontrarAlvos) ─────────────────────────
// 4 rodadas: 5 vogais + 4 consoantes espalhadas; a criança acha as vogais.
export function florestaDasVogais() {
  return Array.from({ length: 4 }, () => ({
    itens: embaralhar([...VOGAIS, ...embaralhar(CONSOANTES).slice(0, 4)]),
    alvos: VOGAIS,
  }));
}

// ── Fase 2 — Lago das letras (SelecaoUnica) ───────────────────────────────
// "Clique na vogal": 2 cartas laranja (uma vogal + uma consoante) por rodada.
const LAGO = [
  { correta: 'A', distrator: 'B' },
  { correta: 'E', distrator: 'Q' },
  { correta: 'I', distrator: 'M' },
  { correta: 'O', distrator: 'J' },
  { correta: 'U', distrator: 'D' },
];
export function lagoDasLetras() {
  return embaralhar(LAGO).map(({ correta, distrator }) => ({
    enunciado: 'CLIQUE NA VOGAL',
    correta,
    opcoes: embaralhar([
      { id: correta, texto: correta },
      { id: distrator, texto: distrator },
    ]),
  }));
}

// ── Fase 3 — Campo das letras (SelecaoUnica com imagem) ────────────────────
// "Com qual letra começa": mostra um objeto e 3 letras; acerta a inicial.
const OBJETOS = {
  cachorro: require('../../assets/images/cachorro.png'),
  aviao: require('../../assets/images/aviao.png'),
  elefante: require('../../assets/images/elefante.png'),
  maca: require('../../assets/images/maca.png'),
  flor: require('../../assets/images/flor.png'),
};
const CAMPO = [
  { objeto: 'cachorro', correta: 'C', distratores: ['B', 'J'] },
  { objeto: 'aviao', correta: 'A', distratores: ['P', 'D'] },
  { objeto: 'elefante', correta: 'E', distratores: ['H', 'T'] },
  { objeto: 'maca', correta: 'M', distratores: ['N', 'K'] },
  { objeto: 'flor', correta: 'F', distratores: ['V', 'O'] },
];
export function campoDasLetras() {
  return embaralhar(CAMPO).map(({ objeto, correta, distratores }) => ({
    enunciado: 'COM QUAL LETRA COMEÇA?',
    imagemPrompt: OBJETOS[objeto],
    correta,
    opcoes: embaralhar([
      { id: correta, texto: correta },
      ...distratores.map((d) => ({ id: d, texto: d })),
    ]),
  }));
}
