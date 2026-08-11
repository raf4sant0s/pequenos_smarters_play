import React from 'react';
import OrdenarSequencia from '../OrdenarSequencia';
import { arrastandoGelo } from '../../data/gelo';

export default function GeloFase3({ navigation }) {
  return (
    <OrdenarSequencia
      instrucao="Monte a palavra com as sílabas!"
      rodadas={arrastandoGelo}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'gelo', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha do Gelo!',
        })
      }
    />
  );
}