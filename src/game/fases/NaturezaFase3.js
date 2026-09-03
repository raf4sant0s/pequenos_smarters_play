// Fase 3 — Campo das letras (Lina): com qual letra começa
// Layout/estilos ficam em CampoLetras.js (separado do Lago).
import React from 'react';
import CampoLetras from '../CampoLetras';
import { campoDasLetras } from '../../data/natureza';

export default function NaturezaFase3({ navigation }) {
  return (
    <CampoLetras
      ilha="Natureza"
      rodadas={campoDasLetras()}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'natureza', fase: 'fase3',
          faseAtual: 'NaturezaFase3', proximaFase: 'Deserto',
          personagem: 'lina', cenario: 'campo', mensagem: 'Você concluiu a Ilha da Natureza!',
        })
      }
    />
  );
}
