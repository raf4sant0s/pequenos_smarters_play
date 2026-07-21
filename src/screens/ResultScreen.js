// src/screens/ResultScreen.js — tela de resultado (card laranja "PARABÉNS!")
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import { salvarProgresso } from '../services/progresso';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function ResultScreen({ navigation, route }) {
  const { estrelas, erros, ilha, fase, proximaFase, mensagem, faseAtual } = route.params;

  // Salva o progresso no Supabase assim que a tela abre (uma vez).
  useEffect(() => {
    salvarProgresso(ilha, fase, estrelas, erros);
  }, []);

  const ehProximaFase = proximaFase && proximaFase.includes('Fase');

  function jogarNovamente() {
    if (faseAtual) navigation.replace(faseAtual);
    else navigation.goBack();
  }

  return (
    <Fundo>
      <View style={styles.centro}>
        <View style={styles.card}>
          <Text style={styles.parabens}>PARABÉNS!</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <View style={styles.estrelas}>
            {[1, 2, 3].map((n) => (
              <Text key={n} style={[styles.estrela, n <= estrelas ? styles.cheia : styles.vazia]}>
                {n <= estrelas ? '★' : '☆'}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.botao} onPress={jogarNovamente} activeOpacity={0.85}>
            <Text style={styles.botaoTexto}>JOGAR NOVAMENTE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={() => navigation.replace(proximaFase)} activeOpacity={0.85}>
            <Text style={styles.botaoTexto}>{ehProximaFase ? 'PRÓXIMA FASE' : 'VOLTAR À ILHA'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: cores.laranja, borderRadius: 28, paddingVertical: 24, paddingHorizontal: 30, width: 440, maxWidth: '90%', alignItems: 'center', borderWidth: 3, borderColor: cores.branco },
  parabens: { fontFamily: fontes.titulo, fontSize: 36, color: cores.amarelo, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 2 },
  mensagem: { fontFamily: fontes.subtitulo, fontSize: 17, color: cores.branco, textAlign: 'center', marginTop: 4, marginBottom: 12 },
  estrelas: { flexDirection: 'row', marginBottom: 16 },
  estrela: { fontSize: 60, marginHorizontal: 6 },
  cheia: { color: cores.amarelo, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 2 },
  vazia: { color: 'rgba(255,255,255,0.55)' },
  botao: { backgroundColor: cores.azulBotao, borderRadius: 22, height: 48, width: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 10, borderWidth: 2, borderColor: cores.branco },
  botaoTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco },
});
