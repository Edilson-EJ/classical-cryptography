import { TestBed } from '@angular/core/testing';

import { UniqueKeyService } from './unique-key.service';

describe('UniqueKeyService', () => {
  let service: UniqueKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
