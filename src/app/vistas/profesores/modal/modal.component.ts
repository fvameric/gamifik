import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() idModal:any;
  @Input() rankSelec:any;
  @Input() alumnosRank:any;
  @Input() entregaSelec:any;
  @Input() alumnoDetalle:any;
  @Input() skillSelec:any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.idModal);
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }

  enviar(modal:any){
    this.modalService.open(modal); 
  }

  retornar(){
    this.modalService.dismissAll();
  }
}
