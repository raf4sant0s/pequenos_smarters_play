// src/game/EncontrarAlvos.js
// Floresta das Vogais: letras coloridas espalhadas; a criança toca nas vogais.
// Cada letra tem contorno fino na própria cor, só que mais escura.
// Dr. Preguiça à esquerda e Ziggy à direita (decorativos, NÃO bloqueiam toque).
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import TextoContorno from '../components/TextoContorno';
import { useAudio } from '../navigation/AudioContext';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_floresta.png');
const VILAO = require('../../assets/images/doutor_preguica.png');
const ZIGGY = require('../../assets/images/ziggy_apontando.png');
const SOM = require('../../assets/images/som_azul.png');

// Posições na parte de cima (preenchem o topo, longe do banner e dos personagens).
const POSICOES = [
  { top: '17%', left: '26%' }, { top: '15%', left: '45%' }, { top: '18%', left: '63%' },
  { top: '22%', left: '80%' }, { top: '24%', left: '11%' }, { top: '36%', left: '6%' },
  { top: '34%', left: '24%' }, { top: '38%', left: '43%' }, { top: '35%', left: '61%' },
  { top: '40%', left: '78%' }, { top: '33%', left: '91%' }, { top: '51%', left: '22%' },
  { top: '53%', left: '40%' }, { top: '50%', left: '57%' }, { top: '52%', left: '73%' },
];
const CORES_LETRAS = ['#2E7DD1', '#E8442C', '#8E44AD', '#F39C12', '#27AE60', '#16A085', '#E84393', '#F1C40F', '#2C3E50', '#E67E22'];

// deixa uma cor um pouco mais escura (pro contorno)
function escurecer(hex, f = 0.6) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export default function EncontrarAlvos({
  instrucao, rodadas, onConcluir, ilha,
  fundo = FUNDO, personagemEsq = VILAO, personagemDir = ZIGGY,
}) {
  const [i, setI] = useState(0);
  const [encontrados, setEncontrados] = useState([]);
  const [errados, setErrados] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);
  const errosRef = useRef(0);
  const { tocarAcerto, tocarErro } = useAudio();

  const rodada = rodadas[i];
  const totalAlvos = rodada.itens.filter((l) => rodada.alvos.includes(l)).length;

  function tocar(index, letra) {
    if (bloqueado || encontrados.includes(index)) return;
    if (rodada.alvos.includes(letra)) {
      tocarAcerto();
      const novos = [...encontrados, index];
      setEncontrados(novos);
      if (novos.length >= totalAlvos) { setBloqueado(true); setTimeout(proxima, 650); }
    } else {
      tocarErro();
      errosRef.current += 1;
      setErrados((p) => [...p, index]);
      setTimeout(() => setErrados((p) => p.filter((x) => x !== index)), 500);
    }
  }

  function proxima() {
    if (i + 1 >= rodadas.length) onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
    else { setEncontrados([]); setErrados([]); setBloqueado(false); setI(i + 1); }
  }

  return (
    <Fundo source={fundo}>
      {/* Personagens ao fundo, sem receber toque (não travam as letras) */}
      {personagemEsq ? <Image source={personagemEsq} style={styles.vilao} resizeMode="contain" pointerEvents="none" /> : null}
      {personagemDir ? <Image source={personagemDir} style={styles.ziggy} resizeMode="contain" pointerEvents="none" /> : null}

      <BarraTopo home={ilha} />

      {rodada.itens.map((letra, index) => {
        const pos = POSICOES[index % POSICOES.length];
        const achado = encontrados.includes(index);
        const errado = errados.includes(index);
        const fill = achado ? cores.cartaVerde : errado ? cores.cartaVermelho : CORES_LETRAS[index % CORES_LETRAS.length];
        return (
          <TextoContorno
            key={index}
            containerStyle={[styles.letraWrap, pos]}
            textStyle={[styles.letra, { color: fill }]}
            corContorno={escurecer(fill)}
            espessura={1.5}
            onPress={() => tocar(index, letra)}
          >
            {letra}
          </TextoContorno>
        );
      })}

      {/* Banner embaixo, no centro: alto-falante + texto (barra escura translúcida) */}
      <View style={styles.banner}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={SOM} style={styles.speaker} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.bannerTexto}>{rodada.instrucao || instrucao}</Text>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  letraWrap: { position: 'absolute', padding: 14, zIndex: 6 },
  letra: { fontFamily: fontes.titulo, fontSize: 50 },
  banner: {
    position: 'absolute', bottom: '7%', left: '20%', right: '17%', zIndex: 3,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(20,28,14,0.55)', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14,
  },
  speaker: { width: 42, height: 42, marginRight: 10 },
  bannerTexto: { flex: 1, fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco },
  vilao: { position: 'absolute', left: 0, bottom: 0, width: '20%', height: '48%', zIndex: 2 },
  ziggy: { position: 'absolute', right: 0, bottom: 0, width: '20%', height: '48%', zIndex: 2 },
});
