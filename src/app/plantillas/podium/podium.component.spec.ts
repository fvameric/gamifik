/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PodiumComponent } from './podium.component';

describe('PodiumComponent', () => {
  let component: PodiumComponent;
  let fixture: ComponentFixture<PodiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
