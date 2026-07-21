// src/components/BarraTopo.js — barra do topo usada nas telas do jogo
// logo à esquerda; estrelas + "Painel dos Pais" + casa à direita.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const LOGO = require('../../assets/images/logo.png');

export default function BarraTopo({ estrelas = 0, mostrarPainel = true, mostrarHome = true }) {
  const navigation = useNavigation();
  return (
    <View style={styles.barra}>
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />

      <View style={styles.direita}>
        <View style={styles.estrelas}>
          {[1, 2, 3].map((n) => (
            <Text key={n} style={styles.estrela}>{n <= estrelas ? '⭐' : '☆'}</Text>
          ))}
        </View>

        {mostrarPainel && (
          <TouchableOpacity style={styles.painel} onPress={() => navigation.navigate('Parents')}>
            <Text style={styles.painelTexto}>Painel dos Pais</Text>
          </TouchableOpacity>
        )}

        {mostrarHome && (
          <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.homeTexto}>🏠</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 },
  logo: { width: 150, height: 48 },
  direita: { flexDirection: 'row', alignItems: 'center' },
  estrelas: { flexDirection: 'row', marginRight: 10 },
  estrela: { fontSize: 22 },
  painel: { backgroundColor: cores.branco, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 2, borderColor: cores.azul, marginRight: 8 },
  painelTexto: { color: cores.azul, fontFamily: fontes.subtitulo, fontSize: 13 },
  home: { backgroundColor: cores.laranja, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: cores.branco },
  homeTexto: { fontSize: 18 },
});
