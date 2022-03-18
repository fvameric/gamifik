import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TokenService } from '../../../../services/token.service';
import { debounceTime, tap } from 'rxjs/operators';
import { RankingService } from 'services/ranking.service';
import { Entrega } from 'app/interfaces/Entrega';


@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.css'],
})
export class ModalEntregaComponent implements OnInit {
  submitted: boolean = false;
  rank: any;

  entrega: Entrega = {
    id_entrega: 0,
    nom_entrega: '',
    id_rank: 0,
  };

  crearPractica!: FormGroup;

  @Input() rankSelec: any;
  @Input() alumnosRank: any;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService,
    private rankService: RankingService
  ) { }

  ngOnInit() {
    this.crearForm();
    this.checkNombre();

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
    this.submitted = false;
  }

  crearForm() {
    this.crearPractica = this.formBuilder.group({
      nombrePractica: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.crearPractica.valid) {
      this.crearEntrega();

      this.modalService.dismissAll();
    } else {
    }

    this.crearPractica.reset();
  }

  crearEntrega() {
    this.entrega.nom_entrega = this.nombrePractica.value;
    this.entrega.id_rank = this.rankSelec.id_rank;

    this.rankService.insertarPractica(this.entrega).subscribe((val: any) => {
      if (val.resultado == 'ok') {
        if (this.alumnosRank.length != 0) {
          console.log("insert con alumnos");
          this.alumnosRank.forEach((element: any) => {
            var ids = {
              "id_rank": this.entrega.id_rank,
              "id_entrega": val.data.id_entrega,
              "id_alumno": element.id_alumno
            }

            this.rankService.insertarEntregaJoin(ids).subscribe();
          });
        } else {
          console.log("insert SIN alumnos");
          var ids = {
            "id_rank": this.entrega.id_rank,
            "id_entrega": val.data.id_entrega
          }

          this.rankService.insertarEntregaJoin(ids).subscribe();
        }
        window.location.reload();
      }
    });

  }

  checkNombre() {
    // this.nombrePractica.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     tap((nombrePractica) => {
    //       console.log('comprobando');
    //       if (nombrePractica !== '' && this.nombrePractica.invalid) {
    //         //this.nombreRanking.markAsPending();
    //         this.nombrePractica.markAsPending({ emitEvent: true });
    //       } else {
    //         this.nombrePractica.setErrors({ invalid: true });
    //       }
    //     })
    //   )
    //   .subscribe((nombrePractica) => {
    //     this.rankService
    //       .validarNombreExisteRanking(this.id_profe, nombrePractica)
    //       .subscribe((val: any) => {
    //         if (val.resultado == 'error') {
    //           this.nombrePractica.markAsPending({ onlySelf: false });
    //           this.nombrePractica.setErrors({ notUnique: true });
    //         } else {
    //           this.nombrePractica.markAsPending({ onlySelf: false });
    //           if (nombrePractica.length > 0) {
    //             this.nombrePractica.setErrors(null);
    //           } else {
    //             this.nombrePractica.setErrors({ required: true });
    //           }
    //         }
    //       });
    //   });
  }
}
