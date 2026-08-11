import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../../utils/cores';

export default function GeloScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../assets/images/tela_ilhaGelo.png')}
      style={styles.fundo}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={styles.btnTopo}>🏠 Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Parents')}>
          <Text style={styles.btnTopo}>👨‍👩‍👧 Painel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>ILHA DO GELO</Text>

      <TouchableOpacity style={styles.fase} onPress={() => navigation.navigate('GeloFase1')}>
        <Text style={styles.faseTexto}>1 — Jogo da Memória</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fase} onPress={() => navigation.navigate('GeloFase2')}>
        <Text style={styles.faseTexto}>2 — Geleira</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fase} onPress={() => navigation.navigate('GeloFase3')}>
        <Text style={styles.faseTexto}>3 — Arrastando o Gelo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  btnTopo: { backgroundColor: cores.branco, padding: 8, borderRadius: 10, fontWeight: 'bold', color: cores.azul },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.branco, textAlign: 'center', marginVertical: 30, textShadowColor: '#000', textShadowRadius: 4 },
  fase: { backgroundColor: cores.laranja, padding: 16, borderRadius: 16, marginBottom: 16 },
  faseTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});