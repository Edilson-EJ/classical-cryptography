import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaesarCipherAlgorithmServiceService {
  private alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor() {}

  // Método para criptografar o texto
  encrypt(text: string, shift: number): string {
    // Remover espaços do texto original
    return text
      .toUpperCase()
      .replace(/\s+/g, '') // Remover todos os espaços
      .split('')
      .map((char) => {
        const index = this.alphabet.indexOf(char);
        if (index === -1) {
          return char; // Ignorar caracteres que não são letras
        }
        return this.alphabet[(index + shift) % this.alphabet.length];
      })
      .join(''); // Retornar o texto sem espaços
  }

  // Método para descriptografar o texto
  decrypt(text: string, shift: number): string {
    // Remover espaços do texto original
    return text
      .toUpperCase()
      .replace(/\s+/g, '') // Remover todos os espaços
      .split('')
      .map((char) => {
        const index = this.alphabet.indexOf(char);
        if (index === -1) {
          return char; // Ignorar caracteres que não são letras
        }
        return this.alphabet[
          (index - shift + this.alphabet.length) % this.alphabet.length
        ];
      })
      .join(''); // Retornar o texto sem espaços
  }
}
