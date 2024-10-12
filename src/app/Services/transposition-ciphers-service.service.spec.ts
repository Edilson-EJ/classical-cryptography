import { TestBed } from '@angular/core/testing';

import { TranspositionCiphersServiceService } from './transposition-ciphers-service.service';

describe('TranspositionCiphersServiceService', () => {
  let service: TranspositionCiphersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranspositionCiphersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
