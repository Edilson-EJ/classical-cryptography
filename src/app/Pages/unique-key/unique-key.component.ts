import { Component, inject } from '@angular/core';
import { UniqueKeyService } from '../../Services/unique-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unique-key',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './unique-key.component.html',
  styleUrls: ['./unique-key.component.scss'],
})
export class UniqueKeyComponent {
  private formBuilder = inject(FormBuilder);
  private uniqueKeyService = inject(UniqueKeyService);

  // Criação do formulário reativo com validações
  otpForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: ['', Validators.required],
  });

  resultText: string = '';
  copiedMessage: string | null = null;

  // Método para criptografar o texto
  encrypt(): void {
    const { inputText, key } = this.otpForm.value;

    try {
      // Criptografar texto usando o serviço
      // Usar o texto original e a chave para a criptografia
      this.uniqueKeyService.encrypt(inputText, key);
      // Define resultText para ser a string binária resultante da criptografia
      this.resultText = this.uniqueKeyService.resultXOR;
    } catch (error) {
      console.error(error);
      this.resultText =
        'Erro ao processar o texto. Verifique a chave e o texto!';
    }
  }

  // Método para descriptografar o texto
  decrypt(): void {
    // Desestrutura o valor do formulário
    const { inputText, key } = this.otpForm.value;

    try {
      // Descriptografar texto usando o serviço
      // Atribui o resultado da descriptografia
      this.resultText = this.uniqueKeyService.decrypt(inputText, key);
    } catch (error) {
      console.error(error);
      this.resultText =
        'Erro ao processar o texto. Verifique a chave e o texto!';
    }
  }

  // Método para copiar o texto resultante para a área de transferência
  copyToClipboard(): void {
    if (this.resultText) {
      navigator.clipboard
        .writeText(this.resultText)
        .then(() => {
          this.copiedMessage = 'Texto copiado!';
          setTimeout(() => {
            this.copiedMessage = null;
          }, 3000);
        })
        .catch((err) => {
          console.error('Erro ao copiar o texto: ', err);
        });
    }
  }

  // Método para limpar o formulário e o resultado
  clearInput(): void {
    this.otpForm.reset();
    this.resultText = '';
  }
}
