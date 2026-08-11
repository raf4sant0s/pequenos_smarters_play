// src/components/ConfigPopup.js — popup de Configurações
// Itens empilhados numa coluna, sem fundo escuro atrás, cores na paleta do jogo.
// Rolagem com barrinha fininha visível (persistentScrollbar) quando não couber.
import React, { useState } from 'react';
import { View, Text, Modal, Switch, ScrollView, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../navigation/AuthContext';
import { useAudio } from '../navigation/AudioContext';
import Slider from './Slider';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function ConfigPopup({ visivel, onFechar, onSair }) {
  const navigation = useNavigation();
  const { session } = useAuth();
  const { somVol, setSomVol, vozVol, setVozVol, tocarClique } = useAudio(); // som controla a música de fundo
  const [daltonismo, setDaltonismo] = useState(false);

  function abrirPainel() {
    onFechar();
    if (!session) {
      Alert.alert('Painel dos Pais', 'Você precisa fazer login para acessar o Painel dos Pais.');
      return;
    }
    navigation.navigate('Parents');
  }
  function sairDoJogo() {
    if (onSair) onSair();
    else { onFechar(); navigation.reset({ index: 0, routes: [{ name: 'Home' }] }); }
  }

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <View style={styles.overlay} onStartShouldSetResponderCapture={() => { tocarClique(); return false; }}>
        {/* fundo transparente pra fechar ao tocar fora (fica ATRÁS do card) */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onFechar} />
        <View style={styles.card}>
          {/* Cabeçalho: seta (canto superior esquerdo) + título centralizado */}
          <TouchableOpacity style={styles.voltar} onPress={onFechar} activeOpacity={0.7}>
            <Text style={styles.voltarIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Configurações</Text>

          {/* Painel claro — itens empilhados, com rolagem se precisar */}
          <ScrollView
            style={styles.painel}
            contentContainerStyle={styles.painelInner}
            showsVerticalScrollIndicator
            persistentScrollbar
            nestedScrollEnabled
          >
            {/* SOM */}
            <View style={styles.linhaTopo}>
              <Text style={styles.icone}>🔊</Text>
              <Text style={styles.label}>Som</Text>
              <Text style={styles.valor}>{somVol}%</Text>
            </View>
            <View style={styles.linhaSlider}>
              <View style={styles.sliderBox}><Slider valor={somVol} onChange={setSomVol} cor={cores.laranja} /></View>
              <View style={styles.botaoIcone}><Text style={styles.botaoIconeTxt}>🔊</Text></View>
            </View>

            {/* VOZ */}
            <View style={styles.linhaTopo}>
              <Text style={styles.icone}>🎤</Text>
              <Text style={styles.label}>Voz</Text>
              <Text style={styles.valor}>{vozVol}%</Text>
            </View>
            <View style={styles.linhaSlider}>
              <View style={styles.sliderBox}><Slider valor={vozVol} onChange={setVozVol} cor={cores.laranja} /></View>
              <View style={styles.botaoIcone}><Text style={styles.botaoIconeTxt}>🎤</Text></View>
            </View>

            <View style={styles.divisor} />

            {/* IDIOMA */}
            <View style={styles.linhaSimples}>
              <Text style={styles.icone}>🌐</Text>
              <Text style={styles.labelSimples}>Idioma da voz</Text>
              <TouchableOpacity><Text style={styles.seletor}>Português ›</Text></TouchableOpacity>
            </View>

            {/* DALTONISMO */}
            <View style={styles.linhaSimples}>
              <Text style={styles.icone}>🎨</Text>
              <Text style={styles.labelSimples}>Modo daltonismo</Text>
              <Switch value={daltonismo} onValueChange={setDaltonismo} trackColor={{ true: cores.azulBotao, false: '#B9C7D3' }} thumbColor={cores.branco} />
            </View>

            {/* CRÉDITOS */}
            <TouchableOpacity style={styles.creditos} activeOpacity={0.85}>
              <Text style={styles.creditosTxt}>Créditos</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Botões de baixo (paleta do jogo) */}
          <View style={styles.rodape}>
            <TouchableOpacity style={[styles.botaoBaixo, styles.painelPais]} onPress={abrirPainel} activeOpacity={0.85}>
              <Text style={[styles.botaoBaixoTxt, styles.painelPaisTxt]}>Painel dos Pais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botaoBaixo, styles.sair]} onPress={sairDoJogo} activeOpacity={0.85}>
              <Text style={styles.botaoBaixoTxt}>SAIR DO JOGO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: '#2E90E0', borderRadius: 24, padding: 12, width: 380, maxWidth: '88%', maxHeight: '94%', borderWidth: 4, borderColor: cores.branco,
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 8,
  },

  voltar: { position: 'absolute', top: 10, left: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: '#DCEEFB', borderWidth: 3, borderColor: cores.branco, alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  voltarIcon: { fontFamily: fontes.titulo, fontSize: 24, color: cores.azulEscuro, marginTop: -2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 26, color: cores.branco, textAlign: 'center', marginBottom: 10 },

  painel: { backgroundColor: '#DCEEFB', borderRadius: 18, maxHeight: 200 },
  painelInner: { padding: 14 },

  linhaTopo: { flexDirection: 'row', alignItems: 'center' },
  icone: { fontSize: 18, marginRight: 8 },
  label: { flex: 1, fontFamily: fontes.subtitulo, fontSize: 17, color: cores.azulEscuro },
  valor: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.azulBotao },
  linhaSlider: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sliderBox: { flex: 1, marginRight: 10 },
  botaoIcone: { width: 34, height: 34, borderRadius: 17, backgroundColor: cores.azulBotao, alignItems: 'center', justifyContent: 'center' },
  botaoIconeTxt: { fontSize: 16 },

  divisor: { height: 1, backgroundColor: '#B9D4EC', marginVertical: 8 },

  linhaSimples: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  labelSimples: { flex: 1, fontFamily: fontes.subtitulo, fontSize: 16, color: cores.azulEscuro },
  seletor: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.azulBotao },

  creditos: { alignSelf: 'center', backgroundColor: cores.branco, borderRadius: 16, paddingVertical: 8, paddingHorizontal: 30, marginTop: 10, borderWidth: 2, borderColor: cores.azulBotao },
  creditosTxt: { fontFamily: fontes.titulo, fontSize: 16, color: cores.azulBotao },

  rodape: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  botaoBaixo: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 16, paddingVertical: 11, borderWidth: 2, borderColor: cores.branco },
  painelPais: { backgroundColor: cores.ceu, borderColor: cores.azulEscuro, marginRight: 6 },
  painelPaisTxt: { color: cores.azulEscuro },
  sair: { backgroundColor: cores.laranjaBotao, marginLeft: 6 },
  botaoBaixoTxt: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.branco },
});
