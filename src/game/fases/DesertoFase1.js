import React from 'react';
import EncontrarAlvos from '../EncontrarAlvos';
import { espinhos } from '../../data/deserto';

export default function DesertoFase1({ navigation }) {
  return (
    <EncontrarAlvos
      instrucao="Toque nas CONSOANTES!"
      rodadas={espinhos()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'deserto', fase: 'fase1',
          proximaFase: 'DesertoFase2', mensagem: 'Você achou as consoantes!',
        })
      }
    />
  );
}