// src/screens/ParentsScreen.js — Painel dos Pais (dashboard, horizontal)
// Dados de demonstração (mock). A ligação real com o Supabase vem depois.
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { buscarPerfil } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const ZIGGY = require('../../assets/images/ziggy.png');
const HOME = require('../../assets/images/botao_home.png');

const AREAS = [
  { icone: '📖', nome: 'Leitura', pct: 80 },
  { icone: '✏️', nome: 'Escrita', pct: 65 },
  { icone: '💡', nome: 'Lógica', pct: 70 },
  { icone: '🧠', nome: 'Memória', pct: 75 },
];

const JORNADA = [
  { img: require('../../assets/images/ilha_natureza.png'), nome: '1. Ilha da Natureza', estado: 'ok' },
  { img: require('../../assets/images/ilha_lagos.png'), nome: '2. Lago das Letras', estado: 'ok' },
  { img: require('../../assets/images/ilha_deserto.png'), nome: '3. Ilha do Deserto', estado: 'atual' },
  { img: require('../../assets/images/ilha_gelo.png'), nome: '4. Ilha do Gelo', estado: 'bloq' },
  { img: require('../../assets/images/ilha_fogo.png'), nome: '5. Ilha do Vulcão', estado: 'bloq' },
];

function Anel({ pct }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <Svg width={132} height={132} viewBox="0 0 132 132">
      <Circle cx="66" cy="66" r={r} stroke="rgba(255,255,255,0.25)" strokeWidth="12" fill="none" />
      <Circle cx="66" cy="66" r={r} stroke="#5AA9FF" strokeWidth="12" fill="none" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 66 66)" />
    </Svg>
  );
}

function Barra({ pct, style }) {
  return (
    <View style={[styles.trilha, style]}>
      <View style={[styles.trilhaFill, { width: `${pct}%` }]} />
    </View>
  );
}

