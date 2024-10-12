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

@Component({
  selector: 'app-caesar-cipher-algorithm',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './caesar-cipher-algorithm.component.html',
  styleUrls: ['./caesar-cipher-algorithm.component.scss'],
})
export class CaesarCipherAlgorithmComponent {
  private cipherService = inject(CaesarCipherAlgorithmServiceService);
  private formBuilder = inject(NonNullableFormBuilder);

  resultText: string = '';

  // Definir o formulário reativo
  cipherForm: FormGroup = this.formBuilder.group({
    inputText: ['', Validators.required],
    shift: [3, [Validators.required, Validators.min(1)]],
  });

  // Função para criptografar o texto
  encrypt(): void {
    const { inputText, shift } = this.cipherForm.value;
    if (this.cipherForm.valid) {
      this.resultText = this.cipherService.encrypt(inputText, shift);
    }
  }

  // Função para descriptografar o texto
  decrypt(): void {
    const { inputText, shift } = this.cipherForm.value;
    if (this.cipherForm.valid) {
      this.resultText = this.cipherService.decrypt(inputText, shift);
    }
  }
}
