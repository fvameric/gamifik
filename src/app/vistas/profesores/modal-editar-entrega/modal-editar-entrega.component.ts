import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';

@Component({
  selector: 'app-modal-editar-entrega',
  templateUrl: './modal-editar-entrega.component.html',
  styleUrls: ['./modal-editar-entrega.component.css']
})
export class ModalEditarEntregaComponent implements OnInit {

  submitted: boolean = false;
  entrega: any;

  modEntregaForm!: FormGroup;

  @Input() entregaSelec:any;

  constructor(    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService,
    private rankService: RankingService) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm() {
    this.modEntregaForm = this.formBuilder.group({
      nomEntrega: ['', Validators.required],
    });
  }

  enviar(modal: any) {
    this.modalService.open(modal);
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  onSubmit(form: any) {
    console.log(form.controls.nomRank.value);
    console.log(this.entregaSelec);
  }

}
