// src/game/SelecaoUnica.js
// Motor de "escolha única": mostra uma instrução (voz/imagem/texto) e cartas.
// Tocar na carta já responde. Serve pro Lago das letras (clique na vogal, cartas
// laranja) e pro Campo das letras (com qual letra começa, objeto + cartas azuis).
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

// requires centralizados (Metro precisa de caminho literal)
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
  fundo = 'lago', personagem, som = 'azul', corCartas = 'laranja', banner,
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
      if (i + 1 >= rodadas.length) {
        onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
      } else {
        setI(i + 1);
      }
    }, 950);
  }

  return (
    <Fundo source={FUNDOS[fundo]}>
      <BarraTopo home={ilha} />

      {personagem && (
        <Image source={PERSONAGENS[personagem]} style={styles.personagem} resizeMode="contain" />
      )}

      {/* Banner: alto-falante + (imagem OU texto) */}
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

      {/* Objeto (Campo das letras) */}
      {rodada.imagemPrompt && (
        <View style={styles.promptCard}>
          <Image source={rodada.imagemPrompt} style={styles.promptImg} resizeMode="contain" />
        </View>
      )}

      {/* Cartas de opção */}
      <View style={styles.opcoes}>
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
    </Fundo>
  );
}

const styles = StyleSheet.create({
  personagem: { position: 'absolute', left: 4, bottom: 0, width: '22%', height: '56%', zIndex: 4 },
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6, paddingHorizontal: 12 },
  speaker: { width: 52, height: 52, marginRight: 10 },
  bannerImg: { width: 320, maxWidth: '68%', height: 48 },
  pill: { backgroundColor: cores.laranja, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 22, borderWidth: 2, borderColor: cores.branco },
  pillTexto: { fontFamily: fontes.titulo, fontSize: 22, color: cores.branco, letterSpacing: 1 },
  promptCard: { alignSelf: 'center', backgroundColor: cores.branco, borderRadius: 22, borderWidth: 4, borderColor: cores.laranja, padding: 8, marginTop: 10 },
  promptImg: { width: 120, height: 110 },
  opcoes: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  carta: { width: 104, height: 120, margin: 10, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.85)' },
  letra: { fontFamily: fontes.titulo, fontSize: 66, color: cores.branco },
  marca: { position: 'absolute', fontSize: 26, color: cores.branco },
  mCima: { top: 2, left: 6 },
  mBaixo: { bottom: 2, right: 6 },
});
