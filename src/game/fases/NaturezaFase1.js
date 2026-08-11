// Fase 1 — Floresta das Vogais (Ziggy + Doutor Preguiça)
import React from 'react';
import EncontrarAlvos from '../EncontrarAlvos';
import { florestaDasVogais } from '../../data/natureza';

export default function NaturezaFase1({ navigation }) {
  return (
    <EncontrarAlvos
      ilha="Natureza"
      instrucao="ENCONTRE AS VOGAIS QUE O DOUTOR PREGUIÇA ESCONDEU NA FLORESTA"
      rodadas={florestaDasVogais()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase1',
          faseAtual: 'NaturezaFase1', proximaFase: 'NaturezaFase2',
          personagem: 'ziggy', cenario: 'floresta', mensagem: 'Você achou todas as vogais!',
        })
      }
    />
  );
}
