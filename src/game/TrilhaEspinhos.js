// src/game/TrilhaEspinhos.js
// Fase "Trilha pelos Espinhos": o Pipo atravessa o deserto.
// Layout: balão de fala no topo, 2 pedras-letra no meio, Pipo andando embaixo.
// Tocar na letra do grupo certo -> Pipo avança; tocar no espinho -> erro e fica parado.
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { useAudio } from '../navigation/AudioContext';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_desafio_espinhos.png');
const PIPO_PARADO = require('../../assets/images/pipo.png');
const PIPO_ANDANDO = require('../../assets/images/pipo_andando1.png');
const PIPO_COMEMORANDO = require('../../assets/images/pipo_comemorando.png');
const SOM = require('../../assets/images/som_laranja.png');
const PE_DIREITO = require('../../assets/images/pe_direito.png');
const PE_ESQUERDO = require('../../assets/images/pe_esquerdo.png');

export default function TrilhaEspinhos({ rodadas, onConcluir, ilha, fundo = FUNDO }) {
  const [ri, setRi] = useState(0);       // qual travessia
  const [passo, setPasso] = useState(0); // passo dentro da travessia
  const [erro, setErro] = useState(null); // letra que mostrou erro
  const [bloqueado, setBloqueado] = useState(false);
  const [estado, setEstado] = useState('parado'); // 'parado' | 'andando' | 'comemorando'
  const errosRef = useRef(0);
  const { tocarAcerto, tocarErro } = useAudio();
  const anim = useRef(new Animated.Value(0)).current; // 0..1 (progresso do Pipo)

  const rodada = rodadas[ri];
  const total = rodada.passos.length;
  const step = rodada.passos[passo];

  // ordem das 2 pedras (certa + espinho) — estável enquanto o passo não muda
  const opcoes = useMemo(() => {
    const arr = [{ letra: step.certa, certa: true }, { letra: step.espinho, certa: false }];
    return arr.sort(() => Math.random() - 0.5);
  }, [ri, passo]);

  const esquerdaPipo = anim.interpolate({ inputRange: [0, 1], outputRange: ['4%', '64%'] });

  // pose do Pipo conforme o estado: parado (início), andando (em progresso), comemorando (fim de cada travessia)
  const imagemPipo =
    estado === 'comemorando' ? PIPO_COMEMORANDO :
    estado === 'andando' ? PIPO_ANDANDO :
    PIPO_PARADO;

  function tocar(op) {
    if (bloqueado) return;
    if (op.certa) {
      tocarAcerto();
      const prox = passo + 1;
      setBloqueado(true);
      setEstado('andando');
      Animated.timing(anim, { toValue: prox / total, duration: 350, useNativeDriver: false }).start(() => {
        if (prox >= total) {
          // fim da travessia: o Pipo comemora antes de seguir
          setEstado('comemorando');
          setTimeout(() => {
            if (ri + 1 >= rodadas.length) {
              onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
            } else {
              anim.setValue(0);
              setRi(ri + 1);
              setPasso(0);
              setEstado('parado');
              setBloqueado(false);
            }
          }, 900);
        } else {
          setPasso(prox);
          setBloqueado(false);
        }
      });
    } else {
      tocarErro();
      errosRef.current += 1;
      setErro(op.letra);
      setTimeout(() => setErro(null), 450);
    }
  }

  return (
    <Fundo source={fundo}>
      <BarraTopo home={ilha} />

      {/* Balão de fala no TOPO (alto-falante laranja + instrução) */}
      <View style={styles.bannerWrap} pointerEvents="box-none">
        <View style={styles.banner}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={SOM} style={styles.speaker} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.bannerTexto}>{rodada.instrucao}</Text>
        </View>
      </View>

      {/* Pedras-letra no MEIO */}
      <View style={styles.opcoes}>
        {opcoes.map((op) => {
          const errado = erro === op.letra;
          return (
            <TouchableOpacity
              key={op.letra}
              activeOpacity={0.85}
              onPress={() => tocar(op)}
              style={[styles.botao, errado && styles.botaoErro]}
            >
              <Text style={styles.botaoLetra}>{op.letra}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Trilha EMBAIXO: pegadas (alternando pé direito/esquerdo) + Pipo por cima */}
      <View style={styles.trilha} pointerEvents="none">
        {rodada.passos.map((_, k) => (
          <Image
            key={k}
            source={k % 2 === 0 ? PE_DIREITO : PE_ESQUERDO}
            style={[styles.pegada, { opacity: k < passo ? 1 : 0.28 }]}
            resizeMode="contain"
          />
        ))}
      </View>
      <Animated.View style={[styles.pipoWrap, { left: esquerdaPipo }]} pointerEvents="none">
        {estado !== 'andando' && <View style={styles.sombra} />}
        <Image source={imagemPipo} style={styles.pipoImg} resizeMode="contain" />
      </Animated.View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  // Envoltório de largura total que apenas centraliza o balão
  bannerWrap: {
    position: 'absolute', top: '22%', left: 0, right: 0, zIndex: 5,
    alignItems: 'center',
  },
  // Balão de fala em tom de deserto — encolhe pro tamanho do conteúdo
  banner: {
    flexDirection: 'row', alignItems: 'center', maxWidth: '88%',
    backgroundColor: 'rgba(150,80,20,0.62)', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)',
  },
  speaker: { width: 42, height: 42, marginRight: 10 },
  bannerTexto: { flexShrink: 1, fontFamily: fontes.subtitulo, fontSize: 16, color: cores.branco },

  // Pedras-letra no meio
  opcoes: {
    position: 'absolute', top: '40%', left: 0, right: 0, zIndex: 4,
    flexDirection: 'row', justifyContent: 'center',
  },
  botao: {
    width: 90, height: 90, borderRadius: 46, marginHorizontal: 24,
    backgroundColor: '#F4C77E', borderWidth: 4, borderColor: '#B5731E',
    alignItems: 'center', justifyContent: 'center',
  },
  botaoErro: { backgroundColor: '#F3B0A6', borderColor: '#C0392B' },
  botaoLetra: { fontFamily: fontes.titulo, fontSize: 46, color: '#7A3E12' },

  // Trilha + Pipo embaixo
  trilha: {
    position: 'absolute', bottom: '2%', left: '6%', right: '6%', zIndex: 2,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  pegada: { width: 26, height: 34 },
  pipoWrap: {
    position: 'absolute', bottom: '4%', width: '16%', height: '32%', zIndex: 3,
    alignItems: 'center', justifyContent: 'flex-end',
  },
  pipoImg: { width: '100%', height: '100%' },
  // sombra suave sob o Pipo quando parado/comemorando (tom quente, discreta)
  sombra: {
    position: 'absolute', bottom: 4, left: '19%', right: '19%', height: 12, borderRadius: 8,
    backgroundColor: 'rgba(90,55,20,0.25)',
  },
});
