// src/components/ConfigPopup.js — popup de configurações (Som/Voz/Créditos/Sair)
import React from 'react';
import { View, Text, Modal, Switch, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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

          <Text style={styles.titulo}>CONFIGURAÇÕES</Text>

          <View style={styles.linha}>
            <Text style={styles.label}>🔊  Som</Text>
            <Switch value={som} onValueChange={setSom} trackColor={{ true: cores.azulBotao, false: '#B9C7D3' }} thumbColor={cores.branco} />
          </View>

          <View style={styles.linha}>
            <Text style={styles.label}>🎤  Voz</Text>
            <Switch value={voz} onValueChange={setVoz} trackColor={{ true: cores.azulBotao, false: '#B9C7D3' }} thumbColor={cores.branco} />
          </View>

          <TouchableOpacity style={styles.creditosBtn}>
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
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  painel: { backgroundColor: '#CDE7F7', borderRadius: 28, paddingTop: 44, paddingBottom: 22, paddingHorizontal: 28, width: 340, maxWidth: '86%', borderWidth: 3, borderColor: '#2C5A8C' },
  voltar: { position: 'absolute', top: 12, left: 12, width: 42, height: 42, borderRadius: 21, backgroundColor: cores.branco, borderWidth: 3, borderColor: cores.laranja, alignItems: 'center', justifyContent: 'center' },
  voltarTexto: { fontSize: 20, color: cores.azulBotao },
  titulo: { fontFamily: fontes.titulo, fontSize: 24, color: cores.azulEscuro, textAlign: 'center', marginBottom: 14 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: cores.branco, borderRadius: 16, paddingVertical: 10, paddingHorizontal: 18, marginBottom: 10 },
  label: { fontFamily: fontes.subtitulo, fontSize: 20, color: cores.laranja },
  creditosBtn: { alignItems: 'center', marginTop: 4 },
  creditos: { fontFamily: fontes.subtitulo, fontSize: 16, color: cores.azulEscuro, textDecorationLine: 'underline' },
  botaoSair: { backgroundColor: cores.vermelho, borderRadius: 18, paddingVertical: 11, marginTop: 16, borderWidth: 2, borderColor: cores.branco },
  sairTexto: { fontFamily: fontes.titulo, fontSize: 18, color: cores.branco, textAlign: 'center' },
});
