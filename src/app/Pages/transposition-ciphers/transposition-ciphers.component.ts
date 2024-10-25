import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranspositionCiphersServiceService } from '../../Services/transposition-ciphers-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transposition-ciphers',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './transposition-ciphers.component.html',
  styleUrls: ['./transposition-ciphers.component.scss'],
})
export class TranspositionCiphersComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private transpositionService = inject(TranspositionCiphersServiceService);

  // variaveis
  resultText: string = '';
  copiedMessage: string | null = null;

  // Criação do formulário reativo com validações
  transpositionCiphersForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: ['', [Validators.required, this.repeatedLetterChecked.bind(this)]],
  });

  // Função para gerar a lista de letras do alfabeto
  generateAlphabetList(): { [key: number]: string } {
    // Alfabeto em letras maiúsculas
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Objeto para armazenar o alfabeto com índices
    const result: { [key: number]: string } = {};

    for (let i = 0; i < alphabet.length; i++) {
      // Mapeia letras para seus índices (1-based)
      result[i + 1] = alphabet[i];
    }

    // Retorna a lista do alfabeto
    return result;
  }

  // Validador para garantir que a chave não contenha letras repetidas e sejam letras válidas
  repeatedLetterChecked(control: FormControl) {
    // Converte a chave para maiúsculas
    const value = control.value.toUpperCase();
    // Obtém a lista de letras do alfabeto
    const alphabetList = Object.values(this.generateAlphabetList());
    // split('') divide a string value em um array de caracteres, onde cada letra da string original se torna um elemento do array.
    const uniqueLetters = new Set(value.split(''));

    // Verificar se todas as letras são válidas (parte do alfabeto)
    const allLettersValid = value
      .split('')
      .every((letter: string) => alphabetList.includes(letter));

    // Verificar se o número de letras únicas é igual ao tamanho da chave
    const noDuplicateLetters = uniqueLetters.size === value.length;

    // Se contém caracteres inválidos
    if (!allLettersValid) {
      return { invalidLetters: true };
    }
    // Se contém letras duplicadas
    if (!noDuplicateLetters) {
      return { duplicateLetters: true };
    }

    return null;
  }

  // Método para criptografar o texto
  encrypt(): void {
    const { inputText, key } = this.transpositionCiphersForm.value;

    // Utiliza o tamanho da chave como o número de colunas
    const numColumns = key.length;

    // Utilizando o serviço para cifrar
    this.resultText = this.transpositionService.encrypt(
      inputText,
      numColumns,
      key
    );
  }

  // Método para descriptografar o texto
  decrypt(): void {
    const { inputText, key } = this.transpositionCiphersForm.value;

    // Utiliza o tamanho da chave como o número de colunas
    const numColumns = key.length;

    // Utilizando o serviço para descriptografar
    this.resultText = this.transpositionService.decrypt(
      inputText,
      numColumns,
      key
    );
  }

  // Método para copiar o texto resultante para a área de transferência
  copyToClipboard() {
    if (this.resultText) {
      navigator.clipboard
        // Copia o texto para a área de transferência
        .writeText(this.resultText)
        .then(() => {
          this.copiedMessage = 'Texto copiado para a área de transferência!';
          setTimeout(() => {
            this.copiedMessage = null;
          }, 3000);
        })
        .catch((err) => {
          console.error('Erro ao copiar o texto: ', err);
        });
    } else {
      console.log('Não há texto para copiar.');
    }
  }

  // Método para limpar o formulário e resultados
  clearInput() {
    this.transpositionCiphersForm.reset();
    this.resultText = '';
    this.copiedMessage = null;
  }
}
