import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AscIIService {
  readonly alphabetBinaryMap: { [key: string]: string } = {
    a: '01100001',
    b: '01100010',
    c: '01100011',
    d: '01100100',
    e: '01100101',
    f: '01100110',
    g: '01100111',
    h: '01101000',
    i: '01101001',
    j: '01101010',
    k: '01101011',
    l: '01101100',
    m: '01101101',
    n: '01101110',
    o: '01101111',
    p: '01110000',
    q: '01110001',
    r: '01110010',
    s: '01110011',
    t: '01110100',
    u: '01110101',
    v: '01110110',
    w: '01110111',
    x: '01111000',
    y: '01111001',
    z: '01111010',
  };

  getBinaryForLetter(letter: string): string {
    return this.alphabetBinaryMap[letter] || ''; // Retorna vazio se não encontrado
  }

  // Método para converter uma string em binário apenas com letras
  getBinaryForString(input: string): string {
    return input
      .split('')
      .map((char) => this.getBinaryForLetter(char))
      .filter((binary) => binary !== '') // Remove caracteres não mapeados
      .join(' '); // Junta os resultados em uma única string
  }

  // Método para converter binário de volta para letras
  getLetterFromBinary(binaryString: string): string {
    const binaryArray = binaryString.split(' '); // Divide a string em um array
    return binaryArray
      .map((binary) => {
        const letter = Object.keys(this.alphabetBinaryMap).find(
          (key) => this.alphabetBinaryMap[key] === binary
        );
        return letter || ''; // Retorna a letra correspondente ou vazio se não encontrado
      })
      .join(''); // Junta as letras em uma única string
  }
}
