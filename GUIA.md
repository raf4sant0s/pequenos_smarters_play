# Guia Completo — "Pequenos Smarters" (versão atualizada)

> **Para:** Estefanie e Rafaela
> **O que mudou nesta versão:** o guia foi reescrito pra bater com o projeto **como ele está hoje**, depois da reforma visual. O motor de jogo (6 componentes) e o Supabase continuam valendo; o que mudou foi o **visual** (horizontal, com o design do Figma), a **navegação** e o **pipeline de imagens**. No fim tem **passo a passo de verdade** pra dublagem, sonorização, animação dos personagens e roteiro/história.
>
> **Inspiração de conceito:** o jogo é *levemente* inspirado no **Dragon Mania** (as ilhas flutuantes, o mapa por mundos). É só a fagulha da ideia — a proposta pedagógica e a execução são de vocês.

---

## SUMÁRIO
- Parte 0 — Estado atual do projeto (o que está pronto / o que falta)
- Parte 1 — Tecnologias e ferramentas (para a apresentação/TCC)
- Parte 2 — Git em dupla (essencial)
- Parte 3 — Divisão do trabalho e o "contrato" entre as duas
- Parte 4 — Como o app está montado hoje (arquitetura real)
- Parte 5 — O motor de jogo (6 componentes) e como criar uma ilha nova
- Parte 6 — Imagens: do Figma para o app (passo a passo)
- Parte 7 — Sonorização (efeitos + música) — passo a passo
- Parte 8 — Dublagem / narração (voz) — passo a passo
- Parte 9 — Animação e vida na tela (borboletas, árvores, personagens) — passo a passo
- Parte 10 — Roteiro / história interativa — passo a passo
- Parte 11 — Cronograma sugerido
- Parte 12 — TCC: argumentos e defesa
- Apêndice — Cola de comandos do Git

---

## PARTE 0 — Estado atual do projeto

### ✅ Pronto e funcionando
- App **horizontal** (landscape), rodando no **Expo Go (SDK 54)**.
- **Supabase** ligado: cadastro, login, sessão que lembra, salvar progresso, config.
- **Fluxo de telas** completo: Home → Login/Cadastro → Boas-vindas (Ziggy) → Ilha → Fase → Resultado.
- **Sistema visual** com o design do Figma: fundo de céu, logo, personagens, fontes (Concert One + Baloo 2), barra do topo padrão, popup de configurações com **Sair**.
- **Ilha da Natureza 100% reformada** (a "fatia vertical" da demo): ilha desenhada como cenário principal + 3 fases jogáveis (Floresta das Vogais, Campo das letras, Lago das vogais) + tela de Resultado com estrelas.
- **Motor de jogo** (6 componentes) já redesenhado nos que a Natureza usa (`SelecaoUnica`, `EncontrarAlvos`).
- **Pipeline de imagens**: PNG em alta (otimizado) **e** SVG (react-native-svg) já configurados.

### 🔜 O que falta (as próximas features)
- Reformar as **outras 5 ilhas** (Deserto, Gelo, Ventos, Fogo, Lagos): tela de ilha + fases no novo visual. *Cada ilha vira uma feature/branch* — e é rápido, porque o motor já existe.
- **Telas/artes das próximas fases** feitas no Figma e exportadas (Parte 6).
- **Sonorização** (Parte 7) e **dublagem** (Parte 8).
- **Animação e vida na tela** (Parte 9).
- **Roteiro/história interativa** (Parte 10) — o texto vocês vão escrever.

---

## PARTE 1 — Tecnologias e ferramentas (para a apresentação/TCC)

| Categoria | Ferramenta | Observação |
|---|---|---|
| App (framework) | **React Native + Expo (SDK 54)** | é app mobile, roda no celular via Expo Go |
| Linguagem | **JavaScript** | |
| Navegação | React Navigation | pilha de telas |
| Backend / Banco | **Supabase** | Auth + banco **PostgreSQL** + segurança RLS |
| Design | **Figma** | telas, personagens, ilhas |
| Vetores/Imagens | react-native-svg + PNG em alta | |
| Versionamento | **Git + GitHub** | branches, PRs |
| Gestão | **Trello** | |
| Editor | **VS Code** | |

