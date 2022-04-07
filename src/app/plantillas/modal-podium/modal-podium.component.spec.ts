import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPodiumComponent } from './modal-podium.component';

describe('ModalPodiumComponent', () => {
  let component: ModalPodiumComponent;
  let fixture: ComponentFixture<ModalPodiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPodiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
