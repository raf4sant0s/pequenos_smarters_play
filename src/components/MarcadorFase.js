// src/components/MarcadorFase.js — rótulo da fase + botão (play OU cadeado).
// Usado nas telas das ilhas. Fase trancada: toca som de erro e "treme".
import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import TextoContorno from './TextoContorno';
import BotaoPlay from './BotaoPlay';
import BotaoCadeado from './BotaoCadeado';
import { useAudio } from '../navigation/AudioContext';
import { cores } from '../utils/cores';
import { fontes } from '../utils/tema';

export default function MarcadorFase({ titulo, bloqueada, onPress, style, corPlay = '#63C0E8' }) {
  const { tocarErro } = useAudio();
  const shake = useRef(new Animated.Value(0)).current;

  function aoTocarTrancado() {
    tocarErro();
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });

  return (
    <View style={[styles.marcador, style]}>
      <TextoContorno containerStyle={styles.labelWrap} textStyle={styles.label} corContorno="#000000" espessura={1.2}>
        {titulo}
      </TextoContorno>

      {bloqueada ? (
        <Animated.View style={{ transform: [{ translateX }] }}>
          <TouchableOpacity onPress={aoTocarTrancado} activeOpacity={0.9}>
            <BotaoCadeado size={45} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
          <BotaoPlay size={45} corFundo={corPlay} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  marcador: { position: 'absolute', alignItems: 'center', width: 130, zIndex: 6 },
  labelWrap: { marginBottom: -2 },
  label: { fontFamily: fontes.titulo, fontSize: 16, color: cores.branco, textAlign: 'center', lineHeight: 18 },
});
