// src/components/Fundo.js — fundo de tela reutilizável (céu por padrão)
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const CEU = require('../../assets/images/fundo_nuvens.png');

export default function Fundo({ source, children, style }) {
  return (
    <ImageBackground source={source || CEU} style={[styles.fundo, style]} resizeMode="cover">
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, width: '100%', height: '100%' },
});
