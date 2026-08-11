import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { arvorePensamentos } from '../../data/ventos';

export default function VentosFase1({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Toque na imagem certa"
      rodadas={arvorePensamentos}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'ventos', fase: 'fase1',
          proximaFase: 'VentosFase2', mensagem: 'Você ligou as palavras às imagens!',
        })
      }
    />
  );
}