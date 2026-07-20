// src/data/lagos.js

// Fase 1 — Água Mágica (SelecaoUnica com imagens): frase -> imagem
export const aguaMagica = [
  {
    enunciado: 'A menina tem um livro.',
    opcoes: [
      { id: 'certa', imagem: require('../../assets/images/frases/menina_livro.png') },
      { id: 'b', imagem: require('../../assets/images/frases/menino_bola.png') },
      { id: 'c', imagem: require('../../assets/images/frases/cachorro.png') },
    ],
    correta: 'certa',
  },
  // repita para as outras 4 frases do roteiro
];

// Fase 2 — Descobrindo os Lagos (LigarColunas): frase <-> imagem
export const descobrindo = [
  {
    pares: [
      { frase: 'O menino joga bola.', imagem: require('../../assets/images/frases/menino_bola.png') },
      { frase: 'O cachorro é pequeno.', imagem: require('../../assets/images/frases/cachorro.png') },
      { frase: 'A árvore é alta.', imagem: require('../../assets/images/frases/arvore.png') },
    ],
  },
  // pode adicionar mais 2 conjuntos
];

// Fase 3 — Desafio Secreto (DigitarPalavra): escreva o nome
export const secreto = [
  { dica: 'astro que brilha de dia', palavra: 'SOL' },
  { dica: 'pai da criança', palavra: 'PAI' },
  { dica: 'onde ficam as nuvens', palavra: 'CÉU' },
  { dica: 'onde a água corre', palavra: 'RIO' },
];