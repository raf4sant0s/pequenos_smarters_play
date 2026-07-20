// src/screens/ResultScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StarRating from '../components/StarRating';
import { salvarProgresso } from '../services/progresso';
import { cores } from '../utils/cores';

export default function ResultScreen({ navigation, route }) {
  const { estrelas, erros, ilha, fase, proximaFase, mensagem } = route.params;

  // Assim que a tela abre, salva o progresso no Supabase (uma vez só)
  useEffect(() => {
    salvarProgresso(ilha, fase, estrelas, erros);
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <Text style={styles.parabens}>PARABÉNS!</Text>
        <Text style={styles.mensagem}>{mensagem}</Text>
        <StarRating quantidade={estrelas} />

        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>JOGAR NOVAMENTE</Text>
        </TouchableOpacity>

        {proximaFase ? (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cores.azul }]}
            onPress={() => navigation.replace(proximaFase)}
          >
            <Text style={styles.botaoTexto}>PRÓXIMA FASE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cores.azul }]}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.botaoTexto}>VOLTAR AO MAPA</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  popup: { backgroundColor: cores.branco, borderRadius: 24, padding: 28, width: '85%', alignItems: 'center' },
  parabens: { fontSize: 28, fontWeight: 'bold', color: cores.laranja, marginBottom: 8 },
  mensagem: { fontSize: 16, color: cores.texto, textAlign: 'center', marginBottom: 16 },
  botao: { backgroundColor: cores.laranja, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 16, marginTop: 12, width: '80%' },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});
