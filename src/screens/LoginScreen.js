// src/screens/LoginScreen.js — login (horizontal)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fundo from '../components/Fundo';
import { entrar } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const LOGO = require('../../assets/images/logo.png');

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    try {
      await entrar(email, senha);
      navigation.replace('Welcome'); // vai pro Ziggy
    } catch (erro) {
      Alert.alert('Ops', 'Email ou senha incorretos.');
    }
  }

  return (
    <Fundo>
      <Image source={LOGO} style={[styles.logoTopo, { top: insets.top + 10, left: insets.left + 16 }]} resizeMode="contain" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.titulo}>LOGIN</Text>

            <View style={styles.inputBox}>
              <Text style={styles.icone}>✉️</Text>
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9BB8CC"
                value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.icone}>🔒</Text>
              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#9BB8CC"
                value={senha} onChangeText={setSenha} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.btnEntrarTexto}>ENTRAR</Text>
            </TouchableOpacity>

            <Text style={styles.ou}>ou</Text>

            <TouchableOpacity style={styles.btnCadastro} onPress={() => navigation.navigate('Cadastro')} activeOpacity={0.85}>
              <Text style={styles.btnCadastroTexto}>CADASTRE-SE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logoTopo: { position: 'absolute', width: 150, height: 48, zIndex: 10 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  form: { width: 380, maxWidth: '86%', alignItems: 'center' },
  titulo: { fontFamily: fontes.titulo, fontSize: 40, color: cores.azul, marginBottom: 16, textShadowColor: cores.branco, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 26, paddingHorizontal: 18, height: 50, width: '100%', marginBottom: 12 },
  icone: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontFamily: fontes.texto, fontSize: 16, color: cores.texto },
  btnEntrar: { backgroundColor: cores.azulBotao, borderRadius: 26, height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  btnEntrarTexto: { fontFamily: fontes.titulo, fontSize: 20, color: cores.branco },
  ou: { fontFamily: fontes.subtitulo, color: cores.azul, marginVertical: 6 },
  btnCadastro: { backgroundColor: cores.laranjaBotao, borderRadius: 26, height: 46, width: '70%', alignItems: 'center', justifyContent: 'center' },
  btnCadastroTexto: { fontFamily: fontes.titulo, fontSize: 16, color: cores.branco },
});
