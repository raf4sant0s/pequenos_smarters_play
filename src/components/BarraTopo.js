// src/components/BarraTopo.js — barra do topo das telas do jogo
// esquerda: ⚙ config + logo | direita: estrelas (média geral) + 🏠 casa
// O "Painel dos Pais" agora fica DENTRO das configurações (⚙).
import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfigPopup from './ConfigPopup';
import Estrela from './Estrela';
import { sair } from '../services/auth';
import { buscarProgresso } from '../services/progresso';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

const LOGO = require('../../assets/images/logo_nome.png');
const GEAR = require('../../assets/images/botao_config.png');
const HOME = require('../../assets/images/botao_home.png');

// home = rota pra onde o botão casinha leva (ex.: a ilha atual). Padrão: 'Welcome'.
export default function BarraTopo({ home = 'Welcome', mostrarHome = true, mostrarEstrelas = true }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [config, setConfig] = useState(false);
  const [media, setMedia] = useState(0); // média de estrelas (0–3)

  // Recalcula a média de estrelas sempre que a tela ganha foco.
  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      buscarProgresso()
        .then((lista) => {
          if (!ativo) return;
          if (!lista || !lista.length) { setMedia(0); return; }
          const soma = lista.reduce((a, p) => a + (p.estrelas || 0), 0);
          setMedia(Math.max(0, Math.min(3, Math.round(soma / lista.length))));
        })
        .catch(() => { });
      return () => { ativo = false; };
    }, [])
  );

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
        {mostrarEstrelas && (
          <View style={styles.estrelas}>
            {[1, 2, 3].map((n) => (
              <View key={n} style={n === 2 ? styles.estrelaMeio : styles.estrelaLado}>
                <Estrela size={n === 2 ? 32 : 30} cheia={n <= media} />
              </View>
            ))}
          </View>
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
        onSair={handleSair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barra: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lado: { flexDirection: 'row', alignItems: 'center' },
  gear: { width: 40, height: 40, marginRight: 8 },
  logo: { width: 160, height: 62 },
  estrelas: { flexDirection: 'row', alignItems: 'flex-end', marginRight: 12, gap: 2 },
  estrelaLado: {},
  estrelaMeio: { marginBottom: 8 },
  home: { width: 50, height: 50 },
});