> ⚠️ **Não** liste "Node.js" como tecnologia do app: vocês **removeram** o backend em Node/Express e trocaram pelo Supabase. O Node só aparece nos bastidores das ferramentas (npm/Expo), não é o backend do jogo. Se a banca vir "Node.js" no slide, vai perguntar "cadê o servidor Node?" — e ele não existe (de propósito).

---

## PARTE 2 — Git em dupla (essencial)

**Conceitos:** `main` = versão oficial que sempre funciona (ninguém programa direto nela); `branch` = sua cópia de trabalho; `Pull Request (PR)` = pedir pra juntar sua branch na main.

**Regra de ouro:** trabalhem em **pastas diferentes** (a Pessoa A em `services/`, `navigation/`, telas de entrada; a Pessoa B em `game/`, `data/`, telas de ilha). Git só briga quando duas pessoas editam a **mesma linha do mesmo arquivo**.

**O `.gitignore`** (na raiz) precisa conter no mínimo:
```
node_modules/
.expo/
dist/
web-build/
*.log
.DS_Store
```

**Fluxo do dia a dia:**
```bash
git checkout main && git pull origin main      # 1. pega o mais novo
git checkout -b feat/minha-tarefa               # 2. cria sua branch (ou: git checkout feat/x)
# 3. ... programa e testa ...
git add . && git commit -m "mensagem clara"     # 4. salva (faça várias vezes)
git push origin feat/minha-tarefa               # 5. sobe
# 6. no GitHub: abre o PR da sua branch -> main, a dupla revisa e faz Merge
```

**Combinados (colem no Trello):** nunca commitar na `main`; `git pull` antes de começar; commits pequenos e frequentes; só abrir PR quando o app roda; avisar a dupla antes de mexer em arquivo compartilhado (`App.js`, `AppNavigator.js`).

> **Branches que já existem hoje:** `main`, `feat/plataforma`, `feat/jogo`, `feat/integracao` e `feat/reforma-visual` (onde está a reforma visual mais recente). A ideia daqui pra frente: **cada ilha nova em sua própria branch** (`feat/ilha-deserto`, etc.), saindo da branch mais atual.

---

## PARTE 3 — Divisão do trabalho e o "contrato"

| | PESSOA A — Plataforma | PESSOA B — Jogo |
|---|---|---|
| Faz | app funcionar, entrar, salvar, mostrar progresso | as fases divertidas e jogáveis |
| Pastas | `services/`, `navigation/`, `utils/`, telas de entrada/resultado/config/pais | `game/`, `data/`, telas de ilha, componentes do jogo |

### O "contrato" (a parte mais importante)
Toda fase, ao terminar, chama a tela de Resultado passando este pacote:
```js
navigation.replace('Result', {
  estrelas,                 // 1, 2 ou 3
  erros,                    // número de erros
  ilha: 'natureza',         // identifica a ilha
  fase: 'fase2',            // identifica a fase
  faseAtual: 'NaturezaFase2',// rota desta fase (pra "Jogar novamente")
  proximaFase: 'NaturezaFase3', // próxima fase; na última fase da ilha use a rota da PRÓXIMA ilha
  mensagem: 'Você separou as vogais!',
});
```
Os nomes das rotas seguem o padrão **NomeIlhaFaseNúmero** (`NaturezaFase1`, `DesertoFase2`…). A Pessoa B avisa a lista; a Pessoa A registra no `AppNavigator`.

> Mudou em relação ao guia antigo: agora usamos `replace` (não `navigate`) para o Resultado, e passamos também **`faseAtual`** (pra o botão "Jogar novamente" repetir a fase certa). O fluxo é **linear**: ao terminar a última fase de uma ilha, a `proximaFase` aponta para a **próxima ilha**.

