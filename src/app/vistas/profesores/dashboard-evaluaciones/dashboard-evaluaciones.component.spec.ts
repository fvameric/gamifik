import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEvaluacionesComponent } from './dashboard-evaluaciones.component';

describe('DashboardEvaluacionesComponent', () => {
  let component: DashboardEvaluacionesComponent;
  let fixture: ComponentFixture<DashboardEvaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEvaluacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
