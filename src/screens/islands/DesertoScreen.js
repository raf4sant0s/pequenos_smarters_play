// src/screens/islands/DesertoScreen.js — Ilha do Deserto (horizontal)
// Arte da ilha + 3 marcadores. Só a Fase 1 está pronta; Seca e Penhasco ficam trancadas (cadeado).
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import TextoContorno from '../../components/TextoContorno';
import MarcadorFase from '../../components/MarcadorFase';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_deserto.png');

export default function DesertoScreen({ navigation }) {
  return (
    <Fundo>
      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <BarraTopo home={null} />
      <TextoContorno containerStyle={styles.tituloWrap} textStyle={styles.titulo} corContorno="#FFFFFF" espessura={1.2}>
        ILHA DO DESERTO
      </TextoContorno>

      {/* Só a Fase 1 está pronta. Seca e Penhasco ficam trancadas até serem feitas. */}
      <MarcadorFase titulo={'Desafios dos Espinhos'} bloqueada={false}
        onPress={() => navigation.navigate('DesertoFase1')} style={{ left: '37%', top: '45%' }} />
      <MarcadorFase titulo={'Seca'} bloqueada={true} style={{ top: '54%', right: '30%' }} />
      <MarcadorFase titulo={'Penhasco'} bloqueada={true} style={{ top: '72%', left: '27%' }} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '132%', height: '130%', marginTop: 180 },
  tituloWrap: { position: 'absolute', top: 95, left: 0, right: 0, zIndex: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 28, color: '#8A4B10', textAlign: 'center' },
});
