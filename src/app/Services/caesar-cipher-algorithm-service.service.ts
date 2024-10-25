import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaesarCipherAlgorithmServiceService {
  private alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor() {}

  // Método para criptografar o texto
  encrypt(text: string, key: number): string {
    console.log(`Texto original: ${text}`);
    console.log(`Chave: ${key}`);

    const encryptedText = text
      .toUpperCase()
      .replace(/\s+/g, '')
      .split('') // Divide o texto em um array de caracteres
      .map((char) => {
        console.log('char - Critografar', char);
        const index = this.alphabet.indexOf(char);
        // Log do caractere e índice
        console.log(`Caractere atual: ${char} | Índice no alfabeto: ${index}`);

        if (index === -1) {
          console.log(`Caractere ignorado (não é uma letra): ${char}`);
          return char;
        }

        // Calcula o novo índice aplicando a cifra de César
        const newIndex = (index + key) % this.alphabet.length;
        // Obtém o caractere criptografado usando o novo índice
        const encryptedChar = this.alphabet[newIndex];
        console.log(
          `Novo índice: ${newIndex} | Caractere criptografado: ${encryptedChar}`
        );

        return encryptedChar;
      })
      .join('');

    console.log(`Texto criptografado: ${encryptedText}`);
    return encryptedText;
  }

  // Método para descriptografar o texto
  decrypt(text: string, key: number): string {
    console.log(`Texto criptografado: ${text}`);
    console.log(`Chave para descriptografar: ${key}`);

    const decryptedText = text
      .toUpperCase()
      .replace(/\s+/g, '')
      .split('') // Divide o texto em um array de caracteres
      .map((char) => {
        console.log('char - Descriptografar', char);
        // Para cada caractere, encontra o índice no alfabeto
        const index = this.alphabet.indexOf(char);
        console.log(`Caractere atual: ${char} | Índice no alfabeto: ${index}`);

        if (index === -1) {
          console.log(`Caractere ignorado (não é uma letra): ${char}`);
          return char;
        }

        // Calcula o novo índice aplicando o deslocamento para trás
        const newIndex =
          (index - key + this.alphabet.length) % this.alphabet.length;
        // Obtém o caractere descriptografado usando o novo índice
        const decryptedChar = this.alphabet[newIndex];
        console.log(
          `Novo índice: ${newIndex} | Caractere descriptografado: ${decryptedChar}`
        );

        return decryptedChar;
      })
      .join('');

    console.log(`Texto descriptografado: ${decryptedText}`);
    return decryptedText;
  }
}
