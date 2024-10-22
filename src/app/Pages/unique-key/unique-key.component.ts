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

  otpForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    key: ['', Validators.required],
  });

  resultText: string = '';
  copiedMessage: string | null = null;

  encrypt(): void {
    const { inputText, key } = this.otpForm.value;

    try {
      // Criptografar texto
      this.resultText = this.uniqueKeyService.encrypt(inputText, key);
    } catch (error) {
      console.error(error);
    }
  }

  decrypt(): void {
    const { inputText, key } = this.otpForm.value;

    try {
      // Descriptografar texto
      this.resultText = this.uniqueKeyService.decrypt(inputText, key);
    } catch (error) {
      console.error(error);
    }
  }

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

  clearInput(): void {
    this.otpForm.reset();
    this.resultText = '';
  }
}
