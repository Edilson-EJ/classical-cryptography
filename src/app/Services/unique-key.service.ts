import { inject, Injectable } from '@angular/core';
import { AscIIService } from './asc-ii.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueKeyService {
  private ascii = inject(AscIIService);
  resultXOR: string = ''; // String para armazenar o binário XOR completo

  encrypt(text: string, key: string): string {
    // Remove espaços do texto antes de continuar
    console.log('texto recebido', text);
    const textWithoutSpaces = text.replace(/\s/g, '');
    console.log(`Texto sem espaços: ${textWithoutSpaces}`);

    const extendedKey = this.extendKey(textWithoutSpaces, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let encryptedText = '';

    this.resultXOR = ''; // Limpa o XOR

    for (let i = 0; i < textWithoutSpaces.length; i++) {
      const plainChar = textWithoutSpaces[i];
      const keyChar = extendedKey[i];
      const encryptedBinary = this.encryptChar(plainChar, keyChar);
      this.resultXOR += encryptedBinary;
    }

    console.log(`Resultado completo do XOR: ${this.resultXOR}`);
    return this.resultXOR;
  }

  decrypt(encryptedText: string, key: string): string {
    console.log(`Texto criptografado: ${encryptedText}`);
    const extendedKey = this.extendKey(encryptedText, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let decryptedText = '';

    // Dividir o texto criptografado em blocos de 8 bits
    const encryptedBlocks = encryptedText.match(/.{1,8}/g); // Divide em blocos de 8 bits

    if (!encryptedBlocks) {
      console.error(
        'Erro: Não foi possível dividir o texto criptografado em blocos de 8 bits.'
      );
      return ''; // Retorna uma string vazia se a divisão falhar
    }

    // Itera sobre cada bloco de 8 bits
    for (let i = 0; i < encryptedBlocks.length; i++) {
      const encryptedBinary = encryptedBlocks[i]; // Obtém o bloco de 8 bits
      const keyChar = extendedKey[i]; // Obtém o caractere da chave correspondente

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

    if (!plainBinary || !keyBinary) {
      console.error(`Caractere não encontrado: '${plainChar}' ou '${keyChar}'`);
      return '';
    }

    return this.xorBinary(plainBinary, keyBinary);
  }

  private decryptChar(encryptedBinary: string, keyChar: string): string {
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    if (!encryptedBinary || !keyBinary) {
      console.error(
        `Caractere não encontrado: '${encryptedBinary}' ou '${keyChar}'`
      );
      return '';
    }

    const decryptedBinary = this.xorBinary(encryptedBinary, keyBinary);
    return this.ascii.getLetterFromBinary(decryptedBinary); // Converte binário de volta para caractere
  }

  private xorBinary(binary1: string, binary2: string): string {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += binary1[i] === binary2[i] ? '0' : '1';
    }
    return result;
  }
}
