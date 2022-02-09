import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaHeaderComponent } from './prueba-header.component';

describe('PruebaHeaderComponent', () => {
  let component: PruebaHeaderComponent;
  let fixture: ComponentFixture<PruebaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
