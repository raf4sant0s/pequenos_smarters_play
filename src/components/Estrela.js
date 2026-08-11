// src/components/Estrela.js — estrela dourada 3D (degradê + contorno), desenhada em SVG.
// cheia = dourada; senão = cinza (vazia). Tamanho por prop.
import React, { useRef } from 'react';
import Svg, { Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

let contador = 0;
const PONTOS = '50,6 61,35 92,36 67,56 76,86 50,68 24,86 33,56 8,36 39,35';

// paradas do degradê (sem usar fragmento <>, que o react-native-svg ignora)
const CHEIA = [
  { off: '0', cor: '#ffee00ff' },
  { off: '0.5', cor: '#ffdc19ff' },
  { off: '1', cor: '#fbba4aff' },
];
const VAZIA = [
  { off: '0', cor: '#008cffff' },
  { off: '1', cor: '#C2CDD6' },
];

export default function Estrela({ size = 30, cheia = true }) {
  const gid = useRef(`estrela_grad_${contador++}`).current;
  const stops = cheia ? CHEIA : VAZIA;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          {stops.map((s) => (
            <Stop key={s.off} offset={s.off} stopColor={s.cor} />
          ))}
        </LinearGradient>
      </Defs>
      <Polygon
        points={PONTOS}
        fill={`url(#${gid})`}
        stroke={cheia ? '#fff458ff' : '#ffffffff'}
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
