// src/screens/WelcomeScreen.js — boas-vindas do Ziggy (horizontal)
// Ziggy no campo (esquerda) + balão de fala à direita. Toque leva à 1ª ilha.
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';

const FUNDO = require('../../assets/images/fundo_ziggy.png');
const ZIGGY = require('../../assets/images/ziggy.png');
const BALAO = require('../../assets/images/balao_fala.png');

export default function WelcomeScreen({ navigation }) {
  return (
    <Fundo source={FUNDO}>
      <BarraTopo mostrarHome={false} mostrarPainel={false} mostrarEstrelas={false} />

      {/* Boas-vindas do Ziggy (só na primeira vez, após o cadastro) -> Mapa das Ilhas */}
      <Pressable style={styles.area} onPress={() => navigation.replace('Map')}>
        <Image source={ZIGGY} style={styles.ziggy} resizeMode="contain" />
        <Image source={BALAO} style={styles.balao} resizeMode="contain" />
      </Pressable>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1 },
  // Ziggy em pé na grama, centro-esquerda (como no Figma)
  ziggy: { position: 'absolute', left: '13%', bottom: '7%', width: '32%', height: '74%' },
  // Balão de fala à direita, na altura da cabeça do Ziggy (a "seta" aponta pra ele)
  balao: { position: 'absolute', right: '6%', top: '2%', width: '58%', height: '52%' },
});
