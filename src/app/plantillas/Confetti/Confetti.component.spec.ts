/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfettiComponent } from './Confetti.component';

describe('ConfettiComponent', () => {
  let component: ConfettiComponent;
  let fixture: ComponentFixture<ConfettiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfettiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
