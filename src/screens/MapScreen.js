// src/screens/MapScreen.js — Mapa das Ilhas (hub)
// As 6 ilhas num arco (meia-lua) em ordem cronológica, com "Mapa" no centro e
// caminhos pontilhados: do centro até cada ilha + ligando as ilhas na ordem certa.
import React, { useState, useRef, useCallback } from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Line } from 'react-native-svg';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import TextoContorno from '../components/TextoContorno';
import BotaoCadeado from '../components/BotaoCadeado';
import PopupEmConstrucao from '../components/PopupEmConstrucao';
import { useAudio } from '../navigation/AudioContext';
import { buscarProgresso } from '../services/progresso';
import { fontes } from '../utils/tema';

const CEU = require('../../assets/images/fundo_nuvens.png');

// Centro do "Mapa" (de onde saem os caminhos) — em % da tela
const MAPA = { x: 50, y: 24 };

// Ilhas em arco (meia-lua), ordem cronológica. c = centro em % da tela.
const ILHAS = [
  { key: 'natureza', rota: 'Natureza', nome: 'Natureza', img: require('../../assets/images/ilha_natureza.png'), c: { x: 13, y: 44 } },
  { key: 'deserto', rota: 'Deserto', nome: 'Deserto', img: require('../../assets/images/ilha_deserto.png'), c: { x: 27, y: 60 } },
  { key: 'gelo', rota: 'Gelo', nome: 'Gelo', construcao: true, img: require('../../assets/images/ilha_gelo.png'), c: { x: 41, y: 70 } },
  { key: 'ventos', rota: 'Ventos', nome: 'Ventos', construcao: true, img: require('../../assets/images/ilha_vento.png'), c: { x: 55, y: 70 } },
  { key: 'fogo', rota: 'Fogo', nome: 'Fogo', construcao: true, img: require('../../assets/images/ilha_fogo.png'), c: { x: 69, y: 60 } },
  { key: 'lagos', rota: 'Lagos', nome: 'Lagos', construcao: true, img: require('../../assets/images/ilha_lagos.png'), c: { x: 83, y: 44 } },
];

const ILHA_W = 20; // largura da ilha em % (metade = 10)

function IlhaMapa({ nome, img, bloqueada, onEntrar, onTrancada, style }) {
  const { tocarErro } = useAudio();
  const shake = useRef(new Animated.Value(0)).current;

  function tocar() {
    if (bloqueada) {
      tocarErro();
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 1, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
      ]).start();
      if (onTrancada) onTrancada();
    } else {
      onEntrar();
    }
  }
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });

  return (
    <Animated.View style={[styles.ilha, style, { transform: [{ translateX }] }]}>
      <TouchableOpacity style={styles.ilhaBtn} activeOpacity={0.85} onPress={tocar}>
        <Image source={img} style={[styles.ilhaImg, bloqueada && styles.ilhaBloqueada]} resizeMode="contain" />
        {bloqueada && (
          <View style={styles.cadeado} pointerEvents="none">
            <BotaoCadeado size={48} />
          </View>
        )}
      </TouchableOpacity>
      <TextoContorno containerStyle={styles.nomeWrap} textStyle={styles.nome} corContorno="#000000" espessura={1.2}>
        {nome}
      </TextoContorno>
    </Animated.View>
  );
}

export default function MapScreen({ navigation }) {
  const [progresso, setProgresso] = useState([]);
  const [aviso, setAviso] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      buscarProgresso().then((l) => { if (ativo) setProgresso(l || []); }).catch(() => { });
      return () => { ativo = false; };
    }, [])
  );

  const naturezaCompleta = progresso.some((p) => p.ilha === 'natureza' && p.fase === 'fase3');
  const temDeserto = progresso.some((p) => p.ilha === 'deserto');

  function trancada(ilha) {
    if (ilha.construcao) return true;
    if (ilha.key === 'natureza') return false;
    if (ilha.key === 'deserto') return !(naturezaCompleta || temDeserto);
    return true;
  }

  return (
    <Fundo source={CEU}>
      {/* Caminhos pontilhados (atrás das ilhas) */}
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="none" pointerEvents="none">
        {/* caminho na ordem certa, ligando ilha a ilha */}
        {ILHAS.slice(1).map((i, k) => (
          <Line key={`path-${i.key}`} x1={ILHAS[k].c.x} y1={ILHAS[k].c.y} x2={i.c.x} y2={i.c.y}
            stroke="#FFFFFF" strokeOpacity={0.95} strokeWidth={0.8} strokeDasharray="2 2" strokeLinecap="round" />
        ))}
      </Svg>

      <BarraTopo home={null} />

      {/* "Mapa" no centro da meia-lua */}
      <View style={[styles.mapaCentro, { top: `${MAPA.y + 8}%` }]} pointerEvents="none">
        <TextoContorno textStyle={styles.mapaTexto} corContorno="#1B6FB3" espessura={1.6}>
          Mapa
        </TextoContorno>
      </View>

      {ILHAS.map((ilha) => (
        <IlhaMapa
          key={ilha.key}
          nome={ilha.nome}
          img={ilha.img}
          bloqueada={trancada(ilha)}
          style={{ left: `${ilha.c.x - ILHA_W / 2}%`, top: `${ilha.c.y - 14}%` }}
          onEntrar={() => navigation.navigate(ilha.rota)}
          onTrancada={() => { if (ilha.construcao) setAviso(true); }}
        />
      ))}

      <PopupEmConstrucao visivel={aviso} onFechar={() => setAviso(false)} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  mapaCentro: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 3 },
  mapaTexto: { fontFamily: fontes.titulo, fontSize: 34, color: '#FFFFFF', textAlign: 'center' },

  ilha: { position: 'absolute', width: `${ILHA_W}%`, alignItems: 'center', zIndex: 5 },
  ilhaBtn: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  ilhaImg: { width: '100%', height: 118 },
  ilhaBloqueada: { opacity: 0.55 },
  cadeado: { position: 'absolute', top: '24%', left: 0, right: 0, alignItems: 'center' },
  nomeWrap: { marginTop: -6 },
  nome: { fontFamily: fontes.titulo, fontSize: 16, color: '#FFFFFF', textAlign: 'center' },
});
