// Fase 3 — Campo das letras (Lina): com qual letra começa (objeto + cartas azuis)
import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { campoDasLetras } from '../../data/natureza';

export default function NaturezaFase3({ navigation }) {
  return (
    <SelecaoUnica
      ilha="Natureza"
      fundo="campo"
      personagem="lina"
      som="azul"
      corCartas="azul"
      banner="comeca"
      rodadas={campoDasLetras()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase3',
          faseAtual: 'NaturezaFase3', proximaFase: 'Natureza',
          personagem: 'lina', mensagem: 'Você concluiu a Ilha da Natureza!',
        })
      }
    />
  );
}
