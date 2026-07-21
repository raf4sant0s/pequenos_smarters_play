// src/screens/CadastroScreen.js — cadastro (horizontal)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Fundo from '../components/Fundo';
import { cadastrar } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const LOGO = require('../../assets/images/logo.png');

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
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
      // O design tem só "Nome" — usamos como nome da criança (e do responsável).
      await cadastrar(nome, nome, email, senha);
    } catch (erro) {
      Alert.alert('Erro no cadastro', erro.message);
    }
  }

  return (
    <Fundo>
      <Image source={LOGO} style={styles.logoTopo} resizeMode="contain" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.titulo}>CADASTRO</Text>

            <View style={styles.inputBox}>
              <Text style={styles.icone}>👤</Text>
              <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#E0A97D"
                value={nome} onChangeText={setNome} />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>✉️</Text>
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#E0A97D"
                value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🔒</Text>
              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#E0A97D"
                value={senha} onChangeText={setSenha} secureTextEntry />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🔒</Text>
              <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#E0A97D"
                value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.btnCadastrar} onPress={handleCadastro} activeOpacity={0.85}>
              <Text style={styles.btnCadastrarTexto}>CADASTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Já tem conta? Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logoTopo: { position: 'absolute', top: 14, left: 16, width: 150, height: 48, zIndex: 10 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  form: { width: 400, maxWidth: '88%', alignItems: 'center' },
  titulo: { fontFamily: fontes.titulo, fontSize: 38, color: cores.laranja, marginBottom: 12, textShadowColor: cores.branco, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 24, paddingHorizontal: 18, height: 46, width: '100%', marginBottom: 10 },
  icone: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontFamily: fontes.texto, fontSize: 15, color: cores.texto },
  btnCadastrar: { backgroundColor: cores.laranjaBotao, borderRadius: 26, height: 48, width: '75%', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  btnCadastrarTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco },
  link: { fontFamily: fontes.subtitulo, color: cores.azul, marginTop: 12 },
});
