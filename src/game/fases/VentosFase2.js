import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { ventosSabedoria } from '../../data/ventos';

export default function VentosFase2({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Complete com a sílaba certa"
      rodadas={ventosSabedoria}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'ventos', fase: 'fase2',
          proximaFase: 'VentosFase3', mensagem: 'Você completou as palavras!',
        })
      }
    />
  );
}