/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProbaDashboardProfesorComponent } from './proba-dashboard-profesor.component';

describe('ProbaDashboardProfesorComponent', () => {
  let component: ProbaDashboardProfesorComponent;
  let fixture: ComponentFixture<ProbaDashboardProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbaDashboardProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbaDashboardProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
