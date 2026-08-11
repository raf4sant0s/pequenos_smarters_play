import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { aguaMagica } from '../../data/lagos';

export default function LagosFase1({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Toque na imagem que mostra a frase"
      rodadas={aguaMagica}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'lagos', fase: 'fase1',
          proximaFase: 'LagosFase2', mensagem: 'Você entendeu as frases!',
        })
      }
    />
  );
}