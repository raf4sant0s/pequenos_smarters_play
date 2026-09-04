// src/components/PopupSair.js — popup de confirmação ao sair de uma atividade.
// "Continuar aqui" (fica) x "Sair mesmo assim" (sai). Card laranja com contorno branco.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function PopupSair({ visivel, onContinuar, onSair }) {
  return (
    <Modal visible={visivel} transparent statusBarTranslucent animationType="fade" onRequestClose={onContinuar}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Deseja mesmo sair da atividade?</Text>

          <TouchableOpacity style={[styles.btn, styles.btnFicar]} activeOpacity={0.85} onPress={onContinuar}>
            <Text style={styles.btnTexto}>Continuar aqui</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnSair]} activeOpacity={0.85} onPress={onSair}>
            <Text style={styles.btnTexto}>Sair mesmo assim</Text>
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
  titulo: { fontFamily: fontes.titulo, fontSize: 20, color: cores.branco, textAlign: 'center', marginBottom: 10 },
  btn: {
    width: '100%', height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    marginTop: 8, borderWidth: 2, borderColor: cores.branco,
  },
  btnFicar: { backgroundColor: cores.azulBotao },
  btnSair: { backgroundColor: '#D64541' },
  btnTexto: { fontFamily: fontes.titulo, fontSize: 17, color: cores.branco },
});
