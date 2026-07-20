// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { entrar } from '../services/auth';
import { cores } from '../utils/cores';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    try {
      await entrar(email, senha);
      // Não precisa navegar! O AuthContext troca de tela sozinho.
    } catch (erro) {
      Alert.alert('Ops', 'Email ou senha incorretos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem conta? Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: cores.azul, marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: cores.branco, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 14, borderWidth: 1, borderColor: '#ccc' },
  botao: { backgroundColor: cores.laranja, paddingVertical: 14, borderRadius: 16, marginTop: 6 },
  botaoTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  link: { color: cores.azul, textAlign: 'center', marginTop: 18, fontWeight: 'bold' },
});
