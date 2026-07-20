// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pequenos Smarters</Text>
      <Text style={styles.sub}>Aprender brincando 🎮</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.botaoTexto}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoSecundario]}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={[styles.botaoTexto, { color: cores.azul }]}>CRIAR CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: cores.azul, textAlign: 'center' },
  sub: { fontSize: 16, color: cores.texto, marginBottom: 40 },
  botao: { backgroundColor: cores.laranja, paddingVertical: 14, borderRadius: 16, width: '80%', marginTop: 14 },
  botaoSecundario: { backgroundColor: cores.branco, borderWidth: 2, borderColor: cores.azul },
  botaoTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
