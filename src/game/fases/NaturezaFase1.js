import React from 'react';
import EncontrarAlvos from '../EncontrarAlvos';
import { florestaDasVogais } from '../../data/natureza';

export default function NaturezaFase1({ navigation }) {
  return (
    <EncontrarAlvos
      ilha="Natureza"
      instrucao="Encontre as VOGAIS na floresta!"
      rodadas={florestaDasVogais()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase1',
          proximaFase: 'NaturezaFase2', mensagem: 'Você achou todas as vogais!',
        })
      }
    />
  );
}