import { Component, OnInit } from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-crear-rankings',
  templateUrl: './modal-crear-rankings.component.html',
  styleUrls: ['./modal-crear-rankings.component.css']
})
export class ModalCrearRankingsComponent implements OnInit {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  open() { this.modalService.open(NgbdModal2Content, {size: 'lg'}); }

  ngOnInit() {
  }

}
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>Hello, World!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModal2Content {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({selector: 'ngbd-modal-stacked', templateUrl: './modal-stacked.html'})
export class NgbdModalStacked {
  modalsNumber = 0;

  constructor(private modalService: NgbModal) {
    this.modalService.activeInstances.subscribe((list) => { this.modalsNumber = list.length; });
  }

  open() { this.modalService.open(ModalCrearRankingsComponent); }
}