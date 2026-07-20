// src/data/ventos.js

// Fase 1 — Árvore dos Pensamentos (SelecaoUnica com imagens): palavra -> imagem
export const arvorePensamentos = [
  {
    enunciado: 'GATO',
    opcoes: [
      { id: 'gato', imagem: require('../../assets/images/palavras/gato.png') },
      { id: 'bola', imagem: require('../../assets/images/palavras/bola.png') },
      { id: 'casa', imagem: require('../../assets/images/palavras/casa.png') },
      { id: 'pato', imagem: require('../../assets/images/palavras/pato.png') },
    ],
    correta: 'gato',
  },
  // repita para BOLA, CASA, PATO, MESA trocando o enunciado e o "correta"
];

// Fase 2 — Ventos da Sabedoria (SelecaoUnica): complete com a sílaba
export const ventosSabedoria = [
  { enunciado: 'Complete: BOLA', destaque: 'BO _', opcoes: [{ id: 'LA', texto: 'LA' }, { id: 'PE', texto: 'PE' }, { id: 'CA', texto: 'CA' }], correta: 'LA' },
  { enunciado: 'Complete: GATO', destaque: 'GA _', opcoes: [{ id: 'TO', texto: 'TO' }, { id: 'LA', texto: 'LA' }, { id: 'PE', texto: 'PE' }], correta: 'TO' },
  { enunciado: 'Complete: MESA', destaque: 'ME _', opcoes: [{ id: 'SA', texto: 'SA' }, { id: 'LU', texto: 'LU' }, { id: 'BO', texto: 'BO' }], correta: 'SA' },
  { enunciado: 'Complete: PATO', destaque: 'PA _', opcoes: [{ id: 'TO', texto: 'TO' }, { id: 'LA', texto: 'LA' }, { id: 'CA', texto: 'CA' }], correta: 'TO' },
  { enunciado: 'Complete: CASA', destaque: 'CA _', opcoes: [{ id: 'SA', texto: 'SA' }, { id: 'TO', texto: 'TO' }, { id: 'PE', texto: 'PE' }], correta: 'SA' },
];

// Fase 3 — Indo Contra a Ventania (OrdenarSequencia): monte a frase
export const ventania = [
  { dica: 'Sobre o gato', itens: ['GATO', 'O', 'BONITO', 'É'], correta: ['O', 'GATO', 'É', 'BONITO'] },
  { dica: 'Sobre a bola', itens: ['AZUL', 'BOLA', 'A', 'É'], correta: ['A', 'BOLA', 'É', 'AZUL'] },
  { dica: 'Sobre você', itens: ['LER', 'AMO', 'EU'], correta: ['EU', 'AMO', 'LER'] },
];