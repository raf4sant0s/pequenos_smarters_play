import React from 'react';
import OrdenarSequencia from '../OrdenarSequencia';
import { chaoLava } from '../../data/fogo';

export default function FogoFase3({ navigation }) {
  return (
    <OrdenarSequencia
      instrucao="Monte a frase!"
      rodadas={chaoLava}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'fogo', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha do Fogo!',
        })
      }
    />
  );
}