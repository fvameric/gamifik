import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionProfesoresComponent } from './identificacion-profesores.component';

describe('IdentificacionProfesoresComponent', () => {
  let component: IdentificacionProfesoresComponent;
  let fixture: ComponentFixture<IdentificacionProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacionProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
