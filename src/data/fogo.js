// src/data/fogo.js

// Fase 1 — Vulcão Misterioso (SelecaoUnica com imagens): frase -> imagem
export const vulcao = [
  {
    enunciado: 'O gato dorme.',
    opcoes: [
      { id: 'certa', imagem: require('../../assets/images/frases/gato_dorme.png') },
      { id: 'b', imagem: require('../../assets/images/frases/gato_corre.png') },
      { id: 'c', imagem: require('../../assets/images/frases/gato_come.png') },
    ],
    correta: 'certa',
  },
  // repita para: "A bola é vermelha.", "O menino lê.", "A casa é grande.", "O pato nada."
];

// Fase 2 — Piscina Vulcânica (SelecaoUnica): complete a frase com a palavra
export const piscina = [
  { enunciado: 'O ___ late.', opcoes: [{ id: 'GATO', texto: 'GATO' }, { id: 'CÃO', texto: 'CÃO' }, { id: 'PATO', texto: 'PATO' }], correta: 'CÃO' },
  { enunciado: 'A ___ voa.', opcoes: [{ id: 'PEIXE', texto: 'PEIXE' }, { id: 'AVE', texto: 'AVE' }, { id: 'BOLA', texto: 'BOLA' }], correta: 'AVE' },
  { enunciado: 'Eu como ___.', opcoes: [{ id: 'LIVRO', texto: 'LIVRO' }, { id: 'PÃO', texto: 'PÃO' }, { id: 'PEDRA', texto: 'PEDRA' }], correta: 'PÃO' },
  { enunciado: 'A criança ___.', opcoes: [{ id: 'BRINCA', texto: 'BRINCA' }, { id: 'PEDRA', texto: 'PEDRA' }, { id: 'AZUL', texto: 'AZUL' }], correta: 'BRINCA' },
  { enunciado: 'O sol é ___.', opcoes: [{ id: 'FRIO', texto: 'FRIO' }, { id: 'QUENTE', texto: 'QUENTE' }, { id: 'TRISTE', texto: 'TRISTE' }], correta: 'QUENTE' },
];

// Fase 3 — O Chão é Lava (OrdenarSequencia): monte a frase
export const chaoLava = [
  { dica: 'Complete a frase', itens: ['bonito', 'gato', 'é', 'O'], correta: ['O', 'gato', 'é', 'bonito'] },
  { dica: 'Complete a frase', itens: ['nada', 'pato', 'O'], correta: ['O', 'pato', 'nada'] },
  { dica: 'Complete a frase', itens: ['lê', 'menino', 'O'], correta: ['O', 'menino', 'lê'] },
  { dica: 'Complete a frase', itens: ['grande', 'é', 'casa', 'A'], correta: ['A', 'casa', 'é', 'grande'] },
];