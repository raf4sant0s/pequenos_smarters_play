// src/navigation/AudioContext.js
// Toca a música de fundo em loop, o som de clique em qualquer toque, os efeitos
// (acerto/erro) e a DUBLAGEM (vozes dos personagens e botões). O volume "Som"
// controla música/efeitos; o volume "Voz" controla a dublagem — os dois são
// compartilhados com o popup de Configurações.
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useAudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const MUSICA = require('../../assets/sounds/musica_fundo.mp3');
const CLIQUE = require('../../assets/sounds/som_clique.mp3');
const ACERTO = require('../../assets/sounds/som_acerto.mp3');
const ERRO = require('../../assets/sounds/som_erro.mp3');

// Quanto a música cai enquanto uma voz fala (ducking): 0.25 = 25% do volume atual.
const MUSICA_DUCK = 0.25;

// Mapa das vozes (dublagem). Nome -> arquivo. Para acrescentar uma nova voz,
// basta colocar o .mp3 na pasta sounds e adicionar uma linha aqui.
const VOZES = {
  // Ziggy
  saudacao_ziggy: require('../../assets/sounds/saudacao_ziggy.mp3'),
  encontrevogais_ziggy: require('../../assets/sounds/encontrevogais_ziggy.mp3'),
  jogarnovamente_ziggy: require('../../assets/sounds/jogarnovamente_ziggy.mp3'),
  proximafase_ziggy: require('../../assets/sounds/proximafase_ziggy.mp3'),
  // Pipo
  cliquenaconsoante_pipo: require('../../assets/sounds/cliquenaconsoante_pipo.mp3'),
  jogarnovamente_pipo: require('../../assets/sounds/jogarnovamente_pipo.mp3'),
  proximafase_pipo: require('../../assets/sounds/proximafase_pipo.mp3'),
  // Lina
  jogarnovamente_lina: require('../../assets/sounds/jogarnovamente_lina.mp3'),
  proximafase_lina: require('../../assets/sounds/proximafase_lina.mp3'),
  // Lina — palavras do Campo das Letras (nome do objeto de cada rodada)
  cachorro_lina: require('../../assets/sounds/cachorro_lina.mp3'),
  aviao_lina: require('../../assets/sounds/aviao_lina.mp3'),
  elefante_lina: require('../../assets/sounds/elefante_lina.mp3'),
  'maça_lina': require('../../assets/sounds/maça_lina.mp3'),
  flor_lina: require('../../assets/sounds/flor_lina.mp3'),
  // Voz geral — nomes de ilha/fase
  ilhadanatureza_vozgeral: require('../../assets/sounds/ilhadanatureza_vozgeral.mp3'),
  florestadasvogais_vozgeral: require('../../assets/sounds/florestadasvogais_vozgeral.mp3'),
  lagodasconsoantes_vozgeral: require('../../assets/sounds/lagodasconsoantes_vozgeral.mp3'),
  campodasletras_vozgeral: require('../../assets/sounds/campodasletras_vozgeral.mp3'),
  // Voz geral — botões
  configuracoes_vozgeral: require('../../assets/sounds/configuracoes_vozgeral.mp3'),
  som_vozgeral: require('../../assets/sounds/som_vozgeral.mp3'),
  voz_vozgeral: require('../../assets/sounds/voz_vozgeral.mp3'),
  paineldospais_vozgeral: require('../../assets/sounds/paineldospais_vozgeral.mp3'),
  sairdojogo_vozgeral: require('../../assets/sounds/sairdojogo_vozgeral.mp3'),
};

const AudioContext = createContext({
  somVol: 70, setSomVol: () => {},
  vozVol: 85, setVozVol: () => {},
  tocarClique: () => {},
  tocarAcerto: () => {},
  tocarErro: () => {},
  tocarVoz: () => {},
  tocarVozes: () => {},
});

