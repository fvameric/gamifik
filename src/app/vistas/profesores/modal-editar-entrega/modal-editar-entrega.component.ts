import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/auth/token.service';
import { Entrega } from 'app/interfaces/Entrega';
import { EntregasService } from 'services/entregas.service';

@Component({
  selector: 'app-modal-editar-entrega',
  templateUrl: './modal-editar-entrega.component.html',
  styleUrls: ['./modal-editar-entrega.component.css'],
})
export class ModalEditarEntregaComponent implements OnInit {
  submitted: boolean = false;
  entrega: any;

  modEntregaForm!: FormGroup;

  @Input() entregaSelec: any;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService,
    private rankService: RankingService,
    private entregasService: EntregasService
  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.checkNombre();
  }

  crearForm() {
    this.modEntregaForm = this.formBuilder.group({
      nomEntrega: [this.entregaSelec.nom_entrega, Validators.required],
    });
  }

  enviar(modal: any) {
    this.modalService.open(modal);
    console.log(this.entregaSelec.id_entrega);
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  get nombreEntrega() {
    return this.modEntregaForm.get('nomEntrega') as FormControl;
  }

  get form() {
    return this.modEntregaForm.controls;
  }

  checkNombre() {
    this.form.nomEntrega.valueChanges.subscribe((nombreEntrega) => {
      this.entregasService
        .validarNombreExistePractica(this.entregaSelec.id_rank, nombreEntrega)
        .subscribe((val: any) => {
          if (nombreEntrega==this.entregaSelec.nom_entrega) {
          } else {
            if (val.resultado == 'error') {
              this.nombreEntrega.markAsPending({ onlySelf: false });
              this.nombreEntrega.setErrors({ notUnique: true });
            }
          }
        });
    });
  }

  onSubmit(form: any) {
    console.log(form.controls.nomEntrega.value);
    console.log(this.entregaSelec);
    if (this.modEntregaForm.valid) {
      let entrega: Entrega = {
        id_entrega: this.entregaSelec.id_entrega,
        nom_entrega: this.modEntregaForm.get('nomEntrega')?.value,
        id_rank: this.entregaSelec.id_rank,
      };
      console.log(entrega);

      this.entregasService.modificarEntrega(entrega).subscribe();

      window.location.reload();
    }
  }
}
