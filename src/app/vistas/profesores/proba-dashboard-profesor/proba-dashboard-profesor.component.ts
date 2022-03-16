import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interfaces/Profesor';
import { UsersService } from 'services/users.service';
import { FormBuilder } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
import { Ranking} from '../../../interfaces/Ranking';


@Component({
  selector: 'app-proba-dashboard-profesor',
  templateUrl: './proba-dashboard-profesor.component.html',
  styleUrls: ['./proba-dashboard-profesor.component.css'],
})
export class ProbaDashboardProfesorComponent implements OnInit {
  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: '',
  };

  mostrarDesplegableVisual: boolean = false;
  mostrarDesplegablePracticaVisual: boolean = false;
  alumnoSelec: number = 0;
  rankingSelec: number = 0;
  

  // rankings
  rankings: any;
  rankingsConProfes: any;
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  rankDesplegable: any;
  listaAlumnos: any[] = [];

  flagDesplegable: boolean = false;
  indice: number = 0;

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
  }

  obtenerDatos() {
    this.datosProfesor = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService
      .obtenerRanking()
      .subscribe((val) => (this.rankings = val));
    this.rankingService.obtenerJoinRankingProfes().subscribe((val: any) => {
      this.rankingsConProfes = val;

      val.forEach((element: any) => {
        if (element.id_profe == this.datosProfesor.id_profe) {
          this.arrRankings.push(element);
        }
      });

      if (this.arrRankings.length == 0) {
        this.flagRanks = true;
      } else {
        this.flagRanks = false;
      }
    });
  }

  rankSelec(rank: any) {
    this.listaAlumnos = [];
    this.rankSeleccionado = rank;

    this.rankingService
      .obtenerAlumnoPorRanking(this.rankSeleccionado.id_rank)
      .subscribe((val: any) => {
        this.listaAlumnos = val;
      });
  }

  eliminarRanking() {
    this.rankingService
      .eliminarRanking(this.rankSeleccionado.id_rank)
      .subscribe((val: any) => {
        if (val.resultado == 'ok') {
          window.location.reload();
        } else {
          console.log(val.mensaje);
        }
      });
  }

  mostrarDesplegable(alumno: any) {
    this.alumnoSelec = alumno.id_alumno;
    let antiguaId = alumno.id_alumno;

    if (antiguaId == alumno.id_alumno) {
      if (this.mostrarDesplegableVisual) {
        this.mostrarDesplegableVisual = false;
      } else {
        this.mostrarDesplegableVisual = true;
      }
    }
    if (antiguaId != alumno.id_alumno) {
      this.mostrarDesplegableVisual = false;
    }
  }

  mostrarDesplegablePractica(index: number, rank: any) {
    this.indice = index;
    this.rankDesplegable = rank;
    
    if(this.flagDesplegable) {
      this.flagDesplegable = false;
    } else {
      this.flagDesplegable = true;
    }

    console.log(this.rankDesplegable);
  }
}

