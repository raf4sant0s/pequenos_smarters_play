import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { seca } from '../../data/deserto';

export default function DesertoFase2({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Complete a palavra"
      rodadas={seca}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'deserto', fase: 'fase2',
          proximaFase: 'DesertoFase3', mensagem: 'Você completou as palavras!',
        })
      }
    />
  );
}