import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { piscina } from '../../data/fogo';

export default function FogoFase2({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Complete a frase"
      rodadas={piscina}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'fogo', fase: 'fase2',
          proximaFase: 'FogoFase3', mensagem: 'Você completou as frases!',
        })
      }
    />
  );
}