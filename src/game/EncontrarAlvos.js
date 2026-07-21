// src/game/EncontrarAlvos.js
// Mostra várias letras espalhadas na floresta; a criança toca nas que seguem a regra (ex: vogais).
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_floresta.png');
const VILAO = require('../../assets/images/doutor_preguica.png');

// Posições espalhadas (evitam o topo — barra/banner — e o canto do vilão)
const POSICOES = [
  { top: '24%', left: '14%' }, { top: '22%', left: '36%' }, { top: '25%', left: '58%' }, { top: '23%', left: '80%' },
  { top: '44%', left: '24%' }, { top: '46%', left: '46%' }, { top: '43%', left: '68%' }, { top: '47%', left: '86%' },
  { top: '66%', left: '34%' }, { top: '68%', left: '54%' }, { top: '64%', left: '74%' }, { top: '70%', left: '88%' },
];
const CORES_LETRAS = ['#1A6EBD', '#E74C3C', '#8E44AD', '#F39C12', '#16A085', '#FFFFFF'];

export default function EncontrarAlvos({ instrucao, rodadas, onConcluir }) {
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
      if (novos.length >= totalAlvos) setTimeout(proxima, 600);
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
      <BarraTopo estrelas={0} />

      <View style={styles.bannerWrap}>
        <View style={styles.banner}>
          <Text style={styles.bannerTexto}>{instrucao}</Text>
        </View>
      </View>

      {rodada.itens.map((letra, index) => {
        const pos = POSICOES[index % POSICOES.length];
        const achado = encontrados.includes(index);
        const errado = errados.includes(index);
        const cor = achado ? cores.verde : errado ? cores.vermelho : CORES_LETRAS[index % CORES_LETRAS.length];
        return (
          <TouchableOpacity key={index} style={[styles.letraWrap, pos]} onPress={() => tocar(index, letra)} activeOpacity={0.7}>
            <Text style={[styles.letra, { color: cor }]}>{letra}</Text>
          </TouchableOpacity>
        );
      })}

      <Image source={VILAO} style={styles.vilao} resizeMode="contain" />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  bannerWrap: { alignItems: 'center', marginTop: 6 },
  banner: { backgroundColor: cores.verde, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 22, borderWidth: 2, borderColor: cores.branco },
  bannerTexto: { fontFamily: fontes.titulo, fontSize: 20, color: cores.branco, textAlign: 'center' },
  letraWrap: { position: 'absolute', padding: 8 },
  letra: { fontFamily: fontes.titulo, fontSize: 44, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 3 },
  vilao: { position: 'absolute', left: 2, bottom: 0, width: '18%', height: '46%', zIndex: 5 },
});
