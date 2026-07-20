// src/game/OrdenarSequencia.js
// A criança toca os itens (letras/sílabas/palavras) na ordem certa.
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

export default function OrdenarSequencia({ instrucao, rodadas, onConcluir }) {
  const [i, setI] = useState(0);
  const [passo, setPasso] = useState(0);      // quantos já acertou na ordem
const [flashErro, setFlashErro] = useState(null);
  const errosRef = useRef(0);

  const rodada = rodadas[i]; // { dica, itens, correta }

  function tocar(item, idx) {
    const esperado = rodada.correta[passo];
    if (item === esperado) {
      const novoPasso = passo + 1;
      setPasso(novoPasso);
      if (novoPasso >= rodada.correta.length) {
        setTimeout(() => {
          if (i + 1 >= rodadas.length) {
            onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
          } else {
            setPasso(0); setI(i + 1);
          }
        }, 600);
      }
    } else {
      errosRef.current += 1;
      setFlashErro(idx);
      setTimeout(() => setFlashErro(null), 400);
    }
  }

  const montado = rodada.correta.slice(0, passo).join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>{instrucao}</Text>
      {rodada.dica ? <Text style={styles.dica}>({rodada.dica})</Text> : null}

      <View style={styles.montagem}>
        <Text style={styles.montagemTexto}>{montado || '...'}</Text>
      </View>
<View style={styles.itens}>
        {rodada.itens.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.item, flashErro === idx && { backgroundColor: cores.vermelho }]}
            onPress={() => tocar(item, idx)}
          >
            <Text style={styles.itemTexto}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.contador}>Rodada {i + 1} de {rodadas.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF3E7', alignItems: 'center', justifyContent: 'center', padding: 20 },
  instrucao: { fontSize: 22, fontWeight: 'bold', color: cores.laranja, textAlign: 'center' },
  dica: { fontSize: 16, color: '#7F8C8D', marginBottom: 12 },
  montagem: { minHeight: 60, minWidth: 220, borderBottomWidth: 3, borderColor: cores.laranja, justifyContent: 'center', alignItems: 'center', marginBottom: 28 },
  montagemTexto: { fontSize: 32, fontWeight: 'bold', color: cores.texto, letterSpacing: 3 },
  itens: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  item: { backgroundColor: cores.branco, borderWidth: 2, borderColor: cores.laranja, borderRadius: 12, padding: 14, margin: 6, minWidth: 60, alignItems: 'center' },
  itemTexto: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
  contador: { marginTop: 24, color: '#7F8C8D' },
});
