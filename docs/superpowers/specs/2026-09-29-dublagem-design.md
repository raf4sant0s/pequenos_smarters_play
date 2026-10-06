# Design — Dublagem do jogo (áudios já existentes)

Data: 2026-09-29
Branch de trabalho: (a criar) `feat/dublagem`

## Objetivo

Ligar os 18 áudios de voz que já estão em `assets/sounds/` (`.mpeg`) aos
lugares certos do jogo, respeitando o volume "Voz" (`vozVol`) e sem que dois
personagens falem por cima um do outro.

## Convenção dos arquivos

`<contexto>_<voz>.mpeg`, onde `voz` ∈ { `vozgeral`, `ziggy`, `pipo`, `lina` }.

## Mecanismo

- **Canal único de voz** no `AudioContext`: um player dedicado criado com
  `createAudioPlayer(null)` (expo-audio SDK 57). Uma função
  `tocarVoz(nome)` faz `player.replace(VOZES[nome])` + `player.volume =
  vozVol/100` + `player.play()`.
- Como é um só player, um novo áudio **interrompe** o anterior (nunca dois
  personagens ao mesmo tempo).
- `VOZES` é um mapa `nome -> require('.../arquivo.mpeg')` (require estático,
  exigido pelo Metro).
- `setVozVol` também ajusta o volume do player ao vivo (igual `setSomVol` faz
  com a música).
- **Metro:** adicionar `'mpeg'` ao `assetExts` do `metro.config.js` (o Metro
  não empacota `.mpeg` por padrão). Não renomeia os arquivos da Rafaela.

## Comportamento

- **Automáticos (sem clique):**
  - `saudacao_ziggy` — ao abrir a `WelcomeScreen`.
  - Balão de fala da fase — ao entrar na fase (e repete ao tocar no alto-falante):
    - Floresta das Vogais → `encontrevogais_ziggy`
    - Lago das Consoantes → `cliquenaconsoante_pipo`
  - Nome da ilha — ao **entrar na tela da ilha** e ao **tocar na ilha no Mapa**:
    - Ilha da Natureza → `ilhadanatureza_vozgeral`
- **Por clique:**
  - Nome da fase (ao tocar no marcador, opção A: toca e entra em seguida):
    - `florestadasvogais_vozgeral`, `lagodasconsoantes_vozgeral`, `campodasletras_vozgeral`
  - Botões gerais: `configuracoes_vozgeral` (⚙), `som_vozgeral` (🔊),
    `voz_vozgeral` (🎤), `paineldospais_vozgeral`, `sairdojogo_vozgeral`.
  - Result: `jogarnovamente_<personagem>` e `proximafase_<personagem>`,
    escolhidos pelo `personagem` que a fase já passa ao `ResultScreen`
    (ziggy / pipo / lina).

## Decisão de UX (aprovada)

Opção **A**: ao tocar num marcador de fase, a voz do nome toca e o jogo entra
logo em seguida (a voz pode ser cortada pela transição). Motivo: fluidez para a
criança; a orientação principal vem do balão de fala dentro da fase.

## Arquivos tocados

1. `metro.config.js` — `assetExts` + `'mpeg'`.
2. `src/navigation/AudioContext.js` — `VOZES`, canal de voz, `tocarVoz`, `setVozVol`.
3. `src/screens/WelcomeScreen.js` — `saudacao_ziggy` no mount.
4. `src/screens/MapScreen.js` — nome da ilha ao tocar (campo `voz` por ilha).
5. `src/screens/islands/NaturezaScreen.js` — nome da ilha no mount + `voz` nos marcadores.
6. `src/components/MarcadorFase.js` — prop `voz`, toca ao destravar/pressionar.
7. `src/components/BarraTopo.js` — `configuracoes_vozgeral` ao abrir ⚙.
8. `src/components/ConfigPopup.js` — som/voz/painel/sair.
9. `src/screens/ResultScreen.js` — jogar novamente / próxima fase por personagem.
10. `src/game/EncontrarAlvos.js` + `src/game/fases/NaturezaFase1.js` — balão Floresta.
11. `src/game/LagoLetras.js` + `src/game/fases/NaturezaFase2.js` — balão Lago.

## Escopo

Só os áudios que já existem na pasta. As demais ilhas/fases recebem voz quando
os arquivos forem criados (basta acrescentar ao mapa `VOZES` e passar o nome).
