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

  resultText: string = '';
  copiedMessage: string | null = null;

  transpositionCiphersForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: ['', [Validators.required, this.uniqueLettersValidator.bind(this)]],
  });

  // Função para gerar a lista de letras do alfabeto
  generateAlphabetList(): { [key: number]: string } {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result: { [key: number]: string } = {};

    for (let i = 0; i < alphabet.length; i++) {
      result[i + 1] = alphabet[i];
    }

    return result;
  }

  // Validador para garantir que a chave não contenha letras repetidas e sejam letras válidas
  uniqueLettersValidator(control: FormControl) {
    const value = control.value.toUpperCase(); // Converte a chave para maiúsculas
    const alphabetList = Object.values(this.generateAlphabetList());
    const uniqueLetters = new Set(value.split(''));

    // Verificar se todas as letras são válidas (parte do alfabeto)
    const allLettersValid = value
      .split('')
      .every((letter: string) => alphabetList.includes(letter));

    // Verificar se o número de letras únicas é igual ao tamanho da chave
    const noDuplicateLetters = uniqueLetters.size === value.length;

    if (!allLettersValid) {
      return { invalidLetters: true }; // Se contém caracteres inválidos
    }

    if (!noDuplicateLetters) {
      return { duplicateLetters: true }; // Se contém letras duplicadas
    }

    return null;
  }

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

  copyToClipboard() {
    if (this.resultText) {
      navigator.clipboard
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

  clearInput() {
    this.transpositionCiphersForm.reset();
    this.resultText = '';
    this.copiedMessage = null;
  }
}
