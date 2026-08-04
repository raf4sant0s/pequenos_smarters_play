// Fase 2 — Lago das letras (Pipo): clique na vogal (cartas laranja)
import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { lagoDasLetras } from '../../data/natureza';

export default function NaturezaFase2({ navigation }) {
  return (
    <SelecaoUnica
      ilha="Natureza"
      fundo="lago"
      personagem="pipo"
      som="laranja"
      corCartas="laranja"
      rodadas={lagoDasLetras()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase2',
          faseAtual: 'NaturezaFase2', proximaFase: 'NaturezaFase3',
          personagem: 'pipo', mensagem: 'Você encontrou todas as vogais!',
        })
      }
    />
  );
}
