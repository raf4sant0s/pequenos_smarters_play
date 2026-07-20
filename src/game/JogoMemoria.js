// Jogo da memória de sílabas. Recebe uma lista de sílabas e monta os pares.
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { calcularEstrelas } from '../utils/estrelas';
import { cores } from '../utils/cores';

function embaralhar(a) { return [...a].sort(() => Math.random() - 0.5); }

export default function JogoMemoria({ pares, onConcluir }) {
  // cria 2 cartões por sílaba e embaralha
  const cartas = useMemo(
    () => embaralhar([...pares, ...pares].map((s, idx) => ({ id: idx, silaba: s }))),
    []
  );
  const [viradas, setViradas] = useState([]);     // ids virados agora (máx 2)
  const [encontradas, setEncontradas] = useState([]); // sílabas já resolvidas
  const errosRef = useRef(0);
  const travado = useRef(false);

  function virar(carta) {
    if (travado.current) return;
    if (viradas.find((c) => c.id === carta.id)) return;
    if (encontradas.includes(carta.silaba)) return;

    const novas = [...viradas, carta];
    setViradas(novas);

    if (novas.length === 2) {
      travado.current = true;
      const [a, b] = novas;
      if (a.silaba === b.silaba) {
        setTimeout(() => {
          setEncontradas((e) => {
            const atualizado = [...e, a.silaba];
            if (atualizado.length >= pares.length) {
              onConcluir(calcularEstrelas(errosRef.current), errosRef.current);
            }
            return atualizado;
          });
          setViradas([]); travado.current = false;
        }, 500);
      } else {
        errosRef.current += 1;
        setTimeout(() => { setViradas([]); travado.current = false; }, 800);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>Encontre os pares de sílabas!</Text>
      <View style={styles.grade}>
        {cartas.map((carta) => {
          const aberta = viradas.find((c) => c.id === carta.id) || encontradas.includes(carta.silaba);
          return (
            <TouchableOpacity
              key={carta.id}
              style={[styles.carta, aberta && styles.cartaAberta]}
              onPress={() => virar(carta)}
            >
              <Text style={styles.cartaTexto}>{aberta ? carta.silaba : '❄️'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F4FB', alignItems: 'center', justifyContent: 'center', padding: 16 },
  instrucao: { fontSize: 22, fontWeight: 'bold', color: cores.azul, marginBottom: 16 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 320 },
  carta: { width: 68, height: 68, margin: 6, borderRadius: 12, backgroundColor: cores.azul, alignItems: 'center', justifyContent: 'center' },
  cartaAberta: { backgroundColor: cores.branco, borderWidth: 2, borderColor: cores.azul },
  cartaTexto: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
});
