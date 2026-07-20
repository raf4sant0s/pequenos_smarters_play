// src/screens/WelcomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { buscarPerfil } from '../services/auth';
import { cores } from '../utils/cores';

export default function WelcomeScreen({ navigation }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    buscarPerfil().then((p) => setNome(p?.nome_crianca || ''));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá{nome ? `, ${nome}` : ''}! 👋</Text>
      <Text style={styles.sub}>Pronto para aprender brincando?</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.botaoTexto}>COMEÇAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: cores.azul, textAlign: 'center' },
  sub: { fontSize: 16, color: cores.texto, marginBottom: 40, marginTop: 8 },
  botao: { backgroundColor: cores.laranja, paddingVertical: 14, borderRadius: 16, width: '80%' },
  botaoTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
