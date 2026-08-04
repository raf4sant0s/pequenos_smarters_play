// src/screens/ResultScreen.js — tela "PARABÉNS!" (card laranja + personagem com estrelas)
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import { salvarProgresso } from '../services/progresso';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

// personagem comemorando com N estrelas embutidas na imagem
const COMEMORA = {
  ziggy: { 1: require('../../assets/images/ziggy_1estrela.png'), 2: require('../../assets/images/ziggy_2estrelas.png'), 3: require('../../assets/images/ziggy_3estrelas.png') },
  pipo: { 1: require('../../assets/images/pipo_1estrela.png'), 2: require('../../assets/images/pipo_2estrelas.png'), 3: require('../../assets/images/pipo_3estrelas.png') },
  lina: { 2: require('../../assets/images/lina_2estrelas.png'), 3: require('../../assets/images/lina_3estrelas.png') },
};
const BASE = {
  ziggy: require('../../assets/images/ziggy.png'),
  pipo: require('../../assets/images/pipo.png'),
  lina: require('../../assets/images/lina.png'),
};

export default function ResultScreen({ navigation, route }) {
  const { estrelas, erros, ilha, fase, proximaFase, mensagem, faseAtual, personagem = 'ziggy' } = route.params;

  // Salva o progresso no Supabase assim que a tela abre (uma vez).
  useEffect(() => { salvarProgresso(ilha, fase, estrelas, erros); }, []);

  const ehProximaFase = proximaFase && proximaFase.includes('Fase');
  const heroComEstrelas = COMEMORA[personagem] && COMEMORA[personagem][estrelas];
  const hero = heroComEstrelas || BASE[personagem];

  function jogarNovamente() {
    if (faseAtual) navigation.replace(faseAtual);
    else navigation.goBack();
  }

  return (
    <Fundo>
      <View style={styles.centro}>
        <View style={styles.card}>
          <Image source={hero} style={styles.hero} resizeMode="contain" />

          <View style={styles.direita}>
            <Text style={styles.parabens}>PARABÉNS!</Text>
            <Text style={styles.mensagem}>{mensagem}</Text>

            {/* Estrelas em texto só quando a imagem não traz (ex.: 1 estrela da Lina) */}
            {!heroComEstrelas && (
              <View style={styles.estrelas}>
                {[1, 2, 3].map((n) => (
                  <Text key={n} style={[styles.estrela, n <= estrelas ? styles.cheia : styles.vazia]}>
                    {n <= estrelas ? '★' : '☆'}
                  </Text>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.botao} onPress={() => navigation.replace(proximaFase)} activeOpacity={0.85}>
              <Text style={styles.som}>🔊</Text>
              <Text style={styles.botaoTexto}>{ehProximaFase ? 'PRÓXIMA FASE' : 'VOLTAR À ILHA'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={jogarNovamente} activeOpacity={0.85}>
              <Text style={styles.som}>🔊</Text>
              <Text style={styles.botaoTexto}>JOGAR NOVAMENTE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.laranja, borderRadius: 30, padding: 18, width: 520, maxWidth: '94%', borderWidth: 4, borderColor: cores.branco },
  hero: { width: '40%', height: 200 },
  direita: { flex: 1, alignItems: 'center', paddingLeft: 8 },
  parabens: { fontFamily: fontes.titulo, fontSize: 40, color: cores.amarelo, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 2 },
  mensagem: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco, textAlign: 'center', marginTop: 2, marginBottom: 12 },
  estrelas: { flexDirection: 'row', marginBottom: 10 },
  estrela: { fontSize: 44, marginHorizontal: 4 },
  cheia: { color: cores.amarelo },
  vazia: { color: 'rgba(255,255,255,0.55)' },
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: cores.azulBotao, borderRadius: 22, height: 46, width: '92%', marginTop: 8, borderWidth: 2, borderColor: cores.branco },
  som: { fontSize: 18, marginRight: 8 },
  botaoTexto: { fontFamily: fontes.titulo, fontSize: 17, color: cores.branco },
});
