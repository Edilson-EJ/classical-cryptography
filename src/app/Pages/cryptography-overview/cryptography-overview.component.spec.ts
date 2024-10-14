import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptographyOverviewComponent } from './cryptography-overview.component';

describe('CryptographyOverviewComponent', () => {
  let component: CryptographyOverviewComponent;
  let fixture: ComponentFixture<CryptographyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptographyOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptographyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
