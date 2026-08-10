// Fase 2 — Lago das letras (Pipo): clique na consoante
// Layout/estilos ficam em LagoLetras.js (separado do Campo).
import React from 'react';
import LagoLetras from '../LagoLetras';
import { lagoDasLetras } from '../../data/natureza';

export default function NaturezaFase2({ navigation }) {
  return (
    <LagoLetras
      ilha="Natureza"
      rodadas={lagoDasLetras()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase2',
          faseAtual: 'NaturezaFase2', proximaFase: 'NaturezaFase3',
          personagem: 'pipo', cenario: 'lago', mensagem: 'Você encontrou as consoantes!',
        })
      }
    />
  );
}
