import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaesarCipherAlgorithmComponent } from './caesar-cipher-algorithm.component';

describe('CaesarCipherAlgorithmComponent', () => {
  let component: CaesarCipherAlgorithmComponent;
  let fixture: ComponentFixture<CaesarCipherAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaesarCipherAlgorithmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaesarCipherAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
