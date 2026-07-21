import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { lagoDasLetras } from '../../data/natureza';

export default function NaturezaFase2({ navigation }) {
  return (
    <SelecaoUnica
      ilha="Natureza"
      instrucao="CLIQUE NA VOGAL"
      rodadas={lagoDasLetras}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase2', faseAtual: 'NaturezaFase2',
          proximaFase: 'NaturezaFase3', mensagem: 'Você separou as vogais!',
        })
      }
    />
  );
}