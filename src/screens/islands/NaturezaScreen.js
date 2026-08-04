// src/screens/islands/NaturezaScreen.js — Ilha da Natureza (horizontal)
// Arte da ilha + 3 marcadores (rótulo + play já embutidos) que levam às fases.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import { cores } from '../../utils/cores';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_natureza.png');
const ATV1 = require('../../../assets/images/natureza_atv1.png'); // Floresta das Vogais
const ATV2 = require('../../../assets/images/natureza_atv2.png'); // Lago das letras
const ATV3 = require('../../../assets/images/natureza_atv3.png'); // Campo das letras

function Marcador({ source, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.marcador, style]} onPress={onPress} activeOpacity={0.85}>
      <Image source={source} style={styles.marcadorImg} resizeMode="contain" />
    </TouchableOpacity>
  );
}

export default function NaturezaScreen({ navigation }) {
  return (
    <Fundo>
      <BarraTopo />

      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <Text style={styles.titulo}>ILHA DA NATUREZA</Text>

      <Marcador source={ATV1} onPress={() => navigation.navigate('NaturezaFase1')} style={{ top: '30%', left: '6%' }} />
      <Marcador source={ATV2} onPress={() => navigation.navigate('NaturezaFase2')} style={{ top: '34%', right: '5%' }} />
      <Marcador source={ATV3} onPress={() => navigation.navigate('NaturezaFase3')} style={{ top: '64%', alignSelf: 'center' }} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '78%', height: '86%', marginTop: 30 },
  titulo: {
    position: 'absolute', top: 60, width: '100%', textAlign: 'center',
    fontFamily: fontes.titulo, fontSize: 30, color: cores.branco,
    textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4, zIndex: 2,
  },
  marcador: { position: 'absolute', width: 150, zIndex: 3 },
  marcadorImg: { width: '100%', height: 84 },
});
