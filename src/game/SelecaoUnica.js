// src/game/SelecaoUnica.js
// Mostra uma pergunta e opções (letras, sílabas, palavras OU imagens).
// A criança toca em uma; o componente confere e passa pra próxima rodada.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

export default function SelecaoUnica({ instrucao, rodadas, onConcluir }) {
  const [i, setI] = useState(0);           // índice da rodada atual
  const [feedback, setFeedback] = useState(null); // 'acerto' | 'erro'
  const [escolhida, setEscolhida] = useState(null);
  const errosRef = useRef(0); // ref evita "valor velho" dentro do setTimeout

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
    <View style={styles.container}>
      <Text style={styles.instrucao}>{rodada.enunciado || instrucao}</Text>
      {rodada.destaque ? <Text style={styles.destaque}>{rodada.destaque}</Text> : null}

      <View style={styles.opcoes}>
        {rodada.opcoes.map((op) => {
          let cor = cores.branco;
          if (escolhida === op.id) cor = feedback === 'acerto' ? cores.verde : cores.vermelho;
          return (
            <TouchableOpacity
              key={op.id}
              style={[styles.opcao, { backgroundColor: cor }]}
              onPress={() => escolher(op.id)}
            >
              {op.Imagem
                ? <op.Imagem width={90} height={90} />
                : op.imagem
                ? <Image source={op.imagem} style={styles.img} />
                : <Text style={styles.opcaoTexto}>{op.texto}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.contador}>Rodada {i + 1} de {rodadas.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center', padding: 20 },
  instrucao: { fontSize: 24, fontWeight: 'bold', color: cores.azul, textAlign: 'center', marginBottom: 16 },
  destaque: { fontSize: 40, fontWeight: 'bold', color: cores.texto, letterSpacing: 4, marginBottom: 24 },
  opcoes: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  opcao: { minWidth: 90, minHeight: 90, margin: 8, borderRadius: 16, borderWidth: 2, borderColor: cores.azul, alignItems: 'center', justifyContent: 'center', padding: 8 },
  opcaoTexto: { fontSize: 34, fontWeight: 'bold', color: cores.texto },
  img: { width: 100, height: 100, resizeMode: 'contain' },
  contador: { marginTop: 28, color: '#7F8C8D' },
});

