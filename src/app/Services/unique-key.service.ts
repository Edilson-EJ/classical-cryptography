import { inject, Injectable } from '@angular/core';
import { AscIIService } from './asc-ii.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueKeyService {
  private ascii = inject(AscIIService);
  resultXOR: string = '';

  // Função para criptografar o texto usando a chave
  encrypt(text: string, key: string): string {
    console.log('texto recebido', text);
    const textWithoutSpaces = text.replace(/\s/g, '');
    console.log(`Texto sem espaços: ${textWithoutSpaces}`);

    // Estende a chave
    const extendedKey = this.extendKey(textWithoutSpaces, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let encryptedText = '';

    this.resultXOR = '';

    // Itera sobre cada caractere do texto
    for (let i = 0; i < textWithoutSpaces.length; i++) {
      // Caractere original
      const plainChar = textWithoutSpaces[i];
      const keyChar = extendedKey[i];
      const encryptedBinary = this.encryptChar(plainChar, keyChar);
      this.resultXOR += encryptedBinary;
    }

    console.log(`Resultado completo do XOR: ${this.resultXOR}`);
    return this.resultXOR; // Retorna o texto criptografado
  }

  // Função para descriptografar o texto criptografado
  decrypt(encryptedText: string, key: string): string {
    console.log(`Texto criptografado: ${encryptedText}`);
    // Estende a chave para o texto criptografado
    const extendedKey = this.extendKey(encryptedText, key);
    console.log(`Chave estendida: ${extendedKey}`);
    let decryptedText = '';

    // Dividir o texto criptografado em blocos de 8 bits
    const encryptedBlocks = encryptedText.match(/.{1,8}/g);

    if (!encryptedBlocks) {
      console.error(
        'Erro: Não foi possível dividir o texto criptografado em blocos de 8 bits.'
      );
      return '';
    }

    // Itera sobre cada bloco de 8 bits
    for (let i = 0; i < encryptedBlocks.length; i++) {
      // Obtém o bloco de 8 bits
      const encryptedBinary = encryptedBlocks[i];
      // Obtém o caractere da chave correspondente
      const keyChar = extendedKey[i];

      // Descriptografa o caractere
      const decryptedChar = this.decryptChar(encryptedBinary, keyChar);
      decryptedText += decryptedChar;
    }

    console.log(`Texto descriptografado final: ${decryptedText}`);
    return decryptedText;
  }

  // Método para estender a chave para corresponder ao comprimento do texto
  private extendKey(text: string, key: string): string {
    return key
      .repeat(Math.ceil(text.length / key.length))
      .slice(0, text.length);
  }

  // Método para criptografar um caractere
  private encryptChar(plainChar: string, keyChar: string): string {
    // Obtém a representação binária do caractere
    const plainBinary = this.ascii.getBinaryForLetter(plainChar);
    // Obtém a representação binária do caractere da chave
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    // Verifica se os caracteres são válidos
    if (!plainBinary || !keyBinary) {
      console.error(`Caractere não encontrado: '${plainChar}' ou '${keyChar}'`);
      return '';
    }

    // Retorna o resultado da operação XOR
    return this.xorBinary(plainBinary, keyBinary);
  }

  // Método para descriptografar um bloco binário
  private decryptChar(encryptedBinary: string, keyChar: string): string {
    // Obtém a representação binária do caractere da chave
    const keyBinary = this.ascii.getBinaryForLetter(keyChar);

    // Verifica se os caracteres são válidos
    if (!encryptedBinary || !keyBinary) {
      console.error(
        `Caractere não encontrado: '${encryptedBinary}' ou '${keyChar}'`
      );
      return '';
    }

    // Aplica XOR para descriptografar
    const decryptedBinary = this.xorBinary(encryptedBinary, keyBinary);
    // Converte binário de volta para caractere
    return this.ascii.getLetterFromBinary(decryptedBinary);
  }

  // Método para realizar a operação XOR entre dois binários
  private xorBinary(binary1: string, binary2: string): string {
    let result = '';
    for (let i = 0; i < 8; i++) {
      const bit1 = binary1[i];
      const bit2 = binary2[i];
      const xorResult = bit1 === bit2 ? '0' : '1';

      console.log(`bit1: ${bit1}, bit2: ${bit2}, xorResult: ${xorResult}`);

      result += xorResult;
    }
    return result;
  }
}
