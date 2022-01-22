import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProfesorComponent } from './registro-profesor.component';

describe('RegistroProfesorComponent', () => {
  let component: RegistroProfesorComponent;
  let fixture: ComponentFixture<RegistroProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
