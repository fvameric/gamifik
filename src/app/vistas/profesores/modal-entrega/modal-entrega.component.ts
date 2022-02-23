import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.css']
})
export class ModalEntregaComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  enviar(modal:any){
    this.modalService.open(modal); 
  }

  retornar(){
    this.modalService.dismissAll();
  }
  
  onSubmit(){
    this.modalService.dismissAll();
  }
}
