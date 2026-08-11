import React from 'react';
import LigarColunas from '../LigarColunas';
import { descobrindo } from '../../data/lagos';

export default function LagosFase2({ navigation }) {
  return (
    <LigarColunas
      rodadas={descobrindo}
      onConcluir={(estrelas, erros) =>
        navigation.replace('Result', {
          estrelas, erros, ilha: 'lagos', fase: 'fase2',
          proximaFase: 'LagosFase3', mensagem: 'Você ligou tudo certinho!',
        })
      }
    />
  );
}