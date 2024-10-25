import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AscIIService {
  // Mapeamento de letras do alfabeto para suas representações binárias
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

  // Método para obter a representação binária de uma letra
  getBinaryForLetter(letter: string): string {
    return this.alphabetBinaryMap[letter] || '';
  }

  // Método para converter uma string em sua representação binária
  getBinaryForString(input: string): string {
    return input
      .split('')
      .map((char) => this.getBinaryForLetter(char)) // Mapeia cada caractere para sua representação binária
      .filter((binary) => binary !== '') // Remove quaisquer caracteres que não têm representação binária
      .join(' ');
  }

  // Método para converter uma string binária de volta para letras
  getLetterFromBinary(binaryString: string): string {
    // Divide a string binária em um array
    const binaryArray = binaryString.split(' ');
    return binaryArray
      .map((binary) => {
        // Encontra a letra correspondente ao valor binário
        const letter = Object.keys(this.alphabetBinaryMap).find(
          (key) => this.alphabetBinaryMap[key] === binary
        );
        return letter || '';
      })
      .join(''); // Junta as letras em uma única string
  }
}
