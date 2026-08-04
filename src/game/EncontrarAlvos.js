// src/game/EncontrarAlvos.js
// Floresta das Vogais: várias letras espalhadas; a criança toca nas vogais que
// o Doutor Preguiça escondeu. Dr. Preguiça (vilão) à esquerda, Ziggy à direita.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_floresta.png');
const VILAO = require('../../assets/images/doutor_preguica.png');
const ZIGGY = require('../../assets/images/ziggy_apontando.png');
const SOM = require('../../assets/images/som_azul.png');

// Posições espalhadas: evitam o topo (barra/banner) e os cantos de baixo (personagens).
const POSICOES = [
  { top: '26%', left: '20%' }, { top: '24%', left: '40%' }, { top: '26%', left: '60%' }, { top: '24%', left: '78%' },
  { top: '46%', left: '28%' }, { top: '48%', left: '48%' }, { top: '45%', left: '66%' }, { top: '47%', left: '80%' },
  { top: '68%', left: '38%' }, { top: '70%', left: '56%' }, { top: '66%', left: '70%' },
];
const CORES_LETRAS = ['#1A6EBD', '#E74C3C', '#8E44AD', '#F39C12', '#16A085', '#2C3E50'];

export default function EncontrarAlvos({ instrucao, rodadas, onConcluir, ilha }) {
  const [i, setI] = useState(0);
  const [encontrados, setEncontrados] = useState([]); // índices já achados
  const [errados, setErrados] = useState([]);          // índices piscando vermelho
  const errosRef = useRef(0);

  const rodada = rodadas[i];
  const totalAlvos = rodada.itens.filter((l) => rodada.alvos.includes(l)).length;

  function tocar(index, letra) {
    if (encontrados.includes(index)) return;
    if (rodada.alvos.includes(letra)) {
      const novos = [...encontrados, index];
      setEncontrados(novos);
      if (novos.length >= totalAlvos) setTimeout(proxima, 650);
    } else {
      errosRef.current += 1;
      setErrados((p) => [...p, index]);
      setTimeout(() => setErrados((p) => p.filter((x) => x !== index)), 500);
    }
  }

  function proxima() {
    if (i + 1 >= rodadas.length) {
      onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
    } else {
      setEncontrados([]); setErrados([]); setI(i + 1);
    }
  }

  return (
    <Fundo source={FUNDO}>
      <BarraTopo home={ilha} />

      <View style={styles.bannerWrap}>
        <Image source={SOM} style={styles.speaker} resizeMode="contain" />
        <View style={styles.banner}>
          <Text style={styles.bannerTexto}>{instrucao}</Text>
        </View>
      </View>

      {rodada.itens.map((letra, index) => {
        const pos = POSICOES[index % POSICOES.length];
        const achado = encontrados.includes(index);
        const errado = errados.includes(index);
        const cor = achado ? cores.cartaVerde : errado ? cores.cartaVermelho : CORES_LETRAS[index % CORES_LETRAS.length];
        return (
          <TouchableOpacity key={index} style={[styles.letraWrap, pos]} onPress={() => tocar(index, letra)} activeOpacity={0.7}>
            <Text style={[styles.letra, { color: cor }]}>{letra}</Text>
          </TouchableOpacity>
        );
      })}

      <Image source={VILAO} style={styles.vilao} resizeMode="contain" />
      <Image source={ZIGGY} style={styles.ziggy} resizeMode="contain" />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6, paddingHorizontal: 12 },
  speaker: { width: 46, height: 46, marginRight: 8 },
  banner: { backgroundColor: cores.verde, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18, borderWidth: 2, borderColor: cores.branco, maxWidth: '78%' },
  bannerTexto: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco, textAlign: 'center' },
  letraWrap: { position: 'absolute', padding: 16, zIndex: 3 },
  letra: { fontFamily: fontes.titulo, fontSize: 58, textShadowColor: 'rgba(255,255,255,0.9)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6 },
  vilao: { position: 'absolute', left: 0, bottom: 0, width: '20%', height: '48%', zIndex: 5 },
  ziggy: { position: 'absolute', right: 0, bottom: 0, width: '20%', height: '48%', zIndex: 5 },
});
