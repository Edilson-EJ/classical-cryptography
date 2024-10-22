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
    A: '01000001',
    B: '01000010',
    C: '01000011',
    D: '01000100',
    E: '01000101',
    F: '01000110',
    G: '01000111',
    H: '01001000',
    I: '01001001',
    J: '01001010',
    K: '01001011',
    L: '01001100',
    M: '01001101',
    N: '01001110',
    O: '01001111',
    P: '01010000',
    Q: '01010001',
    R: '01010010',
    S: '01010011',
    T: '01010100',
    U: '01010101',
    V: '01010110',
    W: '01010111',
    X: '01011000',
    Y: '01011001',
    Z: '01011010',
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
