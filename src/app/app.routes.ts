import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { CaesarCipherAlgorithmComponent } from './Pages/caesar-cipher-algorithm/caesar-cipher-algorithm.component';
import { TranspositionCiphersComponent } from './Pages/transposition-ciphers/transposition-ciphers.component';
import { UniqueKeyComponent } from './Pages/unique-key/unique-key.component';
import { CryptographyOverviewComponent } from './Pages/cryptography-overview/cryptography-overview.component';

export const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: '', component: CryptographyOverviewComponent },
  { path: 'caesar-cipher', component: CaesarCipherAlgorithmComponent },
  { path: 'transposition-cipher', component: TranspositionCiphersComponent },
  { path: 'unique-key', component: UniqueKeyComponent },
  { path: '**', redirectTo: '' },
];
