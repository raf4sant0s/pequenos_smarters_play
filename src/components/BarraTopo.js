// src/components/BarraTopo.js — barra do topo das telas do jogo
// esquerda: ⚙ config + logo | direita: estrelas + Painel dos Pais + 🏠 casa
// Respeita a área segura (status bar / barra de botões do celular).
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfigPopup from './ConfigPopup';
import { sair } from '../services/auth';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const LOGO = require('../../assets/images/logo.png');
const ESTRELAS = require('../../assets/images/estrelas.png');
const GEAR = require('../../assets/images/botao_config.png');
const HOME = require('../../assets/images/botao_home.png');

// home = rota pra onde o botão casinha leva (ex.: a ilha atual). Padrão: 'Welcome'.
export default function BarraTopo({ home = 'Welcome', mostrarPainel = true, mostrarHome = true }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [config, setConfig] = useState(false);
  const [som, setSom] = useState(true);
  const [voz, setVoz] = useState(true);

  async function handleSair() {
    setConfig(false);
    await sair();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return (
    <View style={[styles.barra, { paddingTop: insets.top + 8, paddingLeft: insets.left + 12, paddingRight: insets.right + 12 }]}>
      <View style={styles.lado}>
        <TouchableOpacity onPress={() => setConfig(true)}>
          <Image source={GEAR} style={styles.gear} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.lado}>
        <Image source={ESTRELAS} style={styles.estrelas} resizeMode="contain" />
        {mostrarPainel && (
          <TouchableOpacity style={styles.painel} onPress={() => navigation.navigate('Parents')}>
            <Text style={styles.painelTexto}>Painel dos Pais</Text>
          </TouchableOpacity>
        )}
        {mostrarHome && (
          <TouchableOpacity onPress={() => navigation.navigate(home)}>
            <Image source={HOME} style={styles.home} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

      <ConfigPopup
        visivel={config}
        onFechar={() => setConfig(false)}
        som={som}
        setSom={setSom}
        voz={voz}
        setVoz={setVoz}
        onSair={handleSair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barra: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lado: { flexDirection: 'row', alignItems: 'center' },
  gear: { width: 40, height: 40, marginRight: 8 },
  logo: { width: 130, height: 42 },
  estrelas: { width: 78, height: 28, marginRight: 10 },
  painel: { backgroundColor: cores.branco, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 2, borderColor: cores.azul, marginRight: 8 },
  painelTexto: { color: cores.azul, fontFamily: fontes.subtitulo, fontSize: 13 },
  home: { width: 40, height: 40 },
});
