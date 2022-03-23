import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesAlumnoComponent } from './ver-detalles-alumno.component';

describe('VerDetallesAlumnoComponent', () => {
  let component: VerDetallesAlumnoComponent;
  let fixture: ComponentFixture<VerDetallesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetallesAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetallesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
