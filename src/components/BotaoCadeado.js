// src/components/BotaoCadeado.js — botão de fase TRANCADA (cadeado desenhado)
// Mesmo tamanho/formato do BotaoPlay, mas em cinza com um cadeado.
import React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function BotaoCadeado({ size = 45, corFundo = '#9AA6B0' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* círculo cinza com borda (indica bloqueado) */}
      <Circle cx="50" cy="50" r="45" fill={corFundo} stroke="#5B6670" strokeWidth="3" />
      {/* arco (haste) do cadeado */}
      <Path d="M38 48 V41 a12 12 0 0 1 24 0 V48" fill="none" stroke="#3E464E" strokeWidth="6" strokeLinecap="round" />
      {/* corpo do cadeado */}
      <Rect x="33" y="47" width="34" height="27" rx="6" fill="#EDF1F4" stroke="#3E464E" strokeWidth="3" />
      {/* buraco da chave */}
      <Circle cx="50" cy="58" r="4" fill="#3E464E" />
      <Rect x="48" y="58" width="4" height="9" rx="2" fill="#3E464E" />
    </Svg>
  );
}
