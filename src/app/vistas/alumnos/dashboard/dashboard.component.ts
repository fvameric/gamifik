import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { Profesor } from '../../../interfaces/Profesor';
import { UsersService } from 'services/users.service';
import { FormBuilder } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import Swal from 'sweetalert2';
import { TokenService } from 'services/token.service';
import { LoadingInterceptorService } from 'services/loading-interceptor.service';
import { concat, forkJoin } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: ''
  };

  loaded = false;

  // rankings
  rankings: any;
  rankingsConAlumnos: any;
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  listaAlumnos: any;

  flagPendiente: boolean = false;

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
    setInterval(() => {
      this.loaded = true;
    }, 1000);

    this.authService.guardarRoute(this.router.url);
  }

  obtenerDatos() {
    this.datosAlumno = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking().subscribe(val => this.rankings = val);
    this.rankingService.obtenerJoinRankingAlumno().subscribe((val: any) => {
      this.rankingsConAlumnos = val;

      if (this.rankingsConAlumnos == null) {
        this.flagRanks = true;
      } else {
        this.flagRanks = false;

        val.forEach((element: any) => {
          if (element.aceptado == 0) {
            this.flagPendiente = true;
          }
          if (element.id_alumno == this.datosAlumno.id_alumno) {
            this.arrRankings.push(element);
          }
        });
      }
    });
  }

  async unirseRanking() {
    this.obtenerDatosRanking();
    
    const { value: test } = await Swal.fire({
      title: 'Input',
      input: 'text',
      inputLabel: 'Input test',
      inputPlaceholder: 'Escribe algo',
      showCancelButton: true
    });

    if (test) {
      this.comprobarAlumnoRanking(test);
    }
  }

  comprobarAlumnoRanking(codRank: string) {
    let rankId: number = 0;
    let rankExiste: boolean = false;
    let alumnoExiste: boolean = false;
    this.rankings.forEach((element: any) => {
      if (codRank == element.cod_rank) {
        rankId = element.id_rank;
        rankExiste = true;
      }
    });

    if (rankExiste) {
      rankExiste = false;
      this.arrRankings.forEach((element: any) => {
        if (codRank == element.cod_rank) {
          alumnoExiste = true;
        }
      });
      if (alumnoExiste) {
        alumnoExiste = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ya está en el ranking'
        });
      } else {
        Swal.fire({
          title: "¿Quieres unirte a " + codRank + "?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Ok',
              text: 'Se une al ranking'
            });

            this.rankingService.insertarAlumnoEnRanking(rankId, this.datosAlumno.id_alumno).subscribe((val: any) => {
              if (val.resultado == 'ok') {
                this.ngOnInit();
              } else {
                console.log(val);
              }
            });
          } else {
            console.log("Se cancela el unirse al ranking");
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Codigo " + codRank + " no existe"
      });
    }
  }

  rankSelec(rank: any) {
    this.listaAlumnos = [];
    this.rankSeleccionado = rank;

    this.rankingService.obtenerAlumnoPorRanking(this.rankSeleccionado.id_rank)
    .subscribe((val: any) => {
      this.listaAlumnos = val;
    });
  }

  checkPendiente(rank: any) {
    this.rankingService.checkAlumnoAceptado(rank).subscribe((val:any) => {
      if (val.data.aceptado == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Aún no te han aceptado"
        });
      } else {
        window.location.reload();
      }
    });
  }
}
