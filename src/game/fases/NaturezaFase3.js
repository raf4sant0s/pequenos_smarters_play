import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { penhascoConsoantes } from '../../data/natureza';

export default function NaturezaFase3({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="CLIQUE NA CONSOANTE"
      rodadas={penhascoConsoantes}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha da Natureza!',
        })
      }
    />
  );
}