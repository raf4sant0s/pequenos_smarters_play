import React from 'react';
import OrdenarSequencia from '../OrdenarSequencia';
import { ventania } from '../../data/ventos';

export default function VentosFase3({ navigation }) {
  return (
    <OrdenarSequencia
      instrucao="Monte a frase na ordem certa!"
      rodadas={ventania}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'ventos', fase: 'fase3',
          proximaFase: 'Map', mensagem: 'Você concluiu a Ilha dos Ventos!',
        })
      }
    />
  );
}