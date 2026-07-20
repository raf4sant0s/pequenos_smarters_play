// src/utils/estrelas.js — regra de estrelas (igual nos dois documentos)
export function calcularEstrelas(erros) {
    if (erros <= 1) return 3;      // 0 ou 1 erro
    if (erros <= 3) return 2;      // 2 ou 3 erros
    return 1;                       // 4 ou mais
}
