import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfesorComponent } from './dashboard-profesor.component';

describe('DashboardProfesorComponent', () => {
  let component: DashboardProfesorComponent;
  let fixture: ComponentFixture<DashboardProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
