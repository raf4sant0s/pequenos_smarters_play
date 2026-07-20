// src/game/LigarColunas.js
// A criança toca numa frase e depois na imagem correta para ligá-las.
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

export default function LigarColunas({ rodadas, onConcluir }) {
  const [i, setI] = useState(0);
  const rodada = rodadas[i]; // { pares: [{frase, imagem}] }

  const frases = rodada.pares.map((p, idx) => ({ frase: p.frase, idx }));
  const imagens = useMemo(
    () => embaralhar(rodada.pares.map((p, idx) => ({ imagem: p.imagem, idx }))),
    [i]
  );

  const [fraseSel, setFraseSel] = useState(null);
  const [ligados, setLigados] = useState([]);
  const errosRef = useRef(0);

  function tocarImagem(idx) {
    if (fraseSel == null || ligados.includes(idx)) return;
    if (idx === fraseSel) {
      const novo = [...ligados, idx];
      setLigados(novo);
      setFraseSel(null);
      if (novo.length >= rodada.pares.length) {
        setTimeout(() => {
          if (i + 1 >= rodadas.length) onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
          else { setLigados([]); setI(i + 1); }
        }, 500);
      }
    } else {
      errosRef.current += 1;
      setFraseSel(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>Ligue cada frase à imagem certa</Text>
      <View style={styles.colunas}>
        <View style={styles.coluna}>
          {frases.map((f) => (
            <TouchableOpacity
              key={f.idx}
              disabled={ligados.includes(f.idx)}
              style={[styles.frase, fraseSel === f.idx && styles.selecionada, ligados.includes(f.idx) && styles.ligado]}
              onPress={() => setFraseSel(f.idx)}
            >
              <Text style={styles.fraseTexto}>{f.frase}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.coluna}>
          {imagens.map((im) => (
            <TouchableOpacity
              key={im.idx}
              disabled={ligados.includes(im.idx)}
              style={[styles.imgBox, ligados.includes(im.idx) && styles.ligado]}
              onPress={() => tocarImagem(im.idx)}
            >
              <Image source={im.imagem} style={styles.img} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB', padding: 16, justifyContent: 'center' },
  instrucao: { fontSize: 20, fontWeight: 'bold', color: cores.azul, textAlign: 'center', marginBottom: 20 },
  colunas: { flexDirection: 'row', justifyContent: 'space-between' },
  coluna: { flex: 1, marginHorizontal: 6 },
  frase: { backgroundColor: cores.branco, borderRadius: 12, padding: 14, marginBottom: 14, borderWidth: 2, borderColor: '#ddd' },
  selecionada: { borderColor: cores.laranja },
  ligado: { borderColor: cores.verde, opacity: 0.6 },
  fraseTexto: { fontSize: 15, color: cores.texto },
  imgBox: { backgroundColor: cores.branco, borderRadius: 12, padding: 8, marginBottom: 14, borderWidth: 2, borderColor: '#ddd', alignItems: 'center' },
  img: { width: 80, height: 80, resizeMode: 'contain' },
});