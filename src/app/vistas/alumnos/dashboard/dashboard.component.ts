import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { Profesor } from '../../../interfaces/Profesor';
import { User } from 'app/interfaces/User';
import { UsersService } from 'services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { Ranking } from 'app/interfaces/Ranking';
import Swal from 'sweetalert2';
import { TokenService } from 'services/token.service';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  profesores: any;
  alumnos: any;
  mostrarRankingsVisual: boolean = false;
  mostrarConfiguracionVisual: boolean = false;
  mostrarCerrarVisual: boolean = false;
  editableEmail: boolean = true;
  editableNombre: boolean = true;
  editableApellidos: boolean = true;

  passType: string = 'password';
  passTypeNew: string = 'password';
  passTypeConfirmNew: string = 'password';

  antiguaContrasena: boolean = false;
  nuevaContrasena: boolean = false;
  confirmarNuevaContrasena: boolean = false;

  mostrarEditarContrasena: boolean = false;

  password: string = 'password';
  text: string = 'text';

  nombre: string = 'funciona Fran';
  apellidos: string = 'funciona Fran Olga';
  email: string = 'funcionaFran@gmail.com';

  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: ''
  };

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

  tipoUser: any;
  datosStorage: any;

  // rankings
  rankings: any;
  rankingsConAlumnos: any;
  ranksCodes: any;
  alumnosId: any[] = [];
  ranksArray: any[] = [];
  flagRanks: boolean = false;
  rankingIds: any;
  datosRanking: any;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  noselec: boolean = false;
  listaAlumnos: any[] = [];

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
  }

  obtenerDatos() {
    this.datosAlumno = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking().subscribe(val => this.rankings = val);
    this.rankingService.obtenerJoinRankingAlumno().subscribe((val: any) => {
      this.rankingsConAlumnos = val;

      val.forEach((element: any) => {
        if (element.id_alumno == this.datosAlumno.id_alumno) {
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

  async unirseRanking() {
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
        console.log("rank existe");
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
        console.log("alumno NO está en el rank");
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
            console.log("Se une al ranking");

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
      console.log(codRank + " no existe");
    }
  }

  rankSelec(rankId: number) {
    this.listaAlumnos = [];
    this.rankSeleccionado = this.arrRankings.find(rank => rank.id_rank == rankId);

    this.rankingService.obtenerRankingAlumnos().subscribe((val: any) => {
      val.forEach((element:any) => {
        if (element.id_rank == this.rankSeleccionado.id_rank) {
          this.usersService.obtenerAlumnoPorId(element.id_alumno).subscribe((val: any) => {
            this.listaAlumnos.push(val.data);
          });
        }
      });
    });

    if (this.noselec) {
      this.noselec = false;
    } else {
      this.noselec = true;
    }
  }
}
