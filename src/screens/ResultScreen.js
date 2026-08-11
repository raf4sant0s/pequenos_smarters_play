// src/screens/ResultScreen.js — "PARABÉNS!"
// Barra do topo + cenário da fase + camada branca transparente + painel laranja.
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import Estrela from '../components/Estrela';
import { salvarProgresso } from '../services/progresso';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

// cenário de cada fase (fundo atrás do painel)
const CENARIOS = {
  floresta: require('../../assets/images/fundo_floresta.png'),
  lago: require('../../assets/images/fundo_lago.png'),
  campo: require('../../assets/images/fundo_nuvenscampo.png'),
};
const SOM = require('../../assets/images/som_azul.png');

// personagem comemorando com N estrelas embutidas
const COMEMORA = {
  ziggy: { 1: require('../../assets/images/ziggy_1estrela.png'), 2: require('../../assets/images/ziggy_2estrelas.png'), 3: require('../../assets/images/ziggy_3estrelas.png') },
  pipo: { 1: require('../../assets/images/pipo_1estrela.png'), 2: require('../../assets/images/pipo_2estrelas.png'), 3: require('../../assets/images/pipo_3estrelas.png') },
  lina: { 1: require('../../assets/images/lina_1estrela.png'), 2: require('../../assets/images/lina_2estrelas.png'), 3: require('../../assets/images/lina_3estrelas.png') },
};
const BASE = {
  ziggy: require('../../assets/images/ziggy.png'),
  pipo: require('../../assets/images/pipo.png'),
  lina: require('../../assets/images/lina.png'),
};

export default function ResultScreen({ navigation, route }) {
  const { estrelas, erros, ilha, fase, proximaFase, faseAtual, personagem = 'ziggy', cenario } = route.params;

  useEffect(() => { salvarProgresso(ilha, fase, estrelas, erros); }, []);

  const heroComEstrelas = COMEMORA[personagem] && COMEMORA[personagem][estrelas];
  const hero = heroComEstrelas || BASE[personagem];
  // rota da ilha (pro botão casinha) — ex.: 'NaturezaFase1' -> 'Natureza'
  const ilhaRota = faseAtual ? faseAtual.split('Fase')[0] : 'Natureza';

  function jogarNovamente() {
    if (faseAtual) navigation.replace(faseAtual);
    else navigation.goBack();
  }

  return (
    <Fundo source={CENARIOS[cenario]}>
      {/* camada branca transparente por cima do cenário */}
      <View style={styles.veu} pointerEvents="none" />

      <BarraTopo home={ilhaRota} />

      <View style={styles.centro}>
        <View style={styles.card}>
          <Text style={styles.parabens}>PARABÉNS!</Text>

          <Image source={hero} style={styles.hero} resizeMode="contain" />

          {!heroComEstrelas && (
            <View style={styles.estrelas}>
              {[1, 2, 3].map((n) => (
                <Estrela key={n} size={34} cheia={n <= estrelas} />
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.botao} onPress={() => navigation.replace(proximaFase)} activeOpacity={0.85}>
            <Image source={SOM} style={styles.somIcon} resizeMode="contain" />
            <Text style={styles.botaoTexto}>PRÓXIMA FASE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={jogarNovamente} activeOpacity={0.85}>
            <Image source={SOM} style={styles.somIcon} resizeMode="contain" />
            <Text style={styles.botaoTexto}>JOGAR NOVAMENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  veu: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.45)' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 },
  card: { backgroundColor: cores.laranja, borderRadius: 26, paddingVertical: 10, paddingHorizontal: 22, width: 330, maxWidth: '66%', alignItems: 'center', borderWidth: 4, borderColor: cores.branco, top: '-3%' },
  parabens: { fontFamily: fontes.titulo, fontSize: 30, color: cores.amarelo, textShadowColor: cores.texto, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 2 },
  hero: { width: '54%', height: 112, marginVertical: 3 },
  estrelas: { flexDirection: 'row', marginBottom: 4, gap: 4 },
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: cores.azulBotao, borderRadius: 22, height: 40, width: '92%', marginTop: 6, borderWidth: 2, borderColor: cores.branco },
  somIcon: { width: 26, height: 26, marginRight: 8 },
  botaoTexto: { fontFamily: fontes.titulo, fontSize: 16, color: cores.branco },
});
