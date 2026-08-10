// src/screens/LoginScreen.js — login (horizontal)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CenarioEntrada from '../components/CenarioEntrada';
import { entrar } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function LoginScreen({ navigation }) {
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
    <CenarioEntrada>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.centro}>
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

            <TouchableOpacity style={styles.esqueceuWrap} activeOpacity={0.7}>
              <Text style={styles.esqueceu}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.btnEntrarTexto}>ENTRAR</Text>
            </TouchableOpacity>

            <Text style={styles.ou}>ou</Text>

            <TouchableOpacity style={styles.btnCadastro} onPress={() => navigation.navigate('Cadastro')} activeOpacity={0.85}>
              <Text style={styles.btnCadastroTexto}>CADASTRE-SE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CenarioEntrada>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  form: { width: 360, maxWidth: '80%', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.72)', borderRadius: 24, paddingVertical: 16, paddingHorizontal: 22 },
  titulo: { fontFamily: fontes.titulo, fontSize: 34, color: cores.azul, marginBottom: 10 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 22, paddingHorizontal: 16, height: 46, width: '100%', marginBottom: 8 },
  icone: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontFamily: fontes.texto, fontSize: 15, color: cores.texto },
  esqueceuWrap: { alignSelf: 'flex-end', marginBottom: 8 },
  esqueceu: { fontFamily: fontes.subtitulo, fontSize: 12, color: cores.azul },
  btnEntrar: { backgroundColor: cores.azulBotao, borderRadius: 24, height: 46, width: '100%', alignItems: 'center', justifyContent: 'center' },
  btnEntrarTexto: { fontFamily: fontes.titulo, fontSize: 19, color: cores.branco },
  ou: { fontFamily: fontes.subtitulo, color: cores.azul, marginVertical: 4 },
  btnCadastro: { backgroundColor: cores.laranjaBotao, borderRadius: 24, height: 42, width: '72%', alignItems: 'center', justifyContent: 'center' },
  btnCadastroTexto: { fontFamily: fontes.titulo, fontSize: 15, color: cores.branco },
});
