import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
import { UsersService } from 'services/users.service';
import { Ranking } from '../../../interfaces/Ranking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, repeat, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-ranking',
  templateUrl: './crear-ranking.component.html',
  styleUrls: ['./crear-ranking.component.css'],
})
export class CrearRankingComponent implements OnInit {
  crearRankingForm!: FormGroup;
  submitted: boolean = false;

  listaAlumnos: any;
  selecAlumnos: any[] = [];
  codigoRanking: string = 'Random string';
  rankCodes: any;
  ranking: Ranking = {
    id_rank: 0,
    nom_rank: '',
    alumnos: 0,
    cod_rank: '',
  };

  profeLogin: any;

  constructor(
    public formBuilder: FormBuilder,
    private usersService: UsersService,
    private rankService: RankingService,
    private tokenService: TokenService,
    private router: Router,
    private modalService: NgbModal,
    private HttpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.crearForm();
    this.usersService
      .obtenerAlumnos()
      .subscribe((val) => (this.listaAlumnos = val));

    this.checkNombre();
  }

  obtenerDatosProfesor() {
    this.profeLogin = this.tokenService.getUser();
  }

  crearForm() {
    this.crearRankingForm = this.formBuilder.group({
      nombreRanking: ['', Validators.required],
    });
  }

  get form() {
    return this.crearRankingForm.controls;
  }

  get nombreRanking() {
    return this.crearRankingForm.get('nombreRanking') as FormControl;
  }

  checkboxAlumnos(event: any) {
    if (event.target.checked) {
      this.selecAlumnos.push(event.target.value);
    } else {
      this.selecAlumnos.splice(
        this.selecAlumnos.indexOf(event.target.value),
        1
      );
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.crearRankingForm.valid) {
      this.generaNss();
      this.modalService.dismissAll();
    }
  }

  checkNombre() {
    this.nombreRanking.valueChanges
      .pipe(
        debounceTime(500),
        tap((nombreRanking) => {
          if (nombreRanking !== '' && this.nombreRanking.invalid) {
            this.nombreRanking.markAsPending();
          } else {
            this.nombreRanking.setErrors({ invalid: true });
          }
        })
      )
      .subscribe((nombreRanking) => {
        this.rankService
          .validarNombreExisteRanking(nombreRanking)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              console.log('ha sido error');

              this.nombreRanking.markAsPending({ onlySelf: false });
              this.nombreRanking.setErrors({ notUnique: true });
            } else {
              console.log('funciona');

              this.nombreRanking.markAsPending({ onlySelf: false });
              if (nombreRanking.length > 0) {
                this.nombreRanking.setErrors(null);
              } else {
                this.nombreRanking.setErrors({ required: true });
              }
            }
          });
      });
  }

  //Funcion que genera el codigo
  generaNss() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.comprobarCodigo(result);
  }

  //Función que comprueba el codigo
  comprobarCodigo(codigo: string) {
    this.codigoRanking = codigo;
    this.rankService.obtenerRanking().subscribe((val: any) => {
      this.rankCodes = val;

      this.rankCodes.forEach((element: any) => {
        if (element.cod_rank != codigo) {
          this.ranking.alumnos = 0;
          this.ranking.nom_rank =
            this.crearRankingForm.get('nombreRanking')?.value;
          this.ranking.cod_rank = codigo;
        } else {
          this.generaNss();
        }
      });
      this.rankService.insertarRanking(this.ranking).subscribe((val: any) => {
        //this.insertarAlumnosRanking(val.data.id_rank);
        this.insertarAlumnosRanking(val.data.id_rank);
        this.insertarProfesorRanking(val.data.id_rank);
      });
    });
  }

  insertarAlumnosRanking(id_rank: number) {
    for (let i = 0; i < this.selecAlumnos.length; i++) {
      let id_alumno: number = this.selecAlumnos[i];
      this.rankService
        .insertarAlumnoEnRanking(id_rank, id_alumno)
        .subscribe((val: any) => {
          console.log(val);
        });
    }
  }

  insertarProfesorRanking(id_rank: number) {
    this.rankService
      .insertarProfeEnRanking(id_rank, this.profeLogin.id_profe)
      .subscribe((val: any) => {
        console.log(val);
        window.location.reload();
      });
  }
}
