import { TestBed } from '@angular/core/testing';

import { CaesarCipherAlgorithmServiceService } from './caesar-cipher-algorithm-service.service';

describe('CaesarCipherAlgorithmServiceService', () => {
  let service: CaesarCipherAlgorithmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaesarCipherAlgorithmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
