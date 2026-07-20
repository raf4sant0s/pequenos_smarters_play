import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { vulcao } from '../../data/fogo';

export default function FogoFase1({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Toque na imagem que mostra a frase"
      rodadas={vulcao}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'fogo', fase: 'fase1',
          proximaFase: 'FogoFase2', mensagem: 'Você entendeu as frases!',
        })
      }
    />
  );
}