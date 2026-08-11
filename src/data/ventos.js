// src/data/ventos.js
// Imagens vetoriais (SVG) — viram componentes graças ao react-native-svg-transformer
import Gato from '../../assets/images/palavras/gato.svg';
import Bola from '../../assets/images/palavras/bola.svg';
import Casa from '../../assets/images/palavras/casa.svg';
import Pato from '../../assets/images/palavras/pato.svg';

// As 4 opções de imagem são sempre as mesmas; muda só a palavra pedida e a correta.
const OPCOES_PALAVRAS = [
  { id: 'gato', Imagem: Gato },
  { id: 'bola', Imagem: Bola },
  { id: 'casa', Imagem: Casa },
  { id: 'pato', Imagem: Pato },
];

// Fase 1 — Árvore dos Pensamentos (SelecaoUnica com imagens): palavra -> imagem
export const arvorePensamentos = [
  { enunciado: 'GATO', opcoes: OPCOES_PALAVRAS, correta: 'gato' },
  { enunciado: 'BOLA', opcoes: OPCOES_PALAVRAS, correta: 'bola' },
  { enunciado: 'CASA', opcoes: OPCOES_PALAVRAS, correta: 'casa' },
  { enunciado: 'PATO', opcoes: OPCOES_PALAVRAS, correta: 'pato' },
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
