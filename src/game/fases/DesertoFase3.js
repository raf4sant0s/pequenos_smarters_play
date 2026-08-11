import React from 'react';
import OrdenarSequencia from '../OrdenarSequencia';
import { penhascoDeserto } from '../../data/deserto';

export default function DesertoFase3({ navigation }) {
  return (
    <OrdenarSequencia
      instrucao="Toque as letras na ordem certa!"
      rodadas={penhascoDeserto}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'deserto', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha do Deserto!',
        })
      }
    />
  );
}