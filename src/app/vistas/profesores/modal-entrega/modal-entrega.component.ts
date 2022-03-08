import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TokenService } from '../../../../services/token.service';
import { debounceTime, tap } from 'rxjs/operators';
@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.css'],
})
export class ModalEntregaComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {}
  crearPractica!: FormGroup;
  ngOnInit() {
    this.crearForm();
  }

  enviar(modal: any) {
    this.modalService.open(modal);
  }

  get form() {
    return this.crearPractica.controls;
  }

  get nombrePractica() {
    return this.crearPractica.get('nombrePractica') as FormControl;
  }

  retornar() {
    this.modalService.dismissAll();
    this.crearPractica.reset();
  }

  crearForm() {
    this.crearPractica = this.formBuilder.group({
      nombrePractica: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.crearPractica.valid) {
    }
    this.modalService.dismissAll();
    this.crearPractica.reset();
  }

  checkNombre() {
  //   this.nombrePractica.valueChanges
  //     .pipe(
  //       debounceTime(500),
  //       tap((nombreRanking) => {
  //         console.log('comprobando');
  //         if (nombreRanking !== '' && this.nombrePractica.invalid) {
  //           //this.nombreRanking.markAsPending();
  //           this.nombrePractica.markAsPending({ emitEvent: true });
  //         } else {
  //           this.nombrePractica.setErrors({ invalid: true });
  //         }
  //       })
  //     )
  //     .subscribe((nombreRanking) => {
  //       this.rankService
  //         .validarNombreExisteRanking(this.id_profe, nombreRanking)
  //         .subscribe((val: any) => {
  //           if (val.resultado == 'error') {
  //             this.nombreRanking.markAsPending({ onlySelf: false });
  //             this.nombreRanking.setErrors({ notUnique: true });
  //           } else {
  //             this.nombreRanking.markAsPending({ onlySelf: false });
  //             if (nombreRanking.length > 0) {
  //               this.nombreRanking.setErrors(null);
  //             } else {
  //               this.nombreRanking.setErrors({ required: true });
  //             }
  //           }
  //         });
  //     });
   }
}
