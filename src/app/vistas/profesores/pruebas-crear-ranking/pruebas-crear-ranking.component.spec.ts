import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasCrearRankingComponent } from './pruebas-crear-ranking.component';

describe('PruebasCrearRankingComponent', () => {
  let component: PruebasCrearRankingComponent;
  let fixture: ComponentFixture<PruebasCrearRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasCrearRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasCrearRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
