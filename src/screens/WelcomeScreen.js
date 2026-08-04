// src/screens/WelcomeScreen.js — boas-vindas do Ziggy (horizontal)
// Ziggy + balão de fala (texto já embutido na imagem). Toque leva à 1ª ilha.
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';

const FUNDO = require('../../assets/images/fundo_lago.png');
const ZIGGY = require('../../assets/images/ziggy.png');
const BALAO = require('../../assets/images/balao_fala.png');

export default function WelcomeScreen({ navigation }) {
  return (
    <Fundo source={FUNDO}>
      <BarraTopo mostrarHome={false} />

      <Pressable style={styles.area} onPress={() => navigation.navigate('Natureza')}>
        <Image source={ZIGGY} style={styles.ziggy} resizeMode="contain" />
        <Image source={BALAO} style={styles.balao} resizeMode="contain" />
      </Pressable>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 10 },
  ziggy: { width: '30%', height: '78%' },
  balao: { flex: 1, height: '62%', marginLeft: 4 },
});
