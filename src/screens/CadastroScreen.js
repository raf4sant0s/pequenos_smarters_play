// src/screens/CadastroScreen.js — cadastro (responsável + criança + idade)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CenarioEntrada from '../components/CenarioEntrada';
import { cadastrar } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function CadastroScreen({ navigation }) {
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [idade, setIdade] = useState('');

  async function handleCadastro() {
    if (!nomeResponsavel.trim() || !nomeCrianca.trim()) {
      Alert.alert('Atenção', 'Preencha o nome do responsável e o da criança.');
      return;
    }
    const idadeNum = parseInt(idade, 10);
    if (!idadeNum || idadeNum < 1 || idadeNum > 99) {
      Alert.alert('Atenção', 'Informe uma idade válida para a criança.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    try {
      await cadastrar(nomeResponsavel, nomeCrianca, idadeNum, email, senha);
      navigation.replace('Welcome'); // primeira vez: passa pelo Ziggy antes do Mapa
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

            {/* Responsável */}
            <Text style={styles.secao}>Responsável</Text>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>👤</Text>
              <TextInput style={styles.input} placeholder="Nome do responsável" placeholderTextColor="#E0A97D" value={nomeResponsavel} onChangeText={setNomeResponsavel} />
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

            {/* Criança */}
            <Text style={styles.secao}>Criança</Text>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🧒</Text>
              <TextInput style={styles.input} placeholder="Nome da criança" placeholderTextColor="#E0A97D" value={nomeCrianca} onChangeText={setNomeCrianca} />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.icone}>🎂</Text>
              <TextInput style={styles.input} placeholder="Idade" placeholderTextColor="#E0A97D" value={idade} onChangeText={setIdade} keyboardType="number-pad" maxLength={2} />
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
  titulo: { fontFamily: fontes.titulo, fontSize: 32, color: cores.laranja, marginBottom: 8 },
  secao: { alignSelf: 'flex-start', fontFamily: fontes.subtitulo, fontSize: 14, color: cores.azul, marginTop: 4, marginBottom: 6 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 22, paddingHorizontal: 16, height: 46, width: '100%', marginBottom: 10 },
  icone: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontFamily: fontes.texto, fontSize: 15, color: cores.texto },
  btnCadastrar: { backgroundColor: cores.laranjaBotao, borderRadius: 24, height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  btnCadastrarTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco },
  link: { fontFamily: fontes.subtitulo, color: cores.azul, marginTop: 12 },
});
