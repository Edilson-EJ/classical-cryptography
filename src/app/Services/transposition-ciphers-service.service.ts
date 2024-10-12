import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranspositionCiphersServiceService {
  // Função para cifrar o texto
  encrypt(text: string, numColumns: number): string {
    // Remover espaços do texto original
    text = text.replace(/\s+/g, '');

    // Calcular o número de linhas
    const numRows = Math.ceil(text.length / numColumns);
    const matrix: string[][] = [];

    // Preencher a matriz com o texto original em linhas
    for (let i = 0; i < numRows; i++) {
      matrix[i] = text.slice(i * numColumns, (i + 1) * numColumns).split('');
    }

    let result = '';

    // Ler a matriz em colunas
    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        // Verificar se a posição é válida antes de adicionar ao resultado
        if (matrix[row] && matrix[row][col]) {
          result += matrix[row][col];
        }
      }
    }

    return result;
  }

  // Função para descriptografar o texto
  decrypt(text: string, numColumns: number): string {
    const numRows = Math.ceil(text.length / numColumns);
    const numExtraChars = numColumns * numRows - text.length;

    const matrix: string[][] = [];

    let index = 0;

    // Preencher a matriz com o texto cifrado em colunas
    for (let col = 0; col < numColumns; col++) {
      matrix[col] = [];
      for (let row = 0; row < numRows; row++) {
        // Preencher a matriz considerando caracteres extras
        if (row === numRows - 1 && col >= numColumns - numExtraChars) {
          matrix[col][row] = ''; // Última linha pode ter caracteres em branco
        } else {
          matrix[col][row] = text[index++] || ''; // Use string vazia se index for fora dos limites
        }
      }
    }

    let result = '';

    // Ler a matriz em linhas para obter o texto original
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        // Verificar se a posição é válida antes de adicionar ao resultado
        if (matrix[col] && matrix[col][row]) {
          result += matrix[col][row];
        }
      }
    }

    return result;
  }
}
