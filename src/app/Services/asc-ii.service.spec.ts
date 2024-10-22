import { TestBed } from '@angular/core/testing';

import { AscIIService } from './asc-ii.service';

describe('AscIIService', () => {
  let service: AscIIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AscIIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
