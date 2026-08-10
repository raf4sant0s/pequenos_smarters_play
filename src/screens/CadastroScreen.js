// src/screens/CadastroScreen.js — cadastro (horizontal, itens empilhados + rolagem)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CenarioEntrada from '../components/CenarioEntrada';
import { cadastrar } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

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
      await cadastrar(nome, nome, email, senha);
      navigation.replace('Welcome'); // cadastrou e já entra (vai pro Ziggy)
    } catch (erro) {
      Alert.alert('Erro no cadastro', erro.message);
    }
  }

  return (
    <CenarioEntrada>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.titulo}>CADASTRO</Text>

            <View style={styles.inputBox}>
              <Text style={styles.icone}>👤</Text>
              <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#E0A97D" value={nome} onChangeText={setNome} />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>✉️</Text>
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#E0A97D" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🔒</Text>
              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#E0A97D" value={senha} onChangeText={setSenha} secureTextEntry />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🔒</Text>
              <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#E0A97D" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
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
    </CenarioEntrada>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  form: { width: 360, maxWidth: '82%', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.72)', borderRadius: 24, paddingVertical: 16, paddingHorizontal: 22 },
  titulo: { fontFamily: fontes.titulo, fontSize: 32, color: cores.laranja, marginBottom: 12 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 22, paddingHorizontal: 16, height: 46, width: '100%', marginBottom: 10 },
  icone: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontFamily: fontes.texto, fontSize: 15, color: cores.texto },
  btnCadastrar: { backgroundColor: cores.laranjaBotao, borderRadius: 24, height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  btnCadastrarTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco },
  link: { fontFamily: fontes.subtitulo, color: cores.azul, marginTop: 12 },
});
