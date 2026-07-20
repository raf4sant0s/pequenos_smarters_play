// src/screens/CadastroScreen.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { cadastrar } from '../services/auth';
import { cores } from '../utils/cores';

export default function CadastroScreen({ navigation }) {
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function handleCadastro() {
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    try {
      await cadastrar(nomeResponsavel, nomeCrianca, email, senha);
      // Cadastrou e já entrou (porque desligamos a confirmação de e-mail)
    } catch (erro) {
      Alert.alert('Erro no cadastro', erro.message);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TextInput style={styles.input} placeholder="Seu nome (responsável)" value={nomeResponsavel} onChangeText={setNomeResponsavel} />
      <TextInput style={styles.input} placeholder="Nome da criança" value={nomeCrianca} onChangeText={setNomeCrianca} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha (mín. 6 caracteres)" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB' },
  conteudo: { padding: 24, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: cores.azul, marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: cores.branco, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 14, borderWidth: 1, borderColor: '#ccc' },
  botao: { backgroundColor: cores.laranja, paddingVertical: 14, borderRadius: 16, marginTop: 6 },
  botaoTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  link: { color: cores.azul, textAlign: 'center', marginTop: 18, fontWeight: 'bold' },
});
