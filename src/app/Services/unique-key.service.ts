import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueKeyService {
  private readonly alphabetStart = 97; // Código ASCII de 'a'
  private readonly alphabetEnd = 122; // Código ASCII de 'z'
  private readonly alphabetSize = 26;

  // Função para cifrar usando One-Time Pad com manipulação de letras minúsculas
  encrypt(plainText: string, key: string): string {
    let encryptedText = '';
    const extendedKey = this.extendKey(plainText, key);

    console.log(`Texto plano: ${plainText}`);
    console.log(`Chave estendida: ${extendedKey}`);

    for (let i = 0; i < plainText.length; i++) {
      const plainChar = plainText[i];
      const keyChar = extendedKey[i];

      if (this.isLowerCaseLetter(plainChar)) {
        const encryptedChar = this.encryptChar(plainChar, keyChar);
        encryptedText += encryptedChar;

        console.log(
          `Cifrando: '${plainChar}' usando '${keyChar}' -> '${encryptedChar}'`
        );
      } else {
        encryptedText += plainChar; // Não altera outros caracteres
        console.log(`Caracter não alterado: '${plainChar}'`);
      }
    }

    console.log(`Texto cifrado: ${encryptedText}`);
    return encryptedText;
  }

  // Função para descriptografar
  decrypt(encryptedText: string, key: string): string {
    let decryptedText = '';
    const extendedKey = this.extendKey(encryptedText, key);

    console.log(`Texto cifrado: ${encryptedText}`);
    console.log(`Chave estendida: ${extendedKey}`);

    for (let i = 0; i < encryptedText.length; i++) {
      const encryptedChar = encryptedText[i];
      const keyChar = extendedKey[i];

      if (this.isLowerCaseLetter(encryptedChar)) {
        const decryptedChar = this.decryptChar(encryptedChar, keyChar);
        decryptedText += decryptedChar;

        console.log(
          `Descriptografando: '${encryptedChar}' usando '${keyChar}' -> '${decryptedChar}'`
        );
      } else {
        decryptedText += encryptedChar;
        console.log(`Caracter não alterado: '${encryptedChar}'`);
      }
    }

    console.log(`Texto descriptografado: ${decryptedText}`);
    return decryptedText;
  }

  // Função para estender a chave até o tamanho do texto
  private extendKey(text: string, key: string): string {
    let extendedKey = key;
    while (extendedKey.length < text.length) {
      extendedKey += key;
    }
    return extendedKey.slice(0, text.length);
  }

  // Função para verificar se um caractere é uma letra minúscula
  private isLowerCaseLetter(char: string): boolean {
    const charCode = char.charCodeAt(0);
    return charCode >= this.alphabetStart && charCode <= this.alphabetEnd;
  }

  // Função para criptografar uma letra usando XOR
  private encryptChar(plainChar: string, keyChar: string): string {
    const plainCharCode = plainChar.charCodeAt(0);
    const keyCharCode = keyChar.charCodeAt(0);
    const encryptedCharCode = plainCharCode ^ keyCharCode; // XOR entre os códigos
    return String.fromCharCode(encryptedCharCode);
  }

  // Função para descriptografar uma letra usando XOR
  private decryptChar(encryptedChar: string, keyChar: string): string {
    const encryptedCharCode = encryptedChar.charCodeAt(0);
    const keyCharCode = keyChar.charCodeAt(0);
    const decryptedCharCode = encryptedCharCode ^ keyCharCode; // XOR entre os códigos
    return String.fromCharCode(decryptedCharCode);
  }
}
