// src/navigation/AudioContext.js
// Toca a música de fundo em loop, o som de clique em qualquer toque, e guarda
// o volume (som/voz) — compartilhado com o popup de Configurações.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';

const MUSICA = require('../../assets/sounds/musica_fundo.mp3');
const CLIQUE = require('../../assets/sounds/som_clique.mp3');
const ACERTO = require('../../assets/sounds/som_acerto.mp3');
const ERRO = require('../../assets/sounds/som_erro.mp3');

const AudioContext = createContext({
  somVol: 70, setSomVol: () => {},
  vozVol: 85, setVozVol: () => {},
  tocarClique: () => {},
  tocarAcerto: () => {},
  tocarErro: () => {},
});

export function AudioProvider({ children }) {
  const musica = useAudioPlayer(MUSICA);
  const clique = useAudioPlayer(CLIQUE);
  const acerto = useAudioPlayer(ACERTO);
  const erro = useAudioPlayer(ERRO);
  const [somVol, setSomVolState] = useState(70);
  const [vozVol, setVozVol] = useState(85);

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

  // muda o volume da música ao vivo (0–100)
  function setSomVol(v) {
    setSomVolState(v);
    if (musica) { try { musica.volume = v / 100; } catch (e) {} }
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

  return (
    <AudioContext.Provider value={{ somVol, setSomVol, vozVol, setVozVol, tocarClique, tocarAcerto, tocarErro }}>
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
