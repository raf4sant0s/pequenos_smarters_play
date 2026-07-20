import React from 'react';
import DigitarPalavra from '../DigitarPalavra';
import { secreto } from '../../data/lagos';

export default function LagosFase3({ navigation }) {
  return (
    <DigitarPalavra
      rodadas={secreto}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'lagos', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha dos Lagos!',
        })
      }
    />
  );
}