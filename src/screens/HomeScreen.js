// src/screens/HomeScreen.js — tela inicial (horizontal)
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fundo from '../components/Fundo';
import ConfigPopup from '../components/ConfigPopup';

const LOGO_PERS = require('../../assets/images/logoEpersonagens.png');
const PLAY = require('../../assets/images/botao_play.png');
const GEAR = require('../../assets/images/botao_config.png');

const ILHAS = {
  deserto: require('../../assets/images/ilhaDeserto.png'),
  natureza: require('../../assets/images/ilhaNatureza.png'),
  agua: require('../../assets/images/ilhaAgua.png'),
  gelo: require('../../assets/images/ilhaGelo.png'),
  vento: require('../../assets/images/ilhaVento.png'),
  fogo: require('../../assets/images/ilhaFogo.png'),
};

export default function HomeScreen({ navigation }) {
  const [config, setConfig] = useState(false);
  const [som, setSom] = useState(true);
  const [voz, setVoz] = useState(true);

  return (
    <Fundo>
      {/* Ilhas decorativas ao redor */}
      <Image source={ILHAS.deserto} style={[styles.ilha, { top: '8%', left: '9%' }]} />
      <Image source={ILHAS.natureza} style={[styles.ilha, { top: '40%', left: '4%' }]} />
      <Image source={ILHAS.agua} style={[styles.ilha, { top: '70%', left: '15%' }]} />
      <Image source={ILHAS.gelo} style={[styles.ilha, { top: '10%', right: '11%' }]} />
      <Image source={ILHAS.vento} style={[styles.ilha, { top: '42%', right: '5%' }]} />
      <Image source={ILHAS.fogo} style={[styles.ilha, { top: '70%', right: '13%' }]} />

      {/* Engrenagem de configurações */}
      <TouchableOpacity style={styles.gear} onPress={() => setConfig(true)}>
        <Image source={GEAR} style={styles.gearImg} />
      </TouchableOpacity>

      {/* Centro: logo + personagens + botão play */}
      <View style={styles.centro}>
        <Image source={LOGO_PERS} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
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
      />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  ilha: { position: 'absolute', width: 95, height: 95, resizeMode: 'contain' },
  gear: { position: 'absolute', top: 16, left: 16, zIndex: 10 },
  gearImg: { width: 52, height: 52 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: '52%', height: 190 },
  play: { width: 84, height: 84, marginTop: 6 },
});
