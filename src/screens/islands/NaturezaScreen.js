// src/screens/islands/NaturezaScreen.js — Ilha da Natureza (horizontal)
// Arte grande da ilha + 3 marcadores. As fases trancam (cadeado) até a anterior ser concluída.
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import TextoContorno from '../../components/TextoContorno';
import MarcadorFase from '../../components/MarcadorFase';
import { fasesConcluidas } from '../../services/progresso';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_natureza.png');

export default function NaturezaScreen({ navigation }) {
  const [concluidas, setConcluidas] = useState([]);

  // recarrega as fases concluídas sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      fasesConcluidas('Natureza')
        .then((lista) => { if (ativo) setConcluidas(lista); })
        .catch(() => { });
      return () => { ativo = false; };
    }, [])
  );

  const fez = (f) => concluidas.includes(f);

  return (
    <Fundo>
      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <BarraTopo home="Map" />
      <TextoContorno containerStyle={styles.tituloWrap} textStyle={styles.titulo} corContorno="#FFFFFF" espessura={1.2}>
        ILHA DA NATUREZA
      </TextoContorno>

      <MarcadorFase titulo={'Floresta das Vogais'} bloqueada={false}
        onPress={() => navigation.navigate('NaturezaFase1')} style={{ left: '42%', top: '38%' }} />
      <MarcadorFase titulo={'Lago das Consoantes'} bloqueada={!fez('fase1')}
        onPress={() => navigation.navigate('NaturezaFase2')} style={{ top: '60%', right: '30%' }} />
      <MarcadorFase titulo={'Campo das letras'} bloqueada={!fez('fase2')}
        onPress={() => navigation.navigate('NaturezaFase3')} style={{ top: '68%', left: '35%' }} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '132%', height: '130%', marginTop: 180 },
  tituloWrap: { position: 'absolute', top: 95, left: 0, right: 0, zIndex: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 28, color: '#055108', textAlign: 'center' },
});
