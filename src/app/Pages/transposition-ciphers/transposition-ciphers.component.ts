import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranspositionCiphersServiceService } from '../../Services/transposition-ciphers-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transposition-ciphers',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './transposition-ciphers.component.html',
  styleUrls: ['./transposition-ciphers.component.scss'],
})
export class TranspositionCiphersComponent {
  private cipherService = inject(TranspositionCiphersServiceService);
  private formBuild$ = inject(NonNullableFormBuilder);

  // Formulário reativo
  transpositionCiphersForm = this.formBuild$.group({
    inputText: ['', [Validators.required]],
    numColumns: [4, [Validators.required, Validators.min(1)]], // Número de colunas padrão
  });

  resultText: string = '';

  constructor() {}

  // Função para criptografar o texto
  encrypt(): void {
    const { inputText, numColumns } = this.transpositionCiphersForm.value;

    // Verifique se numColumns é um número válido
    if (typeof numColumns === 'number' && typeof inputText === 'string') {
      this.resultText = this.cipherService.encrypt(inputText, numColumns);
    } else {
      this.resultText = 'Texto ou número de colunas inválido.';
    }
  }

  // Função para descriptografar o texto
  decrypt(): void {
    const { inputText, numColumns } = this.transpositionCiphersForm.value;

    // Verifique se numColumns é um número válido
    if (typeof numColumns === 'number' && typeof inputText === 'string') {
      this.resultText = this.cipherService.decrypt(inputText, numColumns);
    } else {
      this.resultText = 'Texto ou número de colunas inválido.';
    }
  }
}
