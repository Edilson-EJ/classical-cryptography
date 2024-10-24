import { inject, Injectable } from '@angular/core';
import { AscIIService } from './asc-ii.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueKeyService {
  private ascii = inject(AscIIService);
  resultXOR: string[] = []; // Array para armazenar os resultados do XOR

  encrypt(text: string, key: string): string {
    console.log(`Texto sem espaços: ${text}`);
    const extendedKey = this.extendKey(text, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let encryptedText = '';

    // Limpa o resultado do XOR antes de cada nova operação
    this.resultXOR = [];

    for (let i = 0; i < text.length; i++) {
      const plainChar = text[i];
      const keyChar = extendedKey[i];
      const encryptedChar = this.encryptChar(plainChar, keyChar);
      encryptedText += encryptedChar;
    }

    console.log(`Resultado do XOR de cada letra: ${this.resultXOR.join(', ')}`);
    return encryptedText; // Retorna o texto criptografado
  }

  decrypt(encryptedText: string, key: string): string {
    console.log(`Texto criptografado: ${encryptedText}`);
    const extendedKey = this.extendKey(encryptedText, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let decryptedText = '';

    // Itera sobre o texto criptografado em blocos de 8 bits
    for (let i = 0; i < encryptedText.length; i += 8) {
      const encryptedBinary = encryptedText.substring(i, i + 8); // Obtém o bloco de 8 bits
      const keyChar = extendedKey.charAt(i / 8); // Obtém o caractere da chave correspondente

      const decryptedChar = this.decryptChar(encryptedBinary, keyChar);
      decryptedText += decryptedChar;
    }

    console.log(`Texto descriptografado final: ${decryptedText}`);
    return decryptedText;
  }

  private extendKey(text: string, key: string): string {
    return key
      .repeat(Math.ceil(text.length / key.length))
      .slice(0, text.length);
  }

  private encryptChar(plainChar: string, keyChar: string): string {
    const plainBinary = this.ascii.getBinaryForLetter(plainChar);
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    console.log(`${plainChar} - ${plainBinary}`);
    console.log(`${keyChar} - ${keyBinary}`);

    if (!plainBinary || !keyBinary) {
      console.error(`Caractere não encontrado: '${plainChar}' ou '${keyChar}'`);
      return ''; // Retorna uma string vazia se não encontrar
    }

    const encryptedBinary = this.xorBinary(plainBinary, keyBinary);
    console.log(`Resultado do XOR: ${encryptedBinary}`);

    // Armazena o resultado do XOR no array resultXOR
    this.resultXOR.push(encryptedBinary);

    const encryptedChar = this.getPrintableChar(encryptedBinary);
    console.log(`${plainChar} -> ${encryptedBinary} -> ${encryptedChar}`);

    return encryptedChar;
  }

  private decryptChar(encryptedBinary: string, keyChar: string): string {
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    console.log(`${encryptedBinary} (criptografado) - ${encryptedBinary}`);
    console.log(`${keyChar} (chave) - ${keyBinary}`);

    if (!encryptedBinary || !keyBinary) {
      console.error(
        `Caractere não encontrado: '${encryptedBinary}' ou '${keyChar}'`
      );
      return ''; // Retorna uma string vazia se não encontrar
    }

    const decryptedBinary = this.xorBinary(encryptedBinary, keyBinary);
    console.log(`Resultado do XOR reverso: ${decryptedBinary}`);

    const decryptedChar = this.getPrintableChar(decryptedBinary);
    console.log(`${encryptedBinary} -> ${decryptedBinary} -> ${decryptedChar}`);

    return decryptedChar;
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
    if (charCode >= 32 && charCode <= 126) {
      // Intervalo de ASCII imprimível
      return String.fromCharCode(charCode); // Retorna o caractere imprimível
    }
    return '?'; // Retorna '?' para binários não imprimíveis
  }
}
