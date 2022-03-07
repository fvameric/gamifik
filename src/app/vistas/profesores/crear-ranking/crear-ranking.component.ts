import { Component, OnInit } from '@angular/core';
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
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-ranking',
  templateUrl: './crear-ranking.component.html',
  styleUrls: ['./crear-ranking.component.css'],
})
export class CrearRankingComponent implements OnInit {
  crearRankingForm!: FormGroup;
  submitted: boolean = false;

  listaAlumnos: any;
  codigoRanking: string = '';
  rankCodes: any;
  ranking: Ranking = {
    id_rank: 0,
    nom_rank: '',
    alumnos: 0,
    cod_rank: '',
  };

  profeLogin: any;

  node = document.createElement('div');
  nomExisteNode = document.createTextNode('Nombre de ranking ya existe');

  user: any;
  id_profe: number = 0;
  total_rankings: any;

  constructor(
    public formBuilder: FormBuilder,
    private usersService: UsersService,
    private rankService: RankingService,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.obtenerDatosProfesor();
    this.obtenerDatosRankings();
    this.crearForm();
    this.usersService
      .obtenerAlumnos()
      .subscribe((val) => (this.listaAlumnos = val));
    this.checkNombre();
    this.codigoRanking = this.generaNss();
    this.id_profe = this.user.id_profe;
    console.log(this.id_profe);

    this.total_rankings = this.rankService.contarRankings().subscribe;
    console.log(this.total_rankings);
  }

  obtenerDatosProfesor() {
    this.profeLogin = this.tokenService.getUser();
  }

  obtenerDatosRankings() {
    this.rankService
      .obtenerRanking()
      .subscribe((val) => (this.rankCodes = val));
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

  onSubmit() {
    this.submitted = true;

    if (this.crearRankingForm.valid) {
      this.validarCodigoRepetido(this.codigoRanking);
      this.crearRankingNuevo();
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
          .validarNombreExisteRanking(this.id_profe, nombreRanking)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              this.nombreRanking.markAsPending({ onlySelf: false });
              this.nombreRanking.setErrors({ notUnique: true });
            } else {
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
  generaNss(): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  validarCodigoRepetido(codigo: string) {
    let codExiste: boolean = false;
    this.rankCodes?.forEach((element: any | null) => {
      codExiste = true;
      if (element.cod_rank == codigo) {
        codExiste = true;
      }
    });

    if (codExiste) {
      this.codigoRanking = this.validarCodigoRepetido(this.generaNss());
    }
    return codigo;
  }

  crearRankingNuevo() {
    this.ranking.nom_rank = this.nombreRanking.value;
    this.ranking.cod_rank = this.codigoRanking;

    this.rankService.insertarRanking(this.ranking).subscribe((val: any) => {
      this.insertarProfesorRanking(val.data.id_rank);
    });

    this.modalService.dismissAll();
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
