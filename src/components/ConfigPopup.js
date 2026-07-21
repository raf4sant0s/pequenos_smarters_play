// src/components/ConfigPopup.js — popup de configurações (Som/Voz/Créditos)
import React from 'react';
import { Text, Modal, Switch, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function ConfigPopup({ visivel, onFechar, som, setSom, voz, setVoz }) {
  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <Pressable style={styles.overlay} onPress={onFechar}>
        <Pressable style={styles.painel} onPress={() => {}}>
          <TouchableOpacity style={styles.voltar} onPress={onFechar}>
            <Text style={styles.voltarTexto}>↩</Text>
          </TouchableOpacity>

          <Pressable style={styles.linha}>
            <Text style={styles.label}>Som</Text>
            <Switch value={som} onValueChange={setSom} trackColor={{ true: cores.azulBotao }} />
          </Pressable>

          <Pressable style={styles.linha}>
            <Text style={styles.label}>Voz</Text>
            <Switch value={voz} onValueChange={setVoz} trackColor={{ true: cores.azulBotao }} />
          </Pressable>

          <TouchableOpacity>
            <Text style={styles.creditos}>Créditos</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painel: { backgroundColor: '#C9E6F7', borderRadius: 24, paddingVertical: 24, paddingHorizontal: 32, width: 320, borderWidth: 3, borderColor: cores.branco },
  voltar: { position: 'absolute', top: 10, left: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: cores.branco, borderWidth: 2, borderColor: cores.laranja, alignItems: 'center', justifyContent: 'center' },
  voltarTexto: { fontSize: 20, color: cores.laranja },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 10 },
  label: { fontFamily: fontes.titulo, fontSize: 26, color: cores.laranja },
  creditos: { fontFamily: fontes.subtitulo, fontSize: 18, color: cores.laranja, textAlign: 'center', marginTop: 18 },
});
