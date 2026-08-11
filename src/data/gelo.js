// src/data/gelo.js

// Fase 1 — Jogo da memória (JogoMemoria): pares de sílabas
export const memoriaSilabas = ['BA', 'CA', 'DA', 'FE', 'GO', 'LU'];

// Fase 2 — Geleira (SelecaoUnica): qual sílaba está na palavra ouvida
export const geleira = [
  { enunciado: 'Qual sílaba você ouve em BOLA?', opcoes: [{ id: 'BO', texto: 'BO' }, { id: 'LA', texto: 'LA' }, { id: 'ME', texto: 'ME' }], correta: 'BO' },
  { enunciado: 'Qual sílaba você ouve em PATO?', opcoes: [{ id: 'PA', texto: 'PA' }, { id: 'TO', texto: 'TO' }, { id: 'CA', texto: 'CA' }], correta: 'PA' },
  { enunciado: 'Qual sílaba você ouve em MESA?', opcoes: [{ id: 'ME', texto: 'ME' }, { id: 'SA', texto: 'SA' }, { id: 'LU', texto: 'LU' }], correta: 'ME' },
  { enunciado: 'Qual sílaba você ouve em GATO?', opcoes: [{ id: 'GA', texto: 'GA' }, { id: 'TO', texto: 'TO' }, { id: 'FE', texto: 'FE' }], correta: 'GA' },
  { enunciado: 'Qual sílaba você ouve em CASA?', opcoes: [{ id: 'CA', texto: 'CA' }, { id: 'SA', texto: 'SA' }, { id: 'DA', texto: 'DA' }], correta: 'CA' },
];

// Fase 3 — Arrastando o Gelo (OrdenarSequencia): monte a palavra com sílabas
export const arrastandoGelo = [
  { dica: 'BOLA', itens: ['LA', 'BO'], correta: ['BO', 'LA'] },
  { dica: 'PATO', itens: ['TO', 'PA'], correta: ['PA', 'TO'] },
  { dica: 'MESA', itens: ['SA', 'ME'], correta: ['ME', 'SA'] },
  { dica: 'GATO', itens: ['TO', 'GA'], correta: ['GA', 'TO'] },
];