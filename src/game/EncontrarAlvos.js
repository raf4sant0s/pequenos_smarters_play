// src/game/EncontrarAlvos.js
// Mostra várias letras; a criança toca nas que seguem a regra (ex: vogais).
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

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
      if (novos.length >= totalAlvos) {
        setTimeout(proxima, 600);
      }
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
    <View style={styles.container}>
      <Text style={styles.instrucao}>{instrucao}</Text>
      <View style={styles.grade}>
        {rodada.itens.map((letra, index) => {
          let cor = cores.branco;
          if (encontrados.includes(index)) cor = cores.verde;
          if (errados.includes(index)) cor = cores.vermelho;
return (
            <TouchableOpacity
              key={index}
              style={[styles.letra, { backgroundColor: cor }]}
              onPress={() => tocar(index, letra)}
            >
              <Text style={styles.letraTexto}>{letra}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.contador}>Rodada {i + 1} de {rodadas.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF7EA', alignItems: 'center', justifyContent: 'center', padding: 16 },
  instrucao: { fontSize: 22, fontWeight: 'bold', color: cores.verde, textAlign: 'center', marginBottom: 16 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 360 },
  letra: { width: 60, height: 60, margin: 6, borderRadius: 12, borderWidth: 2, borderColor: cores.verde, alignItems: 'center', justifyContent: 'center' },
  letraTexto: { fontSize: 28, fontWeight: 'bold', color: cores.texto },
  contador: { marginTop: 24, color: '#7F8C8D' },
});
