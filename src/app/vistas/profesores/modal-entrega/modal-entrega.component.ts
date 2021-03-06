import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TokenService } from '../../../../services/token.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RankingService } from 'services/ranking.service';
import { Entrega } from 'app/interfaces/Entrega';
import { of, Subject } from 'rxjs';


@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.css'],
})
export class ModalEntregaComponent implements OnInit {
  private subject = new Subject();
  
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

  // wait for interval to end
  pendingName: boolean = false;
  
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
    }
  }

  crearEntrega() {
    this.entrega.nom_entrega = this.nombrePractica.value;
    this.entrega.id_rank = this.rankSelec.id_rank;

    this.rankService.insertarPractica(this.entrega).subscribe(val => this.insertarAlumnosJoin(val));
  }

  insertarAlumnosJoin(val: any) {
    var paqueteAlumnos: any = [];

    if (val.resultado == 'ok') {
      if (this.alumnosRank.length != 0) {
        this.alumnosRank.forEach((element: any) => {
          var idsAlumnos = {
            "id_rank": this.entrega.id_rank,
            "id_entrega": val.data.id_entrega,
            "id_alumno": element.id_alumno
          }
          paqueteAlumnos.push(idsAlumnos);
        });
      } else {
        var ids = {
          "id_rank": this.entrega.id_rank,
          "id_entrega": val.data.id_entrega
        }
        paqueteAlumnos.push(ids);
      }
    }
    
    this.rankService.insertarEntregaJoin(paqueteAlumnos).subscribe(val => this.resultadoInsert(val));
  }

  resultadoInsert(val: any) {
    if (val.resultado == 'ok') {
      window.location.reload();
    } else {
      console.log(val);
    }
  }

  checkNombre() {
    this.nombrePractica.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(nom => this.rankService.validarNombreExistePractica(this.rankSelec.id_rank, nom)),
      takeUntil(this.subject)
    ).subscribe((val: any) => {
      this.pendingName = true;
      setTimeout(() => {
        if (val.resultado == 'error') {
          this.nombrePractica?.setErrors({ notUnique: true });
        }
        this.pendingName = false;
      }, 600);
    });
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }
}
