// src/components/CenarioEntrada.js
// Cenário comum das telas de entrada (Home/Login/Cadastro):
// fundo de nuvens + 6 ilhas decorativas ao redor + botão de config + botão home.
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fundo from './Fundo';
import ConfigPopup from './ConfigPopup';

const GEAR = require('../../assets/images/botao_config.png');
const HOME = require('../../assets/images/botao_home.png');

const ILHAS = {
  deserto: require('../../assets/images/ilha_deserto.png'),
  natureza: require('../../assets/images/ilha_natureza.png'),
  lagos: require('../../assets/images/ilha_lagos.png'),
  gelo: require('../../assets/images/ilha_gelo.png'),
  vento: require('../../assets/images/ilha_vento.png'),
  fogo: require('../../assets/images/ilha_fogo.png'),
};

export default function CenarioEntrada({ children, mostrarHome = true, mostrarConfig = true, onSair }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [config, setConfig] = useState(false);
  const [som, setSom] = useState(true);
  const [voz, setVoz] = useState(true);

  return (
    <Fundo>
      {/* Ilhas decorativas (não recebem toque, ficam atrás) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={ILHAS.deserto} style={[styles.ilha, { top: '13%', left: '17%' }]} resizeMode="contain" />
        <Image source={ILHAS.natureza} style={[styles.ilha, { top: '45%', left: '8%' }]} resizeMode="contain" />
        <Image source={ILHAS.lagos} style={[styles.ilha, { top: '71%', left: '18%' }]} resizeMode="contain" />
        <Image source={ILHAS.gelo} style={[styles.ilha, { top: '12%', right: '16%' }]} resizeMode="contain" />
        <Image source={ILHAS.vento} style={[styles.ilha, { top: '45%', right: '8%' }]} resizeMode="contain" />
        <Image source={ILHAS.fogo} style={[styles.ilha, { top: '71%', right: '17%' }]} resizeMode="contain" />
      </View>

      {mostrarConfig && (
        <TouchableOpacity style={[styles.canto, { top: insets.top + 8, left: insets.left + 12 }]} onPress={() => setConfig(true)}>
          <Image source={GEAR} style={styles.gear} resizeMode="contain" />
        </TouchableOpacity>
      )}
      {mostrarHome && (
        <TouchableOpacity style={[styles.canto, { top: insets.top + 8, right: insets.right + 12 }]} onPress={() => navigation.navigate('Home')}>
          <Image source={HOME} style={styles.homeImg} resizeMode="contain" />
        </TouchableOpacity>
      )}

      <View style={[styles.conteudo, { paddingLeft: insets.left, paddingRight: insets.right }]}>
        {children}
      </View>

      <ConfigPopup
        visivel={config}
        onFechar={() => setConfig(false)}
        som={som} setSom={setSom} voz={voz} setVoz={setVoz}
        onSair={onSair ? () => { setConfig(false); onSair(); } : undefined}
      />
    </Fundo>
  );
}

const styles = StyleSheet.create({
  conteudo: { flex: 1 },
  ilha: { position: 'absolute', width: 112, height: 112 },
  canto: { position: 'absolute', zIndex: 20 },
  gear: { width: 48, height: 48 },
  homeImg: { width: 44, height: 44 },
});
