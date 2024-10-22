import { inject, Injectable } from '@angular/core';
import { AscIIService } from './asc-ii.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueKeyService {
  private ascii = inject(AscIIService);

  encrypt(plainText: string, key: string): string {
    let encryptedText = '';
    const extendedKey = this.extendKey(plainText, key);

    for (let i = 0; i < plainText.length; i++) {
      const plainChar = plainText[i];
      const keyChar = extendedKey[i];
      const encryptedChar = this.encryptChar(plainChar, keyChar);
      encryptedText += encryptedChar;
    }

    return encryptedText;
  }

  decrypt(encryptedText: string, key: string): string {
    let decryptedText = '';
    const extendedKey = this.extendKey(encryptedText, key);

    for (let i = 0; i < encryptedText.length; i++) {
      const encryptedChar = encryptedText[i];
      const keyChar = extendedKey[i];
      const decryptedChar = this.decryptChar(encryptedChar, keyChar);
      decryptedText += decryptedChar;
    }

    return decryptedText;
  }

  private extendKey(text: string, key: string): string {
    let extendedKey = key;
    while (extendedKey.length < text.length) {
      extendedKey += key;
    }
    return extendedKey.slice(0, text.length);
  }

  private encryptChar(plainChar: string, keyChar: string): string {
    const plainBinary = this.ascii.getBinaryForLetter(plainChar);
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    if (!plainBinary || !keyBinary) {
      console.error(`Caractere não encontrado: '${plainChar}' ou '${keyChar}'`);
      return ''; // Retorna uma string vazia se não encontrar
    }

    const encryptedBinary = this.xorBinary(plainBinary, keyBinary);
    return this.getPrintableChar(encryptedBinary);
  }

  private decryptChar(encryptedChar: string, keyChar: string): string {
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);
    const encryptedBinary = encryptedChar
      .charCodeAt(0)
      .toString(2)
      .padStart(8, '0');

    if (!keyBinary) {
      console.error(`Caractere não encontrado: '${keyChar}'`);
      return ''; // Retorna uma string vazia se não encontrar
    }

    const decryptedBinary = this.xorBinary(encryptedBinary, keyBinary);
    return this.getPrintableChar(decryptedBinary);
  }

  private xorBinary(binary1: string, binary2: string): string {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += binary1[i] === binary2[i] ? '0' : '1';
    }
    return result;
  }

  private getPrintableChar(binary: string): string {
    const charCode = parseInt(binary, 2);
    // Verifica se o código do caractere está no mapeamento
    for (const [letter, binaryValue] of Object.entries(
      this.ascii.alphabetBinaryMap
    )) {
      if (binaryValue === binary) {
        return letter; // Retorna a letra correspondente
      }
    }
    // Se não encontrou, tenta retornar a letra pelo código
    if (charCode >= 32 && charCode <= 126) {
      return String.fromCharCode(charCode); // Retorna o caractere imprimível
    }
    return ''; // Retorna uma string vazia se não for imprimível
  }
}
