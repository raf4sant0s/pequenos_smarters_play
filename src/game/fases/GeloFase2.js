import React from 'react';
import SelecaoUnica from '../SelecaoUnica';
import { geleira } from '../../data/gelo';

export default function GeloFase2({ navigation }) {
  return (
    <SelecaoUnica
      instrucao="Qual sílaba você ouve?"
      rodadas={geleira}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'gelo', fase: 'fase2',
          proximaFase: 'GeloFase3', mensagem: 'Você reconheceu as sílabas!',
        })
      }
    />
  );
}