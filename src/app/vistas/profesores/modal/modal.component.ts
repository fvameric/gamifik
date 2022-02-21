import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  enviar(modal:any){
    this.modalService.open(modal); 
  }

  retornar(){
    this.modalService.dismissAll();
  }


}
