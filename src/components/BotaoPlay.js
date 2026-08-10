// src/components/BotaoPlay.js — botão de play desenhado (triângulo de pontas arredondadas)
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function BotaoPlay({ size = 82, corFundo = '#2db6f1ff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* círculo (cor de fundo configurável) com borda */}
      <Circle cx="50" cy="50" r="45" fill={corFundo} stroke="#016988" strokeWidth="3" />
      {/* triângulo: camada escura atrás = contorno fino | laranja na frente */}
      <Path d="M43 34 L69 50 L43 66 Z" fill="#B5530C" stroke="#B5530C" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M43 34 L69 50 L43 66 Z" fill="#F5821F" stroke="#F5821F" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
