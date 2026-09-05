// src/game/ChuvaNaSeca.js
// Fase "Chuva na Seca": aparece um som-alvo e várias imagens numa grade.
// A criança toca em TODAS as imagens cuja palavra começa com aquele som.
// Cada acerto enche uma gota na nuvem; ao coletar todas -> chove -> próxima rodada.
// Layout: painel à esquerda (nuvem + som) | grade de imagens à direita.
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { useAudio } from '../navigation/AudioContext';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_chuvanaseca.png');
const NUVEM = require('../../assets/images/nuvem.png');
const SOM = require('../../assets/images/som_laranja.png');

// mapa das imagens das palavras (chave -> arquivo)
const IMAGENS = {
  sol: require('../../assets/images/sol.png'),
  sapo: require('../../assets/images/sapo.png'),
  sino: require('../../assets/images/sino.png'),
  pato: require('../../assets/images/pato.png'),
  pipa: require('../../assets/images/pipa.png'),
  pe: require('../../assets/images/pe.png'),
  bola: require('../../assets/images/bola.png'),
  bode: require('../../assets/images/bode.png'),
  bone: require('../../assets/images/bone.png'),
  maca: require('../../assets/images/maca.png'),
  mala: require('../../assets/images/mala.png'),
  mao: require('../../assets/images/mao.png'),
  flor: require('../../assets/images/flor.png'),
  cachorro: require('../../assets/images/cachorro.png'),
  aviao: require('../../assets/images/aviao.png'),
  elefante: require('../../assets/images/elefante.png'),
};

export default function ChuvaNaSeca({ rodadas, onConcluir, ilha }) {
  const [ri, setRi] = useState(0);
  const [coletados, setColetados] = useState([]); // chaves já coletadas na rodada
  const [errado, setErrado] = useState(null);     // chave que mostrou erro
  const [bloqueado, setBloqueado] = useState(false);
  const errosRef = useRef(0);
  const { tocarAcerto, tocarErro } = useAudio();

  const rodada = rodadas[ri];
  const totalAlvos = rodada.alvos.length;

  // imagens embaralhadas (alvos + distratores), estável enquanto a rodada não muda
  const itens = useMemo(
    () => [...rodada.alvos, ...rodada.distratores].sort(() => Math.random() - 0.5),
    [ri]
  );

  function tocar(key) {
    if (bloqueado || coletados.includes(key)) return;
    if (rodada.alvos.includes(key)) {
      tocarAcerto();
      const novos = [...coletados, key];
      setColetados(novos);
      if (novos.length >= totalAlvos) { setBloqueado(true); setTimeout(proxima, 950); }
    } else {
      tocarErro();
      errosRef.current += 1;
      setErrado(key);
      setTimeout(() => setErrado(null), 500);
    }
  }

  function proxima() {
    if (ri + 1 >= rodadas.length) onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
    else { setColetados([]); setErrado(null); setBloqueado(false); setRi(ri + 1); }
  }

  const cheia = coletados.length >= totalAlvos;

  return (
    <Fundo source={FUNDO}>
      <BarraTopo home={ilha} confirmarSaida />

      <View style={styles.conteudo}>
        {/* Painel esquerdo: nuvem (enchendo) + som-alvo */}
        <View style={styles.painel}>
          <View style={styles.nuvemWrap}>
            <Image source={NUVEM} style={styles.nuvem} resizeMode="contain" />
            {cheia && <Text style={styles.chuva}>🌧️</Text>}
          </View>
          <View style={styles.gotas}>
            {rodada.alvos.map((_, k) => (
              <View key={k} style={[styles.gota, k < coletados.length && styles.gotaCheia]} />
            ))}
          </View>

          <View style={styles.somWrap}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={SOM} style={styles.speaker} resizeMode="contain" />
            </TouchableOpacity>
            <View style={styles.somCard}>
              <Text style={styles.somLetra}>{rodada.som}</Text>
            </View>
          </View>
        </View>

        {/* Grade de imagens à direita */}
        <View style={styles.grade}>
          {itens.map((key) => {
            const foi = coletados.includes(key);
            const err = errado === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.card, foi && styles.cardFeito, err && styles.cardErro]}
                activeOpacity={0.85}
                onPress={() => tocar(key)}
              >
                <Image source={IMAGENS[key]} style={styles.img} resizeMode="contain" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Instrução embaixo */}
      <View style={styles.banner}>
        <Text style={styles.bannerTexto}>Toque em tudo que começa com o som "{rodada.som}"</Text>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    position: 'absolute', top: '17%', bottom: '15%', left: '3%', right: '3%', zIndex: 3,
    flexDirection: 'row', alignItems: 'center',
  },

  // painel esquerdo
  painel: { width: '26%', alignItems: 'center', justifyContent: 'center' },
  nuvemWrap: { alignItems: 'center', justifyContent: 'center' },
  nuvem: { width: 130, height: 84 },
  chuva: { position: 'absolute', bottom: -6, fontSize: 24 },
  gotas: { flexDirection: 'row', gap: 5, marginTop: 4 },
  gota: { width: 13, height: 13, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: '#5B9BD5' },
  gotaCheia: { backgroundColor: '#2E90E0' },
  somWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  speaker: { width: 40, height: 40, marginRight: 8 },
  somCard: {
    width: 58, height: 58, borderRadius: 14, backgroundColor: cores.branco,
    borderWidth: 3, borderColor: cores.laranja, alignItems: 'center', justifyContent: 'center',
  },
  somLetra: { fontFamily: fontes.titulo, fontSize: 36, color: cores.laranja },

  // grade de imagens (3 por linha, 2 linhas)
  grade: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  card: {
    width: 100, height: 100, borderRadius: 18, padding: 8, margin: 8,
    backgroundColor: cores.branco, borderWidth: 4, borderColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardFeito: { opacity: 0.25, borderColor: cores.cartaVerde },
  cardErro: { borderColor: cores.cartaVermelho },
  img: { width: '100%', height: '100%' },

  banner: {
    position: 'absolute', bottom: '5%', left: '15%', right: '15%', zIndex: 3, alignItems: 'center',
    backgroundColor: 'rgba(150,80,20,0.62)', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)',
  },
  bannerTexto: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco, textAlign: 'center' },
});
