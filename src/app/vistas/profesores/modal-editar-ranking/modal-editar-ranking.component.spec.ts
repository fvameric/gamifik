import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarRankingComponent } from './modal-editar-ranking.component';

describe('ModalEditarRankingComponent', () => {
  let component: ModalEditarRankingComponent;
  let fixture: ComponentFixture<ModalEditarRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
