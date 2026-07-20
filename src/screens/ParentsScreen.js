// src/screens/ParentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { buscarProgresso } from '../services/progresso';
import { buscarPerfil } from '../services/auth';
import { cores } from '../utils/cores';

const NOMES_ILHAS = {
  natureza: 'Ilha da Natureza',
  deserto: 'Ilha do Deserto',
  gelo: 'Ilha do Gelo',
  ventos: 'Ilha dos Ventos',
  fogo: 'Ilha do Fogo',
  lagos: 'Ilha dos Lagos',
};

const DICAS = {
  natureza: 'Pratique vogais e consoantes com flashcards.',
  deserto: 'Reforce consoantes formando palavras simples.',
  gelo: 'Treine sílabas juntando pedacinhos de palavras.',
  ventos: 'Leia palavras e frases curtas em voz alta.',
  fogo: 'Converse sobre o sentido de frases curtas.',
  lagos: 'Incentive a escrever palavras que já conhece.',
};

export default function ParentsScreen() {
  const [progresso, setProgresso] = useState([]);
  const [nomeCrianca, setNomeCrianca] = useState('');

  useEffect(() => {
    buscarProgresso().then(setProgresso);
    buscarPerfil().then((p) => setNomeCrianca(p?.nome_crianca || 'a criança'));
  }, []);

  // Agrupa por ilha somando estrelas
  const porIlha = {};
  progresso.forEach((p) => {
    if (!porIlha[p.ilha]) porIlha[p.ilha] = { estrelas: 0, fases: 0 };
    porIlha[p.ilha].estrelas += p.estrelas;
    porIlha[p.ilha].fases += 1;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.titulo}>Painel dos Pais</Text>
      <Text style={styles.sub}>Acompanhando: {nomeCrianca}</Text>

      {Object.keys(NOMES_ILHAS).map((chave) => {
        const dados = porIlha[chave];
        return (
          <View key={chave} style={styles.card}>
            <Text style={styles.ilhaNome}>{NOMES_ILHAS[chave]}</Text>
            {dados ? (
              <Text style={styles.info}>
                ⭐ {dados.estrelas} estrelas • {dados.fases} fase(s) concluída(s)
              </Text>
            ) : (
              <Text style={styles.info}>Ainda não iniciada</Text>
            )}
            <Text style={styles.dica}>💡 {DICAS[chave]}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF3FB' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.azul },
  sub: { fontSize: 15, color: cores.texto, marginBottom: 16 },
  card: { backgroundColor: cores.branco, borderRadius: 16, padding: 16, marginBottom: 12 },
  ilhaNome: { fontSize: 18, fontWeight: 'bold', color: cores.laranja },
  info: { fontSize: 15, color: cores.texto, marginTop: 4 },
  dica: { fontSize: 13, color: '#7F8C8D', marginTop: 8, fontStyle: 'italic' },
});