export default function ParentsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [responsavel, setResponsavel] = useState('');
  const [crianca, setCrianca] = useState('João Pedro');

  useEffect(() => {
    buscarPerfil().then((p) => {
      if (p?.nome) setResponsavel(p.nome);
      if (p?.nome_crianca) setCrianca(p.nome_crianca);
    });
  }, []);

  const progresso = 72;
  const inicial = (crianca || '?').trim().charAt(0).toUpperCase();

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: insets.bottom + 20, paddingLeft: insets.left + 18, paddingRight: insets.right + 18 }}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Image source={HOME} style={styles.voltarImg} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.ola}>Olá{responsavel ? `, ${responsavel}` : ''}!</Text>
          <Text style={styles.olaSub}>Acompanhe o desenvolvimento do seu filho.</Text>
        </View>
        <View style={styles.perfil}>
          <View style={styles.avatar}><Text style={styles.avatarTxt}>{inicial}</Text></View>
          <View>
            <Text style={styles.perfilNome}>{crianca}</Text>
            <Text style={styles.perfilIdade}>7 anos</Text>
          </View>
        </View>
      </View>

      {/* Linha de 3 cards */}
      <View style={styles.linhaCards}>
        {/* Progresso geral */}
        <View style={[styles.card, styles.cardAzul, styles.cardProg]}>
          <Text style={styles.tituloAzul}>Progresso Geral</Text>
          <Text style={styles.subAzul}>Resumo do aprendizado</Text>
          <View style={styles.progRow}>
            <View style={styles.anelWrap}>
              <Anel pct={progresso} />
              <View style={styles.anelCentro}>
                <Text style={styles.anelPct}>{progresso}%</Text>
                <Text style={styles.anelLbl}>de progresso</Text>
              </View>
            </View>
            <View style={styles.progTxt}>
              <Text style={styles.progBold}>Muito bem!</Text>
              <Text style={styles.progInfo}>{crianca} está indo muito bem. Continue assim!</Text>
            </View>
          </View>
        </View>

        {/* Desempenho por área */}
        <View style={[styles.card, styles.cardDesemp]}>
          <Text style={styles.tituloCard}>Desempenho por área</Text>
          <Text style={styles.subCard}>Média de desempenho</Text>
          {AREAS.map((a) => (
            <View key={a.nome} style={styles.areaRow}>
              <Text style={styles.areaIcone}>{a.icone}</Text>
              <Text style={styles.areaNome}>{a.nome}</Text>
              <Barra pct={a.pct} style={{ flex: 1, marginHorizontal: 8 }} />
              <Text style={styles.areaPct}>{a.pct}%</Text>
            </View>
          ))}
        </View>

        {/* Tempo de uso */}
        <View style={[styles.card, styles.cardTempo]}>
          <Text style={styles.tituloCard}>Tempo de uso</Text>
          <Text style={styles.subCard}>Média de tempo por dia</Text>
          <View style={styles.tempoRow}>
            <View>
              <Text style={styles.tempoNum}>28 <Text style={styles.tempoMin}>min</Text></Text>
              <Text style={styles.tempoLbl}>por dia</Text>
            </View>
            <Image source={ZIGGY} style={styles.tempoZiggy} resizeMode="contain" />
          </View>
          <View style={styles.tempoNota}>
            <Text style={styles.tempoNotaTit}>🕐 Boa consistência!</Text>
            <Text style={styles.tempoNotaSub}>Continue incentivando.</Text>
          </View>
        </View>
      </View>

      {/* Ilhas e Fases */}
      <View style={[styles.card, styles.cardJornada]}>
        <Text style={styles.tituloCard}>Ilhas e Fases</Text>
        <Text style={styles.subCard}>Acompanhe a jornada do seu filho</Text>
        <View style={styles.jornadaRow}>
          {JORNADA.map((ilha, idx) => (
            <View key={ilha.nome} style={styles.jornadaItem}>
              <View style={styles.jornadaTopo}>
                {idx > 0 && <View style={[styles.conector, ilha.estado === 'bloq' && styles.conectorOff]} />}
                <View style={styles.ilhaBox}>
                  <Image source={ilha.img} style={[styles.jornadaImg, ilha.estado === 'bloq' && styles.jornadaImgOff]} resizeMode="contain" />
                  <View style={[styles.badge, ilha.estado === 'ok' && styles.badgeOk, ilha.estado === 'atual' && styles.badgeAtual, ilha.estado === 'bloq' && styles.badgeBloq]}>
                    <Text style={styles.badgeTxt}>{ilha.estado === 'ok' ? '✓' : ilha.estado === 'atual' ? '📍' : '🔒'}</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.jornadaNome, ilha.estado === 'atual' && styles.jornadaNomeAtual, ilha.estado === 'bloq' && styles.jornadaNomeOff]}>{ilha.nome}</Text>
            </View>
          ))}
        </View>
        <Barra pct={50} style={{ marginTop: 12, alignSelf: 'stretch' }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#EEF4FA' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  voltar: { width: 40, height: 40, borderRadius: 20, backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#D6E3F0' },
  voltarImg: { width: 26, height: 26 },
  ola: { fontFamily: fontes.titulo, fontSize: 24, color: '#173A5E' },
  olaSub: { fontFamily: fontes.texto, fontSize: 13, color: '#6B7B8C' },
  perfil: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E1E9F1' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: cores.azulBotao, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  avatarTxt: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco },
  perfilNome: { fontFamily: fontes.subtitulo, fontSize: 14, color: '#173A5E' },
  perfilIdade: { fontFamily: fontes.texto, fontSize: 12, color: '#8A98A6' },

  linhaCards: { flexDirection: 'row', marginBottom: 14 },
  card: { backgroundColor: cores.branco, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#E7EEF5' },
  cardAzul: { backgroundColor: '#14385F', borderColor: '#14385F' },
  cardProg: { flex: 1.15, marginRight: 12 },
  cardDesemp: { flex: 1.2, marginRight: 12 },
  cardTempo: { flex: 1 },

  tituloAzul: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco },
  subAzul: { fontFamily: fontes.texto, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 6 },
  progRow: { flexDirection: 'row', alignItems: 'center' },
  anelWrap: { width: 132, height: 132, alignItems: 'center', justifyContent: 'center' },
  anelCentro: { position: 'absolute', alignItems: 'center' },
  anelPct: { fontFamily: fontes.titulo, fontSize: 26, color: cores.branco },
  anelLbl: { fontFamily: fontes.texto, fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  progTxt: { flex: 1, paddingLeft: 8 },
  progBold: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.branco },
  progInfo: { fontFamily: fontes.texto, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  tituloCard: { fontFamily: fontes.subtitulo, fontSize: 16, color: '#173A5E' },
  subCard: { fontFamily: fontes.texto, fontSize: 11, color: '#8A98A6', marginBottom: 8 },
  areaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  areaIcone: { fontSize: 15, width: 22 },
  areaNome: { fontFamily: fontes.texto, fontSize: 12, color: '#4A5A69', width: 58 },
  areaPct: { fontFamily: fontes.subtitulo, fontSize: 12, color: '#173A5E', width: 34, textAlign: 'right' },

  tempoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tempoNum: { fontFamily: fontes.titulo, fontSize: 30, color: cores.azulBotao },
  tempoMin: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.azulBotao },
  tempoLbl: { fontFamily: fontes.texto, fontSize: 12, color: '#8A98A6' },
  tempoZiggy: { width: 62, height: 62 },
  tempoNota: { backgroundColor: '#EAF2FB', borderRadius: 12, padding: 8, marginTop: 8 },
  tempoNotaTit: { fontFamily: fontes.subtitulo, fontSize: 12, color: '#173A5E' },
  tempoNotaSub: { fontFamily: fontes.texto, fontSize: 11, color: '#8A98A6' },

  cardJornada: {},
  jornadaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 4 },
  jornadaItem: { flex: 1, alignItems: 'center' },
  jornadaTopo: { alignItems: 'center', justifyContent: 'center' },
  conector: { position: 'absolute', top: 32, right: '50%', width: '100%', height: 3, backgroundColor: '#39B54A' },
  conectorOff: { backgroundColor: '#D2DCE5' },
  ilhaBox: { alignItems: 'center', justifyContent: 'center' },
  jornadaImg: { width: 74, height: 62 },
  jornadaImgOff: { opacity: 0.5 },
  badge: { position: 'absolute', top: -4, right: 8, width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.branco, borderWidth: 1, borderColor: '#E1E9F1' },
  badgeOk: { backgroundColor: '#E4F7E7' },
  badgeAtual: { backgroundColor: '#E3F0FF' },
  badgeBloq: { backgroundColor: '#EEF2F6' },
  badgeTxt: { fontSize: 12 },
  jornadaNome: { fontFamily: fontes.texto, fontSize: 11, color: '#4A5A69', textAlign: 'center', marginTop: 4 },
  jornadaNomeAtual: { fontFamily: fontes.subtitulo, color: cores.azulBotao },
  jornadaNomeOff: { color: '#A9B5C0' },

  trilha: { height: 8, borderRadius: 4, backgroundColor: '#E1E9F1', overflow: 'hidden' },
  trilhaFill: { height: '100%', borderRadius: 4, backgroundColor: cores.azulBotao },
});
