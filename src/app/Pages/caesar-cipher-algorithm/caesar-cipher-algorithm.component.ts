import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CaesarCipherAlgorithmServiceService } from '../../Services/caesar-cipher-algorithm-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caesar-cipher-algorithm',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './caesar-cipher-algorithm.component.html',
  styleUrls: ['./caesar-cipher-algorithm.component.scss'],
})
export class CaesarCipherAlgorithmComponent {
  private cipherService = inject(CaesarCipherAlgorithmServiceService);
  private formBuilder = inject(NonNullableFormBuilder);

  // Variaveis
  resultText: string = '';
  copiedMessage: string | null = null;

  cipherForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: [3, [Validators.required, Validators.min(1)]],
  });

  // Método para criptografar o texto
  encrypt(): void {
    // pegar o valor do formulário
    const { inputText, key } = this.cipherForm.value;
    // Verifica se o formulário é válido
    if (this.cipherForm.valid) {
      // Chama o serviço de criptografia e armazena o resultado
      this.resultText = this.cipherService.encrypt(inputText, key);
    }
  }

  // Método para descriptografar o texto
  decrypt(): void {
    // pegar o valor do formulário
    const { inputText, key } = this.cipherForm.value;
    // Verifica se o formulário é válido
    if (this.cipherForm.valid) {
      // Chama o serviço de descriptografia e armazena o resultado
      this.resultText = this.cipherService.decrypt(inputText, key);
    }
  }

  // Método para copiar o texto resultante para a área de transferência
  copyToClipboard() {
    if (this.resultText) {
      // Verifica se há texto para copiar
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

  // Método para limpar os campos do formulário e a mensagem de cópia
  clearInput() {
    this.cipherForm.reset();
    this.resultText = '';
    this.copiedMessage = null;
  }
}
