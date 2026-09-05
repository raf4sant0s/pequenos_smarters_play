// src/game/EncontrarAlvos.js
// Floresta das Vogais: letras coloridas espalhadas; a criança toca nas vogais.
// Nenhuma letra nasce verde (verde é reservado pra "já achei"). Vogal achada ->
// verde + contorno branco (destaque). Dr. Preguiça à esquerda e Ziggy à direita.
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

// Formato de ARCO: as duas fileiras de cima usam a largura toda (acima da cabeça
// dos personagens); a fileira de baixo fica só no centro (longe dos personagens
// das laterais e acima do balão).
const POSICOES = [
  { top: '17%', left: '12%' }, { top: '19%', left: '28%' }, { top: '16%', left: '44%' }, { top: '19%', left: '60%' }, { top: '17%', left: '76%' },
  { top: '35%', left: '13%' }, { top: '37%', left: '29%' }, { top: '34%', left: '45%' }, { top: '37%', left: '60%' }, { top: '35%', left: '75%' },
  { top: '53%', left: '29%' }, { top: '55%', left: '40%' }, { top: '52%', left: '50%' }, { top: '55%', left: '60%' }, { top: '53%', left: '66%' },
];
// paleta SEM verde (o verde é só pra vogal já achada)
const CORES_LETRAS = ['#2E7DD1', '#E8442C', '#8E44AD', '#F39C12', '#E84393', '#F1C40F', '#2C3E50', '#E67E22'];

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
  const insets = useSafeAreaInsets();
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
      {/* Personagens ao fundo (respeitam o menu do celular nas laterais) */}
      {personagemEsq ? <Image source={personagemEsq} style={[styles.vilao, { left: insets.left }]} resizeMode="contain" pointerEvents="none" /> : null}
      {personagemDir ? <Image source={personagemDir} style={[styles.ziggy, { right: insets.right }]} resizeMode="contain" pointerEvents="none" /> : null}

      <BarraTopo home={ilha} confirmarSaida />

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
            corContorno={achado ? '#FFFFFF' : escurecer(fill)}
            espessura={achado ? 2.6 : 1.5}
            onPress={() => tocar(index, letra)}
          >
            {letra}
          </TextoContorno>
        );
      })}

      {/* Balão de fala embaixo — curto e centralizado, texto centralizado */}
      <View style={styles.bannerWrap} pointerEvents="box-none">
        <View style={styles.banner}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={SOM} style={styles.speaker} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.bannerTexto}>{rodada.instrucao || instrucao}</Text>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  letraWrap: { position: 'absolute', padding: 14, zIndex: 6 },
  letra: { fontFamily: fontes.titulo, fontSize: 52 },

  bannerWrap: { position: 'absolute', bottom: '7%', left: 0, right: 0, alignItems: 'center', zIndex: 3 },
  banner: {
    flexDirection: 'row', alignItems: 'center', maxWidth: '46%',
    backgroundColor: 'rgba(20,28,14,0.6)', borderRadius: 14, paddingVertical: 7, paddingHorizontal: 12,
  },
  speaker: { width: 34, height: 34, marginRight: 8 },
  bannerTexto: { flexShrink: 1, fontFamily: fontes.subtitulo, fontSize: 14, color: cores.branco, textAlign: 'center' },

  vilao: { position: 'absolute', left: 0, bottom: 0, width: '20%', height: '48%', zIndex: 2 },
  ziggy: { position: 'absolute', right: 0, bottom: 0, width: '20%', height: '48%', zIndex: 2 },
});
