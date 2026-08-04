// src/screens/HomeScreen.js — tela inicial (horizontal)
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fundo from '../components/Fundo';
import ConfigPopup from '../components/ConfigPopup';
import { useAuth } from '../navigation/AuthContext';
import { sair } from '../services/auth';

const LOGO_PERS = require('../../assets/images/logo_com_personagem.png');
const PLAY = require('../../assets/images/botao_play.png');
const GEAR = require('../../assets/images/botao_config.png');

const ILHAS = {
  deserto: require('../../assets/images/ilha_deserto.png'),
  natureza: require('../../assets/images/ilha_natureza.png'),
  agua: require('../../assets/images/ilha_lagos.png'),
  gelo: require('../../assets/images/ilha_gelo.png'),
  vento: require('../../assets/images/ilha_vento.png'),
  fogo: require('../../assets/images/ilha_fogo.png'),
};

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const [config, setConfig] = useState(false);
  const [som, setSom] = useState(true);
  const [voz, setVoz] = useState(true);

  // Se já está logado, o play vai direto pro Ziggy; senão, pro Login.
  function jogar() {
    navigation.navigate(session ? 'Welcome' : 'Login');
  }

  async function handleSair() {
    setConfig(false);
    await sair(); // volta ao estado deslogado; o play passa a levar pro Login
  }

  return (
    <Fundo>
      <Image source={ILHAS.deserto} style={[styles.ilha, { top: '8%', left: '9%' }]} />
      <Image source={ILHAS.natureza} style={[styles.ilha, { top: '40%', left: '4%' }]} />
      <Image source={ILHAS.agua} style={[styles.ilha, { top: '70%', left: '15%' }]} />
      <Image source={ILHAS.gelo} style={[styles.ilha, { top: '10%', right: '11%' }]} />
      <Image source={ILHAS.vento} style={[styles.ilha, { top: '42%', right: '5%' }]} />
      <Image source={ILHAS.fogo} style={[styles.ilha, { top: '70%', right: '13%' }]} />

      <TouchableOpacity style={[styles.gear, { top: insets.top + 10, left: insets.left + 16 }]} onPress={() => setConfig(true)}>
        <Image source={GEAR} style={styles.gearImg} resizeMode="contain" />
      </TouchableOpacity>

      <View style={styles.centro}>
        <Image source={LOGO_PERS} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={jogar} activeOpacity={0.8}>
          <Image source={PLAY} style={styles.play} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ConfigPopup
        visivel={config}
        onFechar={() => setConfig(false)}
        som={som}
        setSom={setSom}
        voz={voz}
        setVoz={setVoz}
        onSair={session ? handleSair : undefined}
      />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilha: { position: 'absolute', width: 95, height: 95, resizeMode: 'contain' },
  gear: { position: 'absolute', zIndex: 10 },
  gearImg: { width: 52, height: 52 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: '52%', height: 190 },
  play: { width: 84, height: 84, marginTop: 6 },
});
