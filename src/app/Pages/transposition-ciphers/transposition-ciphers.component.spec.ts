import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranspositionCiphersComponent } from './transposition-ciphers.component';

describe('TranspositionCiphersComponent', () => {
  let component: TranspositionCiphersComponent;
  let fixture: ComponentFixture<TranspositionCiphersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranspositionCiphersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranspositionCiphersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
