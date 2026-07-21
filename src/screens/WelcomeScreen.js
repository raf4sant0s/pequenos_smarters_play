// src/screens/WelcomeScreen.js — boas-vindas do Ziggy (horizontal)
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_ziggy.png');
const ZIGGY = require('../../assets/images/ziggy.png');

export default function WelcomeScreen({ navigation }) {
  return (
    <Fundo source={FUNDO}>
      <BarraTopo estrelas={0} />

      {/* Toque em qualquer lugar da área começa o jogo (vai pra 1ª ilha) */}
      <Pressable style={styles.area} onPress={() => navigation.navigate('Natureza')}>
        <Image source={ZIGGY} style={styles.ziggy} resizeMode="contain" />

        <View style={styles.balaoWrap}>
          <View style={styles.tail} />
          <View style={styles.balao}>
            <Text style={styles.balaoTexto}>
              Vamos nos aventurar juntos pelas ilhas do saber e aprender coisas novas?{'\n'}
              Clique na tela para começar!
            </Text>
          </View>
        </View>
      </Pressable>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 8 },
  ziggy: { width: '32%', height: '82%' },
  balaoWrap: { flex: 1, marginLeft: 6, marginRight: 16, justifyContent: 'center' },
  balao: { backgroundColor: cores.laranja, borderRadius: 22, paddingVertical: 18, paddingHorizontal: 22, borderWidth: 3, borderColor: cores.branco },
  balaoTexto: { fontFamily: fontes.texto, fontSize: 19, color: cores.branco, textAlign: 'center', lineHeight: 28 },
  tail: { position: 'absolute', left: -14, top: 40, width: 0, height: 0, borderTopWidth: 12, borderBottomWidth: 12, borderRightWidth: 18, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: cores.laranja },
});
