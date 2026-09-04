// src/game/SelecaoUnica.js
// Motor de "escolha única": instrução (voz/imagem/texto) + cartas numa linha
// deitada (cabe bem no horizontal). Lago das letras (cartas laranja) e
// Campo das letras (objeto + cartas azuis).
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDOS = {
  lago: require('../../assets/images/fundo_lago.png'),
  campo: require('../../assets/images/fundo_nuvenscampo.png'),
};
const PERSONAGENS = {
  pipo: require('../../assets/images/pipo.png'),
  lina: require('../../assets/images/lina.png'),
  ziggy: require('../../assets/images/ziggy.png'),
};
const SONS = {
  azul: require('../../assets/images/som_azul.png'),
  laranja: require('../../assets/images/som_laranja.png'),
};
const BANNERS = {
  comeca: require('../../assets/images/com_qual_comeca.png'),
};

export default function SelecaoUnica({
  rodadas, onConcluir, ilha,
  fundo = 'lago', personagem, som = 'azul', corCartas = 'laranja', banner, soSom = false,
  estiloPersonagem,
}) {
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'acerto' | 'erro'
  const [escolhida, setEscolhida] = useState(null);
  const errosRef = useRef(0);

  const rodada = rodadas[i];
  const corCarta = corCartas === 'azul' ? cores.cartaAzul : cores.cartaLaranja;

  function escolher(id) {
    if (feedback) return; // trava enquanto mostra o resultado
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
    <Fundo source={FUNDOS[fundo]}>
      <BarraTopo home={ilha} confirmarSaida />

      {personagem && (
        <Image source={PERSONAGENS[personagem]} style={[styles.personagem, estiloPersonagem]} resizeMode="contain" pointerEvents="none" />
      )}

      {soSom && (
        /* Só o alto-falante (instrução por voz) */
        <TouchableOpacity style={styles.somSozinho} activeOpacity={0.7}>
          <Image source={SONS[som]} style={styles.speakerGrande} resizeMode="contain" />
        </TouchableOpacity>
      )}

      {/* Enunciado + cartas agrupados e centralizados (enunciado logo acima das letras) */}
      <View style={styles.centro}>
        {!soSom && (
          <View style={styles.bannerWrap}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={SONS[som]} style={styles.speaker} resizeMode="contain" />
            </TouchableOpacity>
            {banner ? (
              <Image source={BANNERS[banner]} style={styles.bannerImg} resizeMode="contain" />
            ) : (
              <View style={styles.pill}>
                <Text style={styles.pillTexto}>{rodada.enunciado}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.linha}>
          {rodada.imagemPrompt && (
            <View style={styles.promptCard}>
              <Image source={rodada.imagemPrompt} style={styles.promptImg} resizeMode="contain" />
            </View>
          )}

          {rodada.opcoes.map((op) => {
            const sel = escolhida === op.id;
            const acerto = sel && feedback === 'acerto';
            const erro = sel && feedback === 'erro';
            const bg = acerto ? cores.cartaVerde : erro ? cores.cartaVermelho : corCarta;
            return (
              <TouchableOpacity
                key={op.id}
                style={[styles.carta, { backgroundColor: bg }]}
                onPress={() => escolher(op.id)}
                activeOpacity={0.9}
              >
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
  personagem: { position: 'absolute', left: '10%', top: '21%', width: '18%', height: '55%', zIndex: 4 },
  somSozinho: { position: 'absolute', top: '12%', left: '24%', zIndex: 5 },
  speakerGrande: { width: 60, height: 60 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, paddingHorizontal: 12, top: '-8%' },
  speaker: { width: 50, height: 50, marginRight: 10 },
  bannerImg: { width: 300, maxWidth: '62%', height: 46 },
  pill: { backgroundColor: cores.laranja, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 22, borderWidth: 2, borderColor: cores.branco },
  pillTexto: { fontFamily: fontes.titulo, fontSize: 22, color: cores.branco, letterSpacing: 1 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  promptCard: { backgroundColor: cores.branco, borderRadius: 22, borderWidth: 4, borderColor: cores.laranja, padding: 8, marginRight: 18, top: '10%' },
  promptImg: { width: 118, height: 118 },
  carta: { width: 92, height: 108, marginHorizontal: 18, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.85)' },
  letra: { fontFamily: fontes.titulo, fontSize: 60, color: cores.branco },
  marca: { position: 'absolute', fontSize: 24, color: cores.branco },
  mCima: { top: 2, left: 6 },
  mBaixo: { bottom: 2, right: 6 },
});
