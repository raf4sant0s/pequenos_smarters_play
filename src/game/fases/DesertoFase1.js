// Fase 1 — Desafios dos Espinhos (Trilha pelos Espinhos)
// O Ziggy atravessa o deserto pisando só no grupo certo (vogais/consoantes),
// enquanto o Doutor Preguiça o desafia.
import React from 'react';
import TrilhaEspinhos from '../TrilhaEspinhos';
import { espinhos } from '../../data/deserto';

export default function DesertoFase1({ navigation }) {
  return (
    <TrilhaEspinhos
      ilha="Deserto"
      rodadas={espinhos()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'deserto', fase: 'fase1',
          faseAtual: 'DesertoFase1', proximaFase: 'Deserto',
          personagem: 'ziggy', cenario: 'deserto',
          mensagem: 'Você atravessou os espinhos do Dr. Preguiça!',
        })
      }
    />
  );
}
