// src/game/CampoLetras.js — Fase 3: Campo das letras (com qual letra começa)
// Componente PRÓPRIO do Campo: todos os elementos e estilos são só desta fase.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_nuvenscampo.png');
const LINA = require('../../assets/images/lina.png');
const SOM = require('../../assets/images/som_azul.png');
const BANNER = require('../../assets/images/com_qual_comeca.png');

export default function CampoLetras({ rodadas, onConcluir, ilha }) {
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'acerto' | 'erro'
  const [escolhida, setEscolhida] = useState(null);
  const errosRef = useRef(0);
  const rodada = rodadas[i];

  function escolher(id) {
    if (feedback) return;
    const acertou = id === rodada.correta;
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
      <BarraTopo home={ilha} />

      {/* 🐘 Lina (posição/tamanho só do Campo) */}
      <Image source={LINA} style={styles.lina} resizeMode="contain" pointerEvents="none" />

      <View style={styles.centro}>
        {/* 🔊 alto-falante + banner "COM QUAL LETRA COMEÇA" */}
        <View style={styles.bannerWrap}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={SOM} style={styles.speaker} resizeMode="contain" />
          </TouchableOpacity>
          <Image source={BANNER} style={styles.bannerImg} resizeMode="contain" />
        </View>

        {/* 🖼️ objeto + 🔷 cartas */}
        <View style={styles.linha}>
          <View style={styles.promptCard}>
            <Image source={rodada.imagemPrompt} style={styles.promptImg} resizeMode="contain" />
          </View>

          {rodada.opcoes.map((op) => {
            const sel = escolhida === op.id;
            const acerto = sel && feedback === 'acerto';
            const erro = sel && feedback === 'erro';
            const bg = acerto ? cores.cartaVerde : erro ? cores.cartaVermelho : cores.cartaAzul;
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
  // 🐘 Lina
  lina: { position: 'absolute', left: '4%', top: '35%', width: '20%', height: '58%', zIndex: 4 },
  // translateX desloca os elementos na horizontal: negativo = ESQUERDA, positivo = direita
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', transform: [{ translateX: 28 }] },
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, paddingHorizontal: 12 },
  speaker: { width: 50, height: 50, marginRight: 10 },
  bannerImg: { width: 300, maxWidth: '62%', height: 46 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  promptCard: { backgroundColor: cores.branco, borderRadius: 22, borderWidth: 4, borderColor: cores.laranja, padding: 8, marginRight: 18 },
  promptImg: { width: 118, height: 118 },
  carta: { width: 92, height: 108, marginHorizontal: 9, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.85)' },
  letra: { fontFamily: fontes.titulo, fontSize: 60, color: cores.branco },
  marca: { position: 'absolute', fontSize: 24, color: cores.branco },
  mCima: { top: 2, left: 6 },
  mBaixo: { bottom: 2, right: 6 },
});
