// src/screens/MapScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';

// As ilhas do jogo. A "rota" é o nome que a Pessoa B vai registrar no AppNavigator.
const ILHAS = [
  { rota: 'Natureza', nome: '🌳 Ilha da Natureza' },
  { rota: 'Deserto', nome: '🏜️ Ilha do Deserto' },
  { rota: 'Gelo', nome: '❄️ Ilha do Gelo' },
  { rota: 'Ventos', nome: '🌬️ Ilha dos Ventos' },
  { rota: 'Fogo', nome: '🔥 Ilha do Fogo' },
  { rota: 'Lagos', nome: '💧 Ilha dos Lagos' },
];

export default function MapScreen({ navigation }) {
  function abrirIlha(rota) {
    // Enquanto a Pessoa B (Estefanie) não criou as ilhas, mostramos um aviso.
    // Quando a ilha existir E estiver registrada no AppNavigator, troque a
    // linha abaixo por:  navigation.navigate(rota);
    Alert.alert('Em construção 🚧', 'Esta ilha será criada na Parte 6 (trilha do Jogo).');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.topo}>
        <TouchableOpacity style={styles.btnTopo} onPress={() => navigation.navigate('Parents')}>
          <Text style={styles.btnTopoTexto}>👨‍👩‍👧 Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTopo} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.btnTopoTexto}>⚙️ Config</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Mapa das Ilhas</Text>

      {ILHAS.map((ilha) => (
        <TouchableOpacity key={ilha.rota} style={styles.ilha} onPress={() => abrirIlha(ilha.rota)}>
          <Text style={styles.ilhaTexto}>{ilha.nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB' },
  topo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 },
  btnTopo: { backgroundColor: cores.branco, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  btnTopoTexto: { fontWeight: 'bold', color: cores.azul },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.azul, textAlign: 'center', marginVertical: 20 },
  ilha: { backgroundColor: cores.laranja, padding: 18, borderRadius: 16, marginBottom: 14 },
  ilhaTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});
