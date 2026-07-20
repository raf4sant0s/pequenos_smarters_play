// src/game/DigitarPalavra.js
// A criança digita a palavra e confere. Mostra letra por letra em cores.
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

export default function DigitarPalavra({ rodadas, onConcluir }) {
  const [i, setI] = useState(0);
  const [texto, setTexto] = useState('');
  const [tentou, setTentou] = useState(false);
  const errosRef = useRef(0);

  const rodada = rodadas[i];              // { dica, palavra }
  const alvo = rodada.palavra.toUpperCase();

  function verificar() {
    if (texto.toUpperCase() === alvo) {
      setTexto(''); setTentou(false);
      if (i + 1 >= rodadas.length) {
        onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
      } else {
        setI(i + 1);
      }
    } else {
      errosRef.current += 1;
      setTentou(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>Escreva o nome:</Text>
<Text style={styles.dica}>Dica: {rodada.dica}</Text>

      {/* Mostra a palavra digitada letra por letra, colorindo certo/errado */}
      <View style={styles.letras}>
        {alvo.split('').map((letraCerta, idx) => {
          const digitada = texto.toUpperCase()[idx] || '';
          const cor = !digitada ? '#BDC3C7' : digitada === letraCerta ? cores.azul : cores.vermelho;
          return <Text key={idx} style={[styles.slot, { color: cor }]}>{digitada || '_'}</Text>;
        })}
      </View>

      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        autoCapitalize="characters"
        placeholder="digite aqui"
      />
      {tentou ? <Text style={styles.erro}>Quase! Olhe a imagem e tente de novo.</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={verificar}>
        <Text style={styles.botaoTexto}>VERIFICAR</Text>
      </TouchableOpacity>
      <Text style={styles.contador}>Palavra {i + 1} de {rodadas.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF7EA', alignItems: 'center', justifyContent: 'center', padding: 20 },
  instrucao: { fontSize: 22, fontWeight: 'bold', color: cores.verde },
  dica: { fontSize: 18, color: cores.texto, marginBottom: 20 },
  letras: { flexDirection: 'row', marginBottom: 20 },
  slot: { fontSize: 40, fontWeight: 'bold', marginHorizontal: 4 },
  input: { borderWidth: 2, borderColor: cores.verde, borderRadius: 12, padding: 12, fontSize: 24, width: 220, textAlign: 'center', backgroundColor: cores.branco },
  erro: { color: cores.vermelho, marginTop: 10 },
  botao: { backgroundColor: cores.verde, padding: 14, borderRadius: 16, marginTop: 20, width: 220 },
  botaoTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  contador: { marginTop: 20, color: '#7F8C8D' },
});
