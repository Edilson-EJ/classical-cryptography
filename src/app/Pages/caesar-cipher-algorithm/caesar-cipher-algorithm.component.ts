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

  resultText: string = '';
  copiedMessage: string | null = null;
  cipherForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    shift: [3, [Validators.required, Validators.min(1)]],
  });

  encrypt(): void {
    const { inputText, shift } = this.cipherForm.value;
    if (this.cipherForm.valid) {
      this.resultText = this.cipherService.encrypt(inputText, shift);
    }
  }

  decrypt(): void {
    const { inputText, shift } = this.cipherForm.value;
    if (this.cipherForm.valid) {
      this.resultText = this.cipherService.decrypt(inputText, shift);
    }
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
    this.cipherForm.reset();
    this.resultText = '';
    this.copiedMessage = null;
  }
}
