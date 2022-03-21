import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEntregaComponent } from './modal-editar-entrega.component';

describe('ModalEditarEntregaComponent', () => {
  let component: ModalEditarEntregaComponent;
  let fixture: ComponentFixture<ModalEditarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
