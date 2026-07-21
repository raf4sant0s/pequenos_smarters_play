// src/screens/islands/NaturezaScreen.js — Ilha da Natureza (design principal, horizontal)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import { cores } from '../../utils/cores';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilhaNatureza.png');
const PLAY = require('../../../assets/images/botao_play.png');

// Um marcador de fase: rótulo + botão play, posicionado sobre a ilha.
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
      <BarraTopo estrelas={0} />

      <Text style={styles.titulo}>ILHA DA NATUREZA</Text>

      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <Fase
        titulo={'Floresta das\nVogais'}
        onPress={() => navigation.navigate('NaturezaFase1')}
        style={{ top: '32%', right: '24%' }}
      />
      <Fase
        titulo={'Campo das\nletras'}
        onPress={() => navigation.navigate('NaturezaFase2')}
        style={{ top: '50%', left: '16%' }}
      />
      <Fase
        titulo={'Lago das\nvogais'}
        onPress={() => navigation.navigate('NaturezaFase3')}
        style={{ top: '60%', right: '22%' }}
      />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  titulo: { fontFamily: fontes.titulo, fontSize: 26, color: cores.branco, textAlign: 'center', marginTop: 2, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 3 },
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '60%', height: '78%', marginTop: 30 },
  fase: { position: 'absolute', alignItems: 'center', width: 130 },
  faseLabel: { fontFamily: fontes.subtitulo, fontSize: 15, color: cores.branco, textAlign: 'center', marginBottom: 4, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  play: { width: 46, height: 46 },
});
