// src/components/Slider.js — barrinha deslizante (0–100), sem biblioteca externa.
// Usa a posição ABSOLUTA na tela (pageX) pra não "pular" durante o arraste.
import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

export default function Slider({ valor = 0, onChange, cor = '#F5821F' }) {
  const ref = useRef(null);
  const geom = useRef({ x: 0, w: 0 });

  function medir() {
    const node = ref.current;
    if (node && node.measureInWindow) {
      node.measureInWindow((x, y, w) => { geom.current = { x, w }; });
    }
  }

  function setPorPagina(pageX) {
    const { x, w } = geom.current;
    if (!w) return;
    let v = Math.round(((pageX - x) / w) * 100);
    v = Math.max(0, Math.min(100, v));
    onChange && onChange(v);
  }

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => setPorPagina(e.nativeEvent.pageX),
      onPanResponderMove: (e) => setPorPagina(e.nativeEvent.pageX),
    })
  ).current;

  return (
    <View ref={ref} onLayout={medir} style={styles.wrap} {...pan.panHandlers}>
      <View style={styles.trilha} />
      <View style={[styles.preenchido, { width: `${valor}%`, backgroundColor: cor }]} />
      <View style={[styles.thumb, { left: `${valor}%`, backgroundColor: cor }]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 28, justifyContent: 'center' },
  trilha: { height: 6, borderRadius: 3, backgroundColor: '#CBE3F6' },
  preenchido: { position: 'absolute', height: 6, borderRadius: 3, left: 0 },
  thumb: { position: 'absolute', width: 18, height: 18, borderRadius: 9, marginLeft: -9, borderWidth: 3, borderColor: '#FFFFFF' },
});
