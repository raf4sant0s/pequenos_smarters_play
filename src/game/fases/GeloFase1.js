import React from 'react';
import JogoMemoria from '../JogoMemoria';
import { memoriaSilabas } from '../../data/gelo';

export default function GeloFase1({ navigation }) {
  return (
    <JogoMemoria
      pares={memoriaSilabas}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'gelo', fase: 'fase1',
          proximaFase: 'GeloFase2', mensagem: 'Você achou todos os pares!',
        })
      }
    />
  );
}