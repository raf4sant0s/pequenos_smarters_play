// src/data/lagos.js
import MeninaLivro from '../../assets/images/frases/menina_livro.svg';
import MeninoBola from '../../assets/images/frases/menino_bola.svg';
import Cachorro from '../../assets/images/frases/cachorro.svg';
import Arvore from '../../assets/images/frases/arvore.svg';

// As opções de imagem se repetem; muda a frase e a correta.
const OPCOES_CENA = [
  { id: 'menina', Imagem: MeninaLivro },
  { id: 'menino', Imagem: MeninoBola },
  { id: 'cachorro', Imagem: Cachorro },
];

// Fase 1 — Água Mágica (SelecaoUnica com imagens): frase -> imagem
export const aguaMagica = [
  { enunciado: 'A menina tem um livro.', opcoes: OPCOES_CENA, correta: 'menina' },
  { enunciado: 'O menino joga bola.', opcoes: OPCOES_CENA, correta: 'menino' },
  { enunciado: 'O cachorro é pequeno.', opcoes: OPCOES_CENA, correta: 'cachorro' },
];

// Fase 2 — Descobrindo os Lagos (LigarColunas): frase <-> imagem
export const descobrindo = [
  {
    pares: [
      { frase: 'O menino joga bola.', Imagem: MeninoBola },
      { frase: 'O cachorro é pequeno.', Imagem: Cachorro },
      { frase: 'A árvore é alta.', Imagem: Arvore },
    ],
  },
];

// Fase 3 — Desafio Secreto (DigitarPalavra): escreva o nome
export const secreto = [
  { dica: 'astro que brilha de dia', palavra: 'SOL' },
  { dica: 'pai da criança', palavra: 'PAI' },
  { dica: 'onde ficam as nuvens', palavra: 'CÉU' },
  { dica: 'onde a água corre', palavra: 'RIO' },
];
