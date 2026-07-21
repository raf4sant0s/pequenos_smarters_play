// src/screens/islands/NaturezaScreen.js — Ilha da Natureza (design principal, horizontal)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import { cores } from '../../utils/cores';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilhaNatureza.png');
const PLAY = require('../../../assets/images/botao_play.png');

function Fase({ titulo, onPress, style }) {
  return (
    <View style={[styles.fase, style]}>
      <Text style={styles.faseLabel}>{titulo}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Image source={PLAY} style={styles.play} resizeMode="contain" />
      </TouchableOpacity>
    </View>
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

      <Fase
        titulo={'Floresta das\nVogais'}
        onPress={() => navigation.navigate('NaturezaFase1')}
        style={{ top: '34%', left: '53%' }}
      />
      <Fase
        titulo={'Campo das\nletras'}
        onPress={() => navigation.navigate('NaturezaFase2')}
        style={{ top: '46%', left: '38%' }}
      />
      <Fase
        titulo={'Lago das\nvogais'}
        onPress={() => navigation.navigate('NaturezaFase3')}
        style={{ top: '62%', left: '52%' }}
      />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '82%', height: '92%', marginTop: 24 },
  titulo: { position: 'absolute', top: 62, width: '100%', textAlign: 'center', fontFamily: fontes.titulo, fontSize: 28, color: cores.branco, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4, zIndex: 2 },
  fase: { position: 'absolute', alignItems: 'center', width: 130, zIndex: 3 },
  faseLabel: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.branco, textAlign: 'center', marginBottom: 4, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  play: { width: 48, height: 48 },
});
