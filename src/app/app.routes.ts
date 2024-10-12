import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { CaesarCipherAlgorithmComponent } from './Pages/caesar-cipher-algorithm/caesar-cipher-algorithm.component';
import { TranspositionCiphersComponent } from './Pages/transposition-ciphers/transposition-ciphers.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'caesar-cipher', component: CaesarCipherAlgorithmComponent },
  { path: 'transposition-cipher', component: TranspositionCiphersComponent },
  { path: '**', redirectTo: '' },
];
