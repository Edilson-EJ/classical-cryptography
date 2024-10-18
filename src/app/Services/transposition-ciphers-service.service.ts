import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranspositionCiphersServiceService {
  // Função para criar o objeto com letras e suas posições
  generateAlphabetPosition(): { [key: string]: number } {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetPosition: { [key: string]: number } = {};

    // Preencher o objeto com a posição das letras
    for (let i = 0; i < alphabet.length; i++) {
      alphabetPosition[alphabet[i]] = i + 1; // Posições de 1 a 26
    }

    return alphabetPosition;
  }

  // Função para cifrar o texto
  encrypt(text: string, numColumns: number, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetPosition = this.generateAlphabetPosition();

    // Remover espaços do texto original
    text = text.replace(/\s+/g, '');

    // Calcular o número de linhas
    const numRows = Math.ceil(text.length / numColumns);
    const matrix: string[][] = [];

    // Preencher a matriz com o texto original em linhas
    for (let i = 0; i < numRows; i++) {
      matrix[i] = text.slice(i * numColumns, (i + 1) * numColumns).split('');
    }

    // Imprimir a matriz antes da criptografia
    console.log('Matriz antes da criptografia:');
    console.table(matrix);

    // Ordenar as colunas com base nas posições das letras da chave no alfabeto
    const sortedKey = key
      .split('')
      .map((char, index) => ({
        char,
        index,
        position: alphabetPosition[char],
      }))
      .sort((a, b) => a.position - b.position);

    // Imprimir a chave antes da ordenação
    console.log('Chave original:', key);

    console.log('Chave e posições antes da ordenação:');

    console.table(
      key.split('').map((char) => ({
        char,
        position: alphabetPosition[char],
      }))
    );

    let result = '';

    // Ler a matriz pelas colunas na nova ordem
    for (const { index } of sortedKey) {
      for (let row = 0; row < numRows; row++) {
        if (matrix[row][index]) {
          result += matrix[row][index];
        }
      }
    }

    // Imprimir a chave ordenada
    console.log('Chave e posições após a ordenação:');
    console.table(sortedKey);

    // Imprimir a matriz após a criptografia
    console.log('Texto cifrado:', result);

    return result;
  }

  // Função para descriptografar o texto
  decrypt(text: string, numColumns: number, key: string): string {
    const numRows = Math.ceil(text.length / numColumns);
    const numExtraChars = numColumns * numRows - text.length;

    const matrix: string[][] = [];
    const alphabetPosition = this.generateAlphabetPosition();

    // Ordenar as colunas de acordo com a chave
    const sortedKey = key
      .split('')
      .map((char, index) => ({
        char,
        index,
        position: alphabetPosition[char],
      }))
      .sort((a, b) => a.position - b.position);

    let index = 0;

    // Preencher a matriz com o texto cifrado em colunas seguindo a ordem da chave
    for (let { index: originalIndex } of sortedKey) {
      matrix[originalIndex] = [];
      for (let row = 0; row < numRows; row++) {
        if (
          row === numRows - 1 &&
          originalIndex >= numColumns - numExtraChars
        ) {
          matrix[originalIndex][row] = ''; // Última linha pode ter caracteres em branco
        } else {
          matrix[originalIndex][row] = text[index++] || ''; // Preencher a matriz
        }
      }
    }

    // Imprimir a matriz antes da descriptografia
    console.table(matrix);

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

    // Imprimir o texto descriptografado
    console.log('Texto descriptografado:', result);

    return result;
  }
}
