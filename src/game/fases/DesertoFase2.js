// Fase 2 — Seca / "Chuva na Seca"
// A criança coleta as imagens que começam com o som pedido pra fazer chover.
import React from 'react';
import ChuvaNaSeca from '../ChuvaNaSeca';
import { chuvaNaSeca } from '../../data/deserto';

export default function DesertoFase2({ navigation }) {
  return (
    <ChuvaNaSeca
      ilha="Deserto"
      rodadas={chuvaNaSeca()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'deserto', fase: 'fase2',
          faseAtual: 'DesertoFase2', proximaFase: 'Deserto',
          personagem: 'pipo', cenario: 'seca',
          mensagem: 'Você trouxe a chuva de volta!',
        })
      }
    />
  );
}
