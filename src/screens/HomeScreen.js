// src/screens/HomeScreen.js — tela inicial (horizontal)
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CenarioEntrada from '../components/CenarioEntrada';
import BotaoPlay from '../components/BotaoPlay';
import { useAuth } from '../navigation/AuthContext';
import { sair } from '../services/auth';

const LOGO_PERS = require('../../assets/images/logo_com_personagem.png');

export default function HomeScreen({ navigation }) {
  const { session } = useAuth();

  // Se já está logado, o play vai direto pro Ziggy; senão, pro Login.
  function jogar() {
    navigation.navigate(session ? 'Welcome' : 'Login');
  }

  return (
    <CenarioEntrada mostrarHome={false} onSair={session ? () => sair() : undefined}>
      <View style={styles.centro}>
        <Image source={LOGO_PERS} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={jogar} activeOpacity={0.8} style={styles.play}>
          <BotaoPlay size={84} />
        </TouchableOpacity>
      </View>
    </CenarioEntrada>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: '60%', height: 220, alignSelf: 'center' },
  play: { marginTop: 8 },
});
