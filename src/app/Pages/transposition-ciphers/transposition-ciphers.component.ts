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
  private transpositionService = inject(TranspositionCiphersServiceService); // Injeção do serviço

  resultText: string = '';
  copiedMessage: string | null = null;

  transpositionCiphersForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: ['', [Validators.required, this.uniqueLettersValidator]],
  });

  // Validador para garantir que a chave não contenha letras repetidas
  uniqueLettersValidator(control: FormControl) {
    const value = control.value;
    const uniqueLetters = new Set(value.split(''));
    return uniqueLetters.size === value.length
      ? null
      : { duplicateLetters: true };
  }

  encrypt(): void {
    const { inputText, key } = this.transpositionCiphersForm.value;

    // Utiliza o tamanho da chave como o número de colunas
    const numColumns = key.length;

    // Utilizando o serviço para cifrar
    this.resultText = this.transpositionService.encrypt(inputText, numColumns);
  }

  decrypt(): void {
    const { inputText, key } = this.transpositionCiphersForm.value;

    // Utiliza o tamanho da chave como o número de colunas
    const numColumns = key.length;

    // Utilizando o serviço para descriptografar
    this.resultText = this.transpositionService.decrypt(inputText, numColumns);
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
