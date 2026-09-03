// src/screens/islands/DesertoScreen.js — Ilha do Deserto (horizontal)
// Arte grande da ilha + 3 marcadores (rótulo + play).
// Por enquanto SÓ a tela: os botões ainda não entram nas fases (a fazer depois).
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import TextoContorno from '../../components/TextoContorno';
import BotaoPlay from '../../components/BotaoPlay';
import { cores } from '../../utils/cores';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_deserto.png');

function Marcador({ titulo, onPress, style }) {
  return (
    <View style={[styles.marcador, style]}>
      <TextoContorno containerStyle={styles.marcadorLabelWrap} textStyle={styles.marcadorLabel} corContorno="#000000" espessura={1.2}>
        {titulo}
      </TextoContorno>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <BotaoPlay size={45} corFundo="#63C0E8" />
      </TouchableOpacity>
    </View>
  );
}

export default function DesertoScreen({ navigation }) {
  // Ainda sem fases: por enquanto os marcadores não navegam (você vai ligar depois).
  const semFaseAinda = () => { };

  return (
    <Fundo>
      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <BarraTopo />
      <TextoContorno containerStyle={styles.tituloWrap} textStyle={styles.titulo} corContorno="#FFFFFF" espessura={1.2}>
        ILHA DO DESERTO
      </TextoContorno>

      {/* Posições — ajuste fino no left/top/right olhando no Expo.
          (top menor = mais pra cima; left menor = mais pra esquerda) */}
      <Marcador titulo={'Desafios dos Espinhos'} onPress={() => navigation.navigate('DesertoFase1')} style={{ left: '37%', top: '45%' }} />
      <Marcador titulo={'Seca'} onPress={semFaseAinda} style={{ top: '54%', right: '30%' }} />
      <Marcador titulo={'Penhasco'} onPress={semFaseAinda} style={{ top: '72%', left: '27%' }} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '132%', height: '130%', marginTop: 180 },
  tituloWrap: { position: 'absolute', top: 95, left: 0, right: 0, zIndex: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 28, color: '#8A4B10', textAlign: 'center' },
  marcador: { position: 'absolute', alignItems: 'center', width: 130, zIndex: 6 },
  marcadorLabelWrap: { marginBottom: -2 },
  marcadorLabel: {
    fontFamily: fontes.titulo, fontSize: 16, color: cores.branco, textAlign: 'center', lineHeight: 18,
  },
  play: { width: 45, height: 45 },
});
