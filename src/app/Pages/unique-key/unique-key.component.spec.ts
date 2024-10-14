import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueKeyComponent } from './unique-key.component';

describe('UniqueKeyComponent', () => {
  let component: UniqueKeyComponent;
  let fixture: ComponentFixture<UniqueKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniqueKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