---

## PARTE 4 — Como o app está montado hoje (arquitetura real)

### Navegação (mudou!)
Antes o app tinha dois "mundos" (logado/deslogado) que trocavam sozinhos. Agora é **uma pilha só que começa SEMPRE na Home** (`src/navigation/AppNavigator.js`):
- **Home** é a primeira tela sempre (logado ou não).
- O botão ▶ da Home decide: se **já tem login**, vai pro **Welcome (Ziggy)**; se não, vai pro **Login**.
- Login/Cadastro, ao dar certo, fazem `navigation.replace('Welcome')`.
- **Sair** (no popup de config) faz logout no Supabase e `navigation.reset` de volta pra Home.
- O `AuthContext` (`src/navigation/AuthContext.js`) continua guardando a sessão (é ele que a Home consulta pra saber se já tem login).

### Sistema visual (novo)
- **`src/utils/cores.js`** — paleta central (azul, laranja, verde, céu, amarelo…).
- **`src/utils/tema.js`** — as fontes: `titulo` (Baloo 2), `subtitulo`, `texto` (Concert One). Carregadas no `App.js` com `expo-font`/`@expo-google-fonts`.
- **`src/components/Fundo.js`** — fundo de tela (céu por padrão; aceita outro cenário).
- **`src/components/BarraTopo.js`** — a barra do topo padrão: ⚙ config + logo à esquerda; estrelas + "Painel dos Pais" + 🏠 à direita. Já **respeita a área segura** do celular (status bar / barra de botões) e o 🏠 leva pra ilha atual (prop `home`).
- **`src/components/ConfigPopup.js`** — popup de Som/Voz/Créditos/**Sair**.
- Tudo é **horizontal** (`app.json` → `"orientation": "landscape"`).

### Onde ficam as coisas
```
assets/images/   ← fundos, ilhas, personagens, logo, botões, palavras/, frases/
assets/sounds/   ← (vazio por enquanto) efeitos e vozes vão aqui
assets/fonts/    ← (as fontes vêm do @expo-google-fonts, não precisa .ttf aqui)
src/components/  ← Fundo, BarraTopo, ConfigPopup, StarRating
src/screens/     ← Home, Login, Cadastro, Welcome, Result, Settings, Parents
src/screens/islands/ ← as 6 telas de ilha
src/game/        ← os 6 componentes do motor
src/game/fases/  ← as 18 fases (arquivinhos curtos)
src/data/        ← o conteúdo das fases
src/services/    ← supabase, auth, progresso, config (e futuramente som, voz)
src/utils/       ← cores, estrelas, tema
```

---

## PARTE 5 — O motor de jogo e como criar uma ilha nova

Os **6 componentes** (em `src/game/`) continuam sendo o coração:

| Componente | Serve para |
|---|---|
| `SelecaoUnica` | clicar na opção certa (letra, sílaba, palavra **ou imagem**) |
| `EncontrarAlvos` | tocar em vários itens que seguem uma regra (ex: as vogais) |
| `JogoMemoria` | virar cartões e achar pares |
| `OrdenarSequencia` | tocar itens na ordem certa |
| `DigitarPalavra` | digitar e validar letra por letra |
| `LigarColunas` | ligar cada frase à imagem certa |

> Os componentes que a Natureza usa (`SelecaoUnica`, `EncontrarAlvos`) já estão no **visual novo** (cenário + personagem + cartas com brilho + toque responde na hora). Os outros 4 ainda estão no visual antigo — quando for fazer as ilhas que os usam, dá pra deixá-los bonitos do mesmo jeito (use `SelecaoUnica`/`EncontrarAlvos` como modelo).

### Receita para adicionar uma ilha nova (ex.: Deserto)
1. **Dados** — preencha `src/data/deserto.js` (já existe um esqueleto).
2. **3 fases** — em `src/game/fases/` já existem `DesertoFase1/2/3.js`. Confira o `ilha`, `fase`, `faseAtual` e `proximaFase` (a última fase da ilha aponta pra próxima ilha, ex.: `'Gelo'`).
3. **Tela da ilha** — reescreva `src/screens/islands/DesertoScreen.js` no molde da `NaturezaScreen.js`: `Fundo` (céu) + `BarraTopo` + a **arte da ilha** no centro + os 3 botões de fase posicionados sobre ela.
4. **Arte da ilha** — exporte a ilha do Figma (Parte 6) e salve como `assets/images/ilhaDeserto.png`.
5. **Registrar** — confira no `AppNavigator.js` que a ilha e as 3 fases estão registradas (já estão).
6. **Testar** e commitar (numa branch `feat/ilha-deserto`).

### Detalhe das opções com imagem (para fases de figura)
O `SelecaoUnica` aceita **dois jeitos** de imagem numa opção:
```js
// PNG (imagem em alta exportada do Figma):
{ id: 'gato', imagem: require('../../assets/images/palavras/gato.png') }
// OU SVG (vetor):
import Gato from '../../assets/images/palavras/gato.svg';
{ id: 'gato', Imagem: Gato }
```
Use `imagem:` (require de PNG) para as artes detalhadas vindas do Figma. Use `Imagem:` (SVG) só para desenhos simples/planos.

---

## PARTE 6 — Imagens: do Figma para o app (passo a passo)

O plano de vocês é fazer as telas das próximas fases no Figma e trazer em alta qualidade. O jeito certo:

### Passo a passo
1. **No Figma**, selecione o elemento/quadro que quer exportar.
2. No painel **Export** (canto inferior direito), clique em **+**.
3. Escolha o formato e o tamanho **certo pra celular** (evite arquivos gigantes):
   - **Fundos/cenários** → PNG, largura ~**1600px** (no Figma, se o quadro tem 800px, exporte em **2x**).
   - **Ilhas** → PNG, ~**1400px**.
   - **Personagens** → PNG, ~**600px** (2x/3x do tamanho que aparece).
   - **Objetos pequenos** (letras, ícones, borboleta) → PNG ~**300–500px**, ou **SVG** se for desenho simples/plano.
4. Exporte e **salve com nomes sem espaço/acento** dentro de `assets/images/` (ou subpastas `palavras/`, `frases/`).
5. No código, use `require('../../assets/images/...png')` (o caminho que a fase espera).

### ⚠️ Regra de ouro do tamanho
Imagem de **11 MB trava o celular**. Um fundo de tela num celular precisa de ~1600px de largura, não 4000px. Exporte no tamanho da tabela acima. Se um PNG passar de ~2 MB, reduza (dá pra reexportar no Figma num tamanho menor, ou usar um site tipo *squoosh.app* pra comprimir).

### Dica para as animações (Parte 9)
Se você quer **borboletas voando** e **árvores balançando**, exporte esses elementos como **PNG separados** (uma borboleta sozinha, uma árvore sozinha, com fundo transparente). Só dá pra animar uma coisa se ela for uma imagem própria — não dá pra animar um pedacinho de dentro de uma imagem "chapada" da ilha inteira.

---

## PARTE 7 — Sonorização (efeitos + música) — passo a passo

Objetivo: sons de **acerto**, **erro**, **toque**, uma **fanfarra** no Parabéns e (opcional) uma **música de fundo** suave.

### Passo 1 — Conseguir os sons (legalmente)
Use áudios **livres de direitos** (CC0 / royalty-free). Bons lugares grátis:
- **mixkit.co/free-sound-effects** • **pixabay.com/sound-effects** • **freesound.org** (confira a licença).
Baixe sons **curtos** (acerto/erro ~1s). Guarde a lista do que usou pra pôr nos **Créditos** (aparece no popup de config).

### Passo 2 — Organizar os arquivos
Converta para **.mp3** (leve) e salve em `assets/sounds/`:
```
assets/sounds/acerto.mp3
assets/sounds/erro.mp3
assets/sounds/toque.mp3
assets/sounds/parabens.mp3
assets/sounds/musica.mp3   (opcional, loop suave)
```
> ⚠️ Só crie o `som.js` do próximo passo **depois** de colocar os arquivos, senão o `require` de um arquivo que não existe quebra o app.

### Passo 3 — Criar o serviço de som
`expo-audio` já está instalado. Crie **`src/services/som.js`**:
```js
// src/services/som.js
import { createAudioPlayer } from 'expo-audio';

// Flag global: o toggle "Som" das configurações liga/desliga isto.
let somLigado = true;
export function setSomLigado(v) { somLigado = v; }

// Cria cada player UMA vez (reaproveita). Arquivos em assets/sounds/.
const players = {
  acerto: createAudioPlayer(require('../../assets/sounds/acerto.mp3')),
  erro: createAudioPlayer(require('../../assets/sounds/erro.mp3')),
  toque: createAudioPlayer(require('../../assets/sounds/toque.mp3')),
  parabens: createAudioPlayer(require('../../assets/sounds/parabens.mp3')),
};

// Toca um efeito pelo nome (ex.: tocar('acerto'))
export function tocar(nome) {
  if (!somLigado) return;
  const p = players[nome];
  if (!p) return;
  try {
    p.seekTo(0);   // volta ao início (pra poder repetir rápido)
    p.play();
  } catch (e) {}
}

// Música de fundo (opcional)
const musica = createAudioPlayer(require('../../assets/sounds/musica.mp3'));
musica.loop = true;
export function tocarMusica() { if (somLigado) { try { musica.play(); } catch (e) {} } }
export function pararMusica() { try { musica.pause(); } catch (e) {} }
```
> 📌 O `expo-audio` mudou em relação ao antigo `expo-av`. Se algum método tiver outro nome, confira a doc da **sua** versão: https://docs.expo.dev/versions/v54.0.0/sdk/audio/

### Passo 4 — Tocar nos momentos certos
- No `SelecaoUnica.js` / `EncontrarAlvos.js`, dentro do acerto/erro:
  ```js
  import { tocar } from '../services/som';
  // ...quando acerta:
  tocar('acerto');
  // ...quando erra:
  tocar('erro');
  ```
- No `ResultScreen.js`, no `useEffect`: `tocar('parabens');`
- Música: chame `tocarMusica()` ao entrar no jogo (ex.: no `WelcomeScreen`) e `pararMusica()` ao sair.

### Passo 5 — Respeitar o botão "Som"
No `ConfigPopup`/`BarraTopo`, quando o switch de Som muda, chame `setSomLigado(novoValor)`. (E, se quiser lembrar entre sessões, salve com o serviço `config.js` que já existe.)

---

## PARTE 8 — Dublagem / narração (voz) — passo a passo

Objetivo: o jogo **fala** com a criança — lê a instrução ("Clique na vogal"), fala o nome das letras, narra a história. Como "ficar bom de verdade":

### Escolha do tipo de voz (do melhor pro mais simples)
1. **Voz humana gravada** (recomendado pra criança): alguém lê as falas com entonação carinhosa. Grave no celular ou no **Audacity** (grátis), exporte cada fala como um arquivo. É o que soa mais acolhedor.
2. **TTS premium** (ElevenLabs, Google Cloud TTS, Azure): geram vozes muito naturais em pt-BR. Você digita o texto, baixa o áudio. Ótimo se não quiser gravar.
3. **TTS no aparelho** (`expo-speech`): robótico, mas instantâneo e serve de "quebra-galho" pra textos dinâmicos.

> Para o TCC, o ideal é **1 ou 2** (arquivos de áudio de qualidade). Deixe o `expo-speech` como plano B.

### Passo 1 — Escrever o roteiro de falas
Liste **todas** as frases faladas. Ex.:
```
clique_na_vogal   → "Clique na vogal!"
clique_na_consoante → "Clique na consoante!"
letra_a → "A"   letra_e → "E"   ... (as letras)
parabens → "Parabéns! Você conseguiu!"
historia_1 → "Olá! Eu sou o Ziggy..."   (as falas da história)
```

### Passo 2 — Gravar/gerar e organizar
Salve cada fala como .mp3 em `assets/sounds/voz/`, com o mesmo nome da chave:
```
assets/sounds/voz/clique_na_vogal.mp3
assets/sounds/voz/letra_a.mp3
assets/sounds/voz/parabens.mp3
...
```

### Passo 3 — Serviço de voz
Crie **`src/services/voz.js`**:
```js
// src/services/voz.js
import { createAudioPlayer } from 'expo-audio';

let vozLigada = true;
export function setVozLigada(v) { vozLigada = v; }

// Um player por fala (arquivos em assets/sounds/voz/)
const falas = {
  clique_na_vogal: createAudioPlayer(require('../../assets/sounds/voz/clique_na_vogal.mp3')),
  letra_a: createAudioPlayer(require('../../assets/sounds/voz/letra_a.mp3')),
  parabens: createAudioPlayer(require('../../assets/sounds/voz/parabens.mp3')),
  // ...adicione todas as chaves aqui...
};

export function falar(chave) {
  if (!vozLigada) return;
  const p = falas[chave];
  if (!p) return;
  try { p.seekTo(0); p.play(); } catch (e) {}
}
```

### Passo 4 — Usar
- O **botão 🔊** que já existe na fase chama `falar('clique_na_vogal')`.
- Na história (Parte 10), cada fala toca sua voz.
- O switch **Voz** das configurações chama `setVozLigada(valor)`.

### Plano B para texto dinâmico (expo-speech)
```bash
npx expo install expo-speech
```
```js
import * as Speech from 'expo-speech';
Speech.speak('Clique na vogal', { language: 'pt-BR', rate: 0.9 });
```

---

## PARTE 9 — Animação e vida na tela — passo a passo

Objetivo: borboletas voando, árvores balançando, personagens com movimentinho. Duas ferramentas:
- **Animated** (já vem no React Native): perfeito pra movimentos em **loop** (flutuar, balançar, pulsar). É o suficiente pro MVP e não precisa instalar nada.
- **Lottie** (`lottie-react-native`): pra animações **ricas** de personagem (ex.: o Ziggy piscando/acenando), feitas no After Effects ou baixadas do **lottiefiles.com**. É o "ficar bom de verdade" de personagem.

> Lembre da Parte 6: pra animar borboleta/árvore, elas precisam ser **imagens separadas** (PNG transparente), não parte da imagem da ilha.

### A) Borboleta voando (Animated) — componente reutilizável
Exporte uma `borboleta.png` (transparente) e crie **`src/components/Borboleta.js`**:
```js
// src/components/Borboleta.js
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const BORBOLETA = require('../../assets/images/borboleta.png');

export default function Borboleta({ style, tamanho = 34 }) {
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // vai e volta na horizontal, devagar
    Animated.loop(Animated.sequence([
      Animated.timing(x, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(x, { toValue: 0, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ])).start();
    // sobe e desce, mais rápido (efeito "batendo asas")
    Animated.loop(Animated.sequence([
      Animated.timing(y, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 1200, useNativeDriver: true }),
    ])).start();
  }, []);

  const translateX = x.interpolate({ inputRange: [0, 1], outputRange: [0, 120] });
  const translateY = y.interpolate({ inputRange: [0, 1], outputRange: [0, -22] });

  return (
    <Animated.Image
      source={BORBOLETA}
      style={[{ position: 'absolute', width: tamanho, height: tamanho }, style, { transform: [{ translateX }, { translateY }] }]}
    />
  );
}
```
Use na tela da ilha: `<Borboleta style={{ top: '30%', left: '40%' }} />` (pode pôr várias em posições diferentes).

### B) Balançar (árvore, arbusto) — Animated
Crie **`src/components/Balanca.js`** (envolve qualquer imagem e faz ela balançar de leve):
```js
// src/components/Balanca.js
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export default function Balanca({ children, style }) {
  const r = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(r, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(r, { toValue: -1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ])).start();
  }, []);
  const rotate = r.interpolate({ inputRange: [-1, 1], outputRange: ['-3deg', '3deg'] });
  return <Animated.View style={[style, { transform: [{ rotate }] }]}>{children}</Animated.View>;
}
```
Use: `<Balanca style={{ position:'absolute', top:'20%', left:'30%' }}><Image source={arvore} .../></Balanca>`.

### C) Personagem rico (Lottie) — o upgrade
```bash
npx expo install lottie-react-native
```
```js
import LottieView from 'lottie-react-native';
<LottieView source={require('../../assets/animacoes/ziggy_acena.json')} autoPlay loop style={{ width: 200, height: 260 }} />
```
Baixe animações prontas em **lottiefiles.com** (tem muitas grátis) ou peça pra alguém exportar do After Effects como Lottie/JSON.

---

## PARTE 10 — Roteiro / história interativa — passo a passo

Objetivo: o jogo conta uma **história** (o Ziggy conversando, apresentando cada ilha, dando missões). Vocês escrevem o texto; aqui está a **estrutura** pra plugar.

### Passo 1 — Escrever o roteiro (dados)
Crie **`src/data/historia.js`** com listas de falas por momento:
```js
// src/data/historia.js
const ZIGGY = require('../../assets/images/ziggy.png');

// Cada fala: quem fala (imagem), o texto, e (opcional) a chave da voz gravada.
export const introNatureza = [
  { personagem: ZIGGY, texto: 'Bem-vindo à Ilha da Natureza!', voz: 'historia_1' },
  { personagem: ZIGGY, texto: 'Aqui vamos aprender as vogais brincando. Vamos?', voz: 'historia_2' },
];
// ...crie introDeserto, introGelo, etc. conforme escreverem o roteiro.
```

### Passo 2 — Componente de diálogo
Crie **`src/components/Dialogo.js`** (mostra uma fala por vez; toca pra avançar; toca a voz):
```js
// src/components/Dialogo.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';
import { falar } from '../services/voz'; // se ainda não tiver voz, comente esta linha

export default function Dialogo({ falas, onFim }) {
  const [i, setI] = useState(0);
  const fala = falas[i];

  useEffect(() => {
    if (fala && fala.voz) falar(fala.voz); // toca a narração da fala
  }, [i]);

  function avancar() {
    if (i + 1 >= falas.length) onFim();
    else setI(i + 1);
  }

  return (
    <Pressable style={styles.overlay} onPress={avancar}>
      {fala.personagem && (
        <Image source={fala.personagem} style={styles.personagem} resizeMode="contain" />
      )}
      <View style={styles.balao}>
        <Text style={styles.texto}>{fala.texto}</Text>
        <Text style={styles.toque}>toque para continuar ▸</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)', flexDirection: 'row', alignItems: 'flex-end', padding: 20 },
  personagem: { width: '28%', height: '70%' },
  balao: { flex: 1, backgroundColor: cores.laranja, borderRadius: 22, padding: 20, marginLeft: 8, marginBottom: 20, borderWidth: 3, borderColor: cores.branco },
  texto: { fontFamily: fontes.texto, fontSize: 20, color: cores.branco, lineHeight: 28 },
  toque: { fontFamily: fontes.subtitulo, fontSize: 13, color: cores.branco, opacity: 0.85, marginTop: 10, textAlign: 'right' },
});
```

### Passo 3 — Mostrar a história
Ex.: na tela da ilha, mostrar a intro **uma vez** antes de liberar as fases:
```js
import { useState } from 'react';
import Dialogo from '../../components/Dialogo';
import { introNatureza } from '../../data/historia';

// dentro do componente da tela:
const [mostrarHistoria, setMostrarHistoria] = useState(true);
// ...no return, por cima de tudo:
{mostrarHistoria && <Dialogo falas={introNatureza} onFim={() => setMostrarHistoria(false)} />}
```
Depois dá pra guardar no Supabase que a criança já viu a história (pra não repetir) — mas isso é refinamento.

---

## PARTE 11 — Cronograma sugerido (Trello)

Colunas **A Fazer / Fazendo / Feito**, uma etiqueta de cor por pessoa.
- **Agora:** reformar as outras 5 ilhas (uma por vez, cada uma numa branch). Cada ilha = arte do Figma + tela de ilha + revisar as 3 fases.
- **Depois das ilhas:** Parte 6 (exportar todas as artes das fases de imagem).
- **Camada de polimento:** Parte 7 (som) → Parte 8 (voz) → Parte 9 (animação) → Parte 10 (história).
- **Reta final:** ajustes, testes de ponta a ponta no celular, prints pro TCC, ensaio da apresentação.

> **Regra de sobrevivência do TCC:** garanta o MVP funcionando (cadastro/login, ilha, fases, estrelas, progresso salvo, painel dos pais) — já está! O resto (som, voz, animação, história) é o que transforma de "funciona" em "encanta". Faça na ordem acima; se faltar tempo, corte de trás pra frente.

---

## PARTE 12 — TCC: argumentos e defesa

- **Por que Supabase (e não backend próprio):** "Substituímos a arquitetura de backend próprio (Node/Express) pela plataforma Supabase, que já oferece banco **PostgreSQL** gerenciado, autenticação e **segurança em nível de linha (RLS)**. Isso reduziu a complexidade e os pontos de falha, deixando o foco na experiência do jogo e na progressão pedagógica." (O PostgreSQL **continua** sendo o banco — via Supabase.)
- **Arquitetura do jogo (ponto forte):** "As 18 fases foram **componentizadas em 6 mecânicas reutilizáveis**. Cada fase é um componente + um conjunto de dados, o que aumenta a manutenibilidade e a consistência pedagógica."
- **Segurança de dados infantis:** o RLS garante que cada responsável só acessa os dados da própria criança, mesmo com a chave pública dentro do app.
- **Acessibilidade/experiência:** jogo em **tela cheia horizontal**, com **narração em voz** (dublagem), sons e feedback visual — pensado para crianças em alfabetização.
- **Uso de IA (honesto):** "A IA foi usada como apoio — geração de variações de conteúdo, revisão de textos, organização do guia e apoio na implementação — enquanto a lógica pedagógica e as decisões de arquitetura foram conduzidas pela equipe."
- **Figuras/anexos:** fluxo (Home→Login→Ilha→Fase→Resultado→Supabase), estrutura de pastas, prints do Supabase com as tabelas e o progresso real, a tabela "fase → componente", e a referência de conceito (Dragon Mania) citada honestamente.
- **Na defesa:** deixe o app rodando no celular (Expo Go). Um vídeo curto de uma criança jogando convence mais que slide.

---

## APÊNDICE — Cola de comandos do Git
```bash
git status                              # o que mudei / em que branch estou
git checkout main && git pull origin main   # pega o mais novo
git checkout -b feat/ilha-deserto       # cria branch nova
git add . && git commit -m "mensagem clara"
git push origin feat/ilha-deserto
git merge main                          # traz o mais novo da main pra sua branch
git log --oneline                       # histórico resumido
```
Rodar o app (na pasta com `App.js`):
```bash
npm install        # 1ª vez, ou quando alguém adicionou dependência
npx expo start -c  # abre o Expo (o -c limpa o cache); leia o QR no Expo Go
```

---

*Vocês conseguem. O caminho continua o mesmo: rodar → ver funcionando → mudar uma coisinha → entender. Um passo de cada vez, sempre commitando o que já funciona.* 💛
