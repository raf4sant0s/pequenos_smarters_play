// src/screens/SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { buscarConfig, salvarConfig } from '../services/config';
import { sair } from '../services/auth';
import { cores } from '../utils/cores';

export default function SettingsScreen() {
  const [som, setSom] = useState(true);
  const [voz, setVoz] = useState(true);

  useEffect(() => {
    buscarConfig().then((c) => { setSom(c.som_ativo); setVoz(c.voz_ativa); });
  }, []);

  function mudarSom(v) { setSom(v); salvarConfig(v, voz); }
  function mudarVoz(v) { setVoz(v); salvarConfig(som, v); }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.linha}>
        <Text style={styles.label}>🔊 Som</Text>
        <Switch value={som} onValueChange={mudarSom} />
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>🗣️ Voz</Text>
        <Switch value={voz} onValueChange={mudarVoz} />
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={sair}>
        <Text style={styles.sairTexto}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#EAF3FB' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.azul, marginBottom: 24 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: cores.branco, padding: 16, borderRadius: 16, marginBottom: 12 },
  label: { fontSize: 18, color: cores.texto },
  botaoSair: { marginTop: 32, backgroundColor: cores.vermelho, padding: 14, borderRadius: 16 },
  sairTexto: { color: cores.branco, textAlign: 'center', fontWeight: 'bold' },
});
