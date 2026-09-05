// src/components/PopupEmConstrucao.js — aviso de fase que ainda não está pronta.
// Aparece quando a criança toca o cadeado de uma fase em construção.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function PopupEmConstrucao({ visivel, onFechar }) {
  return (
    <Modal visible={visivel} transparent statusBarTranslucent animationType="fade" onRequestClose={onFechar}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🚧</Text>
          <Text style={styles.titulo}>Fase em construção!</Text>
          <Text style={styles.texto}>Essa fase ainda está sendo feita. Volte em breve!</Text>

          <TouchableOpacity style={styles.btn} activeOpacity={0.85} onPress={onFechar}>
            <Text style={styles.btnTexto}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  card: {
    backgroundColor: cores.laranja, borderRadius: 22, paddingVertical: 16, paddingHorizontal: 20,
    width: 330, maxWidth: '80%', alignItems: 'center',
    borderWidth: 3, borderColor: cores.branco,
  },
  emoji: { fontSize: 34, marginBottom: 2 },
  titulo: { fontFamily: fontes.titulo, fontSize: 20, color: cores.branco, textAlign: 'center' },
  texto: { fontFamily: fontes.titulo, fontSize: 16, color: cores.branco, textAlign: 'center', marginTop: 6 },
  btn: {
    width: '100%', height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    marginTop: 12, borderWidth: 2, borderColor: cores.branco, backgroundColor: cores.azulBotao,
  },
  btnTexto: { fontFamily: fontes.titulo, fontSize: 17, color: cores.branco },
});
