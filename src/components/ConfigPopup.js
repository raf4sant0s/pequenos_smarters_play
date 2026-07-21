// src/components/ConfigPopup.js — popup de configurações (Som/Voz/Créditos/Sair)
import React from 'react';
import { Text, Modal, Switch, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function ConfigPopup({ visivel, onFechar, som, setSom, voz, setVoz, onSair }) {
  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <Pressable style={styles.overlay} onPress={onFechar}>
        <Pressable style={styles.painel} onPress={() => {}}>
          <TouchableOpacity style={styles.voltar} onPress={onFechar}>
            <Text style={styles.voltarTexto}>↩</Text>
          </TouchableOpacity>

          <Pressable style={styles.linha}>
            <Text style={styles.label}>Som</Text>
            <Text style={styles.icone}>🔊</Text>
            <Switch value={som} onValueChange={setSom} trackColor={{ true: cores.azulBotao }} />
          </Pressable>

          <Pressable style={styles.linha}>
            <Text style={styles.label}>Voz</Text>
            <Text style={styles.icone}>🔊</Text>
            <Switch value={voz} onValueChange={setVoz} trackColor={{ true: cores.azulBotao }} />
          </Pressable>

          <TouchableOpacity>
            <Text style={styles.creditos}>Créditos</Text>
          </TouchableOpacity>

          {onSair && (
            <TouchableOpacity style={styles.botaoSair} onPress={onSair}>
              <Text style={styles.sairTexto}>SAIR</Text>
            </TouchableOpacity>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painel: { backgroundColor: '#CDE7F7', borderRadius: 26, paddingVertical: 22, paddingHorizontal: 30, width: 340, borderWidth: 3, borderColor: '#2C5A8C' },
  voltar: { position: 'absolute', top: 10, left: 10, width: 42, height: 42, borderRadius: 21, backgroundColor: cores.branco, borderWidth: 3, borderColor: cores.laranja, alignItems: 'center', justifyContent: 'center' },
  voltarTexto: { fontSize: 20, color: cores.azulBotao },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  label: { fontFamily: fontes.titulo, fontSize: 28, color: cores.laranja, width: 90, textAlign: 'center' },
  icone: { fontSize: 22, marginHorizontal: 14 },
  creditos: { fontFamily: fontes.subtitulo, fontSize: 18, color: cores.laranja, textAlign: 'center', marginTop: 18 },
  botaoSair: { backgroundColor: cores.vermelho, borderRadius: 18, paddingVertical: 10, marginTop: 18, borderWidth: 2, borderColor: cores.branco },
  sairTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco, textAlign: 'center' },
});
