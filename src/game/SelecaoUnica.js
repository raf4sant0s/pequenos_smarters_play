// src/game/SelecaoUnica.js
// Mostra uma pergunta e opções (letras, sílabas, palavras OU imagens).
// Tocar na opção já responde (sem botão enviar). Cenário + Ziggy + cartas com brilho.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import BarraTopo from '../components/BarraTopo';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const FUNDO = require('../../assets/images/fundo_fase2.png');
const ZIGGY = require('../../assets/images/ziggy.png');

export default function SelecaoUnica({ instrucao, rodadas, onConcluir, ilha }) {
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'acerto' | 'erro'
  const [escolhida, setEscolhida] = useState(null);
  const errosRef = useRef(0);

  const rodada = rodadas[i];

  function escolher(id) {
    if (feedback) return; // trava enquanto mostra o resultado
    const acertou = id === rodada.correta;
    setEscolhida(id);
    setFeedback(acertou ? 'acerto' : 'erro');
    if (!acertou) errosRef.current += 1;

    setTimeout(() => {
      setFeedback(null);
      setEscolhida(null);
      if (i + 1 >= rodadas.length) {
        onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
      } else {
        setI(i + 1);
      }
    }, 900);
  }

  return (
    <Fundo source={FUNDO}>
      <BarraTopo home={ilha} />

      <Image source={ZIGGY} style={styles.ziggy} resizeMode="contain" />

      {/* Banner de instrução com alto-falante */}
      <View style={styles.bannerWrap}>
        <View style={styles.speaker}>
          <Text style={styles.speakerIcon}>🔊</Text>
        </View>
        <View style={styles.banner}>
          <Text style={styles.bannerTexto}>{(rodada.enunciado || instrucao || '').toUpperCase()}</Text>
        </View>
      </View>

      {rodada.destaque ? <Text style={styles.destaque}>{rodada.destaque}</Text> : null}

      {/* Cartas de opção */}
      <View style={styles.opcoes}>
        {rodada.opcoes.map((op) => {
          const sel = escolhida === op.id;
          const acerto = sel && feedback === 'acerto';
          const erro = sel && feedback === 'erro';
          return (
            <TouchableOpacity
              key={op.id}
              style={[styles.carta, acerto && styles.cartaAcerto, erro && styles.cartaErro]}
              onPress={() => escolher(op.id)}
              activeOpacity={0.9}
            >
              {acerto && <Text style={[styles.brilho, styles.brilhoCima]}>✨</Text>}
              {acerto && <Text style={[styles.brilho, styles.brilhoBaixo]}>✨</Text>}

              {op.Imagem ? (
                <op.Imagem width={90} height={90} />
              ) : op.imagem ? (
                <Image source={op.imagem} style={styles.img} />
              ) : (
                <Text style={[styles.letra, (acerto || erro) && { color: cores.branco }]}>{op.texto}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ziggy: { position: 'absolute', left: 6, bottom: 0, width: '20%', height: '58%' },
  bannerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  speaker: { width: 44, height: 44, borderRadius: 22, backgroundColor: cores.azulBotao, alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 2, borderColor: cores.branco },
  speakerIcon: { fontSize: 20 },
  banner: { backgroundColor: cores.laranja, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 22, borderWidth: 2, borderColor: cores.branco },
  bannerTexto: { fontFamily: fontes.titulo, fontSize: 22, color: cores.branco, letterSpacing: 1 },
  destaque: { fontFamily: fontes.titulo, fontSize: 34, color: cores.texto, textAlign: 'center', letterSpacing: 4, marginTop: 10 },
  opcoes: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  carta: { minWidth: 110, minHeight: 130, margin: 12, borderRadius: 20, borderWidth: 4, borderColor: cores.laranja, backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center', padding: 10 },
  cartaAcerto: { backgroundColor: cores.verdeBotao, borderColor: '#3EA233' },
  cartaErro: { backgroundColor: cores.vermelho, borderColor: '#B83227' },
  letra: { fontFamily: fontes.titulo, fontSize: 64, color: cores.laranja },
  img: { width: 100, height: 100, resizeMode: 'contain' },
  brilho: { position: 'absolute', fontSize: 22 },
  brilhoCima: { top: -6, left: -6 },
  brilhoBaixo: { bottom: -6, right: -6 },
});
