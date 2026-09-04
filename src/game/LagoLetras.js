// src/game/LagoLetras.js — Fase 2: Lago das letras (clique na consoante)
// Componente PRÓPRIO do Lago: todos os elementos e estilos são só desta fase.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { useAudio } from '../navigation/AudioContext';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_lago.png');
const PIPO = require('../../assets/images/pipo.png');
const SOM = require('../../assets/images/som_laranja.png');

export default function LagoLetras({ rodadas, onConcluir, ilha }) {
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'acerto' | 'erro'
  const [escolhida, setEscolhida] = useState(null);
  const errosRef = useRef(0);
  const rodada = rodadas[i];
  const { tocarAcerto, tocarErro } = useAudio();

  function escolher(id) {
    if (feedback) return;
    const acertou = id === rodada.correta;
    if (acertou) tocarAcerto(); else tocarErro();
    setEscolhida(id);
    setFeedback(acertou ? 'acerto' : 'erro');
    if (!acertou) errosRef.current += 1;
    setTimeout(() => {
      setFeedback(null);
      setEscolhida(null);
      if (i + 1 >= rodadas.length) onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
      else setI(i + 1);
    }, 950);
  }

  return (
    <Fundo source={FUNDO}>
      <BarraTopo home={ilha} confirmarSaida />

      {/* 🐒 Pipo (posição/tamanho só do Lago) */}
      <Image source={PIPO} style={styles.pipo} resizeMode="contain" pointerEvents="none" />

      <View style={styles.centro}>
        {/* 🔊 alto-falante + enunciado */}
        <View style={styles.bannerWrap}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={SOM} style={styles.speaker} resizeMode="contain" />
          </TouchableOpacity>
          <View style={styles.pill}>
            <Text style={styles.pillTexto}>{rodada.enunciado}</Text>
          </View>
        </View>

        {/* 🔶 cartas */}
        <View style={styles.linha}>
          {rodada.opcoes.map((op) => {
            const sel = escolhida === op.id;
            const acerto = sel && feedback === 'acerto';
            const erro = sel && feedback === 'erro';
            const bg = acerto ? cores.cartaVerde : erro ? cores.cartaVermelho : cores.cartaLaranja;
            return (
              <TouchableOpacity key={op.id} style={[styles.carta, { backgroundColor: bg }]} onPress={() => escolher(op.id)} activeOpacity={0.9}>
                {acerto && <Text style={[styles.marca, styles.mCima]}>✨</Text>}
                {acerto && <Text style={[styles.marca, styles.mBaixo]}>✨</Text>}
                {erro && <Text style={[styles.marca, styles.mCima]}>✗</Text>}
                {erro && <Text style={[styles.marca, styles.mBaixo]}>✗</Text>}
                <Text style={styles.letra}>{op.texto}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  // 🐒 Pipo — vira pro lado das letras (scaleX -1) e fica na grama
  pipo: { position: 'absolute', left: '10%', bottom: '20%', width: '18%', height: '55%', zIndex: 4, transform: [{ scaleX: -1 }] },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, paddingHorizontal: 12 },
  speaker: { width: 50, height: 50, marginRight: 10 },
  pill: { backgroundColor: '#0675F4', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 22, borderWidth: 2, borderColor: cores.branco },
  pillTexto: { fontFamily: fontes.titulo, fontSize: 22, color: cores.branco, letterSpacing: 1 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  carta: { width: 92, height: 108, marginHorizontal: 9, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.85)' },
  letra: { fontFamily: fontes.titulo, fontSize: 60, color: cores.branco },
  marca: { position: 'absolute', fontSize: 24, color: cores.branco },
  mCima: { top: 2, left: 6 },
  mBaixo: { bottom: 2, right: 6 },
});
