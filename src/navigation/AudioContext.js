// src/navigation/AudioContext.js
// Toca a música de fundo em loop infinito e guarda o volume (som/voz),
// compartilhado com o popup de Configurações.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';

const MUSICA = require('../../assets/sounds/musica_fundo.mp3');

const AudioContext = createContext({
  somVol: 70, setSomVol: () => {},
  vozVol: 85, setVozVol: () => {},
});

export function AudioProvider({ children }) {
  const player = useAudioPlayer(MUSICA);
  const [somVol, setSomVolState] = useState(70);
  const [vozVol, setVozVol] = useState(85);

  // inicia a música em loop assim que o player fica pronto
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    if (!player) return;
    try {
      player.loop = true;
      player.volume = somVol / 100;
      player.play();
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  // muda o volume da música ao vivo (0–100)
  function setSomVol(v) {
    setSomVolState(v);
    if (player) { try { player.volume = v / 100; } catch (e) {} }
  }

  return (
    <AudioContext.Provider value={{ somVol, setSomVol, vozVol, setVozVol }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
