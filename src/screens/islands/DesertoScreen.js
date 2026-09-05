// src/screens/islands/DesertoScreen.js — Ilha do Deserto (horizontal)
// Arte da ilha + 3 marcadores. Só os Desafios dos Espinhos (Fase 1) estão jogáveis.
// Seca (2) e Penhasco (3) ainda estão sendo feitas: ficam trancadas e avisam.
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Fundo from '../../components/Fundo';
import BarraTopo from '../../components/BarraTopo';
import TextoContorno from '../../components/TextoContorno';
import MarcadorFase from '../../components/MarcadorFase';
import PopupEmConstrucao from '../../components/PopupEmConstrucao';
import { fasesConcluidas } from '../../services/progresso';
import { fontes } from '../../utils/tema';

const ILHA = require('../../../assets/images/ilha_deserto.png');

// Fases ainda em construção: ficam trancadas mesmo que a anterior seja concluída
// e mostram o aviso ao serem tocadas. Para liberar uma fase, tire-a desta lista.
const EM_CONSTRUCAO = ['fase2', 'fase3'];

export default function DesertoScreen({ navigation }) {
  const [concluidas, setConcluidas] = useState([]);
  const [aviso, setAviso] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      fasesConcluidas('Deserto')
        .then((lista) => { if (ativo) setConcluidas(lista); })
        .catch(() => { });
      return () => { ativo = false; };
    }, [])
  );

  const fez = (f) => concluidas.includes(f);
  const emConstrucao = (f) => EM_CONSTRUCAO.includes(f);
  // Só avisa "em construção" quando é esse o motivo do cadeado — se a fase
  // apenas depende da anterior, o tremor e o som já dizem o que houve.
  const avisarSeEmConstrucao = (f) => () => { if (emConstrucao(f)) setAviso(true); };

  return (
    <Fundo>
      <View style={styles.ilhaWrap} pointerEvents="none">
        <Image source={ILHA} style={styles.ilha} resizeMode="contain" />
      </View>

      <BarraTopo home={null} />
      <TextoContorno containerStyle={styles.tituloWrap} textStyle={styles.titulo} corContorno="#FFFFFF" espessura={1.2}>
        ILHA DO DESERTO
      </TextoContorno>

      <MarcadorFase titulo={'Desafios dos Espinhos'} bloqueada={false}
        onPress={() => navigation.navigate('DesertoFase1')} style={{ left: '37%', top: '45%' }} />
      {/* Seca (Fase 2) ainda em construção — trancada mesmo com a Fase 1 concluída */}
      <MarcadorFase titulo={'Seca'} bloqueada={emConstrucao('fase2') || !fez('fase1')}
        onPress={() => navigation.navigate('DesertoFase2')}
        aoBloquear={avisarSeEmConstrucao('fase2')} style={{ top: '54%', right: '30%' }} />
      {/* Penhasco (Fase 3) ainda não foi feita — fica trancada */}
      <MarcadorFase titulo={'Penhasco'} bloqueada={true}
        aoBloquear={avisarSeEmConstrucao('fase3')} style={{ top: '72%', left: '27%' }} />

      <PopupEmConstrucao visivel={aviso} onFechar={() => setAviso(false)} />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilhaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ilha: { width: '132%', height: '130%', marginTop: 180 },
  tituloWrap: { position: 'absolute', top: 95, left: 0, right: 0, zIndex: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 28, color: '#8A4B10', textAlign: 'center' },
});
