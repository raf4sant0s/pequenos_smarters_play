// src/screens/islands/NaturezaScreen.js — Ilha da Natureza (horizontal)
// Arte grande da ilha + 3 marcadores próprios (rótulo + play) espalhados.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import TextoContorno from '../../components/TextoContorno';
import BotaoPlay from '../../components/BotaoPlay';
import { cores } from '../../utils/cores';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_natureza.png');

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

export default function NaturezaScreen({ navigation }) {
  return (
    <Fundo>
      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <BarraTopo />
      <TextoContorno containerStyle={styles.tituloWrap} textStyle={styles.titulo} corContorno="#FFFFFF" espessura={1.2}>
        ILHA DA NATUREZA
      </TextoContorno>

      <Marcador titulo={'Floresta das Vogais'} onPress={() => navigation.navigate('NaturezaFase1')} style={{ left: '42%', top: '38%', }} />
      <Marcador titulo={'Lago das Consoantes'} onPress={() => navigation.navigate('NaturezaFase2')} style={{ top: '60%', right: '30%' }} />
      <Marcador titulo={'Campo das letras'} onPress={() => navigation.navigate('NaturezaFase3')} style={{ top: '68%', left: '35%' }} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '132%', height: '130%', marginTop: 180 },
  tituloWrap: { position: 'absolute', top: 95, left: 0, right: 0, zIndex: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 28, color: '#055108', textAlign: 'center' },
  marcador: { position: 'absolute', alignItems: 'center', width: 130, zIndex: 6 },
  marcadorLabelWrap: { marginBottom: -2 },
  marcadorLabel: {
    fontFamily: fontes.titulo, fontSize: 16, color: cores.branco, textAlign: 'center', lineHeight: 18,
  },
  play: { width: 45, height: 45 },
});