export function AudioProvider({ children }) {
  const musica = useAudioPlayer(MUSICA);
  const clique = useAudioPlayer(CLIQUE);
  const acerto = useAudioPlayer(ACERTO);
  const erro = useAudioPlayer(ERRO);
  const [somVol, setSomVolState] = useState(70);
  const [vozVol, setVozVolState] = useState(85);

  // Canal único de voz (dublagem): um player só, então uma fala interrompe a
  // anterior — nunca dois personagens falam ao mesmo tempo.
  const vozRef = useRef(null);

  // Refs sempre com o valor atual, pra o listener de status (criado uma vez só)
  // não ler valores antigos. duckingRef = true enquanto uma voz está falando.
  const musicaRef = useRef(null);
  const somVolRef = useRef(somVol);
  const vozVolRef = useRef(vozVol);
  const duckingRef = useRef(false);
  const filaRef = useRef([]); // vozes que ainda vão tocar em sequência após a atual
  musicaRef.current = musica;
  somVolRef.current = somVol;
  vozVolRef.current = vozVol;

  // volume "normal" e volume "abaixado" da música (0–1)
  function volMusicaNormal() { return somVolRef.current / 100; }
  function volMusicaDuck() { return (somVolRef.current / 100) * MUSICA_DUCK; }

  // inicia a música em loop assim que o player fica pronto
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    if (!musica) return;
    try {
      musica.loop = true;
      musica.volume = somVol / 100;
      musica.play();
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musica]);

  // cria o canal de voz uma vez e libera ao desmontar.
  // Ao terminar de falar, restaura o volume da música (fim do ducking).
  useEffect(() => {
    let sub;
    try {
      const player = createAudioPlayer(null);
      vozRef.current = player;
      sub = player.addListener('playbackStatusUpdate', (status) => {
        if (status?.didJustFinish) {
          const proxima = filaRef.current.shift();
          if (proxima) {
            reproduzirVoz(proxima); // toca a próxima da fila (mantém o ducking)
          } else {
            duckingRef.current = false;
            const m = musicaRef.current;
            if (m) { try { m.volume = volMusicaNormal(); } catch (e) {} }
          }
        }
      });
    } catch (e) {}
    return () => {
      try { sub?.remove(); } catch (e) {}
      try { vozRef.current?.remove(); } catch (e) {}
      vozRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // muda o volume da música ao vivo (0–100). Se uma voz estiver falando,
  // respeita o nível abaixado (ducking) pra não "estourar" a música no meio.
  function setSomVol(v) {
    setSomVolState(v);
    somVolRef.current = v;
    if (musica) {
      try { musica.volume = duckingRef.current ? volMusicaDuck() : (v / 100); } catch (e) {}
    }
  }

  // muda o volume da voz ao vivo (0–100)
  function setVozVol(v) {
    setVozVolState(v);
    if (vozRef.current) { try { vozRef.current.volume = v / 100; } catch (e) {} }
  }

  // toca o som de clique (do início), no volume do "Som"
  function tocarClique() {
    if (!clique) return;
    try {
      clique.volume = somVol / 100;
      clique.seekTo(0);
      clique.play();
    } catch (e) {}
  }

  // toca o som de acerto, no volume do "Som"
  function tocarAcerto() {
    if (!acerto) return;
    try {
      acerto.volume = somVol / 100;
      acerto.seekTo(0);
      acerto.play();
    } catch (e) {}
  }

  // toca o som de erro, no volume do "Som"
  function tocarErro() {
    if (!erro) return;
    try {
      erro.volume = somVol / 100;
      erro.seekTo(0);
      erro.play();
    } catch (e) {}
  }

  // Primitivo: toca UMA voz pelo nome e aplica o ducking. Usa só refs, então é
  // seguro ser chamado de dentro do listener (sem closure velha).
  function reproduzirVoz(nome) {
    const src = VOZES[nome];
    const player = vozRef.current;
    if (!src || !player) return;
    try {
      player.replace(src);
      player.volume = vozVolRef.current / 100;
      player.play();
      // ducking: abaixa a música só se ela estiver ligada
      if (somVolRef.current > 0 && musicaRef.current) {
        duckingRef.current = true;
        try { musicaRef.current.volume = volMusicaDuck(); } catch (e) {}
      }
    } catch (e) {}
  }

  // toca uma voz (dublagem), no volume da "Voz". Interrompe o que estava tocando.
  function tocarVoz(nome) {
    if (vozVolRef.current <= 0) return; // voz desativada: não fala nem abaixa a música
    filaRef.current = []; // fala única: limpa qualquer sequência pendente
    reproduzirVoz(nome);
  }

  // toca várias vozes EM SEQUÊNCIA (ex.: nome da fase -> fala do personagem).
  // A música fica abaixada durante toda a sequência e volta ao normal no fim.
  function tocarVozes(nomes) {
    if (vozVolRef.current <= 0) return;
    const lista = (nomes || []).filter((n) => n && VOZES[n]);
    if (!lista.length) return;
    filaRef.current = lista.slice(1); // o resto toca quando a atual terminar
    reproduzirVoz(lista[0]);
  }

  return (
    <AudioContext.Provider value={{ somVol, setSomVol, vozVol, setVozVol, tocarClique, tocarAcerto, tocarErro, tocarVoz, tocarVozes }}>
      {/* camada que detecta qualquer toque e dispara o clique (sem bloquear o toque) */}
      <View style={{ flex: 1 }} onStartShouldSetResponderCapture={() => { tocarClique(); return false; }}>
        {children}
      </View>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
