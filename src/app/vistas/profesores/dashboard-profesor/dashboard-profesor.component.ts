import { Component, OnInit, Output } from '@angular/core';
import { Profesor } from '../../../interfaces/Profesor';
import { UsersService } from 'services/users.service';
import { FormBuilder } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.css']
})
export class DashboardProfesorComponent implements OnInit {
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

  // entregas
  entregas: any;
  arrEntregas: any[] = [];
  entregaSeleccionada: any;
  flagEntregas: boolean = false;

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
    this.obtenerDatosEntregas();
  }

  obtenerDatos() {
    this.datosProfesor = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking().subscribe(val => this.rankings = val);
    this.rankingService.obtenerJoinRankingProfes().subscribe((val: any) => {
      this.rankingsConProfes = val;
      
      if (this.rankingsConProfes == null) {
        this.flagRanks = true;
      } else {
        this.flagRanks = false;

        val.forEach((element: any) => {
          if (element.id_profe == this.datosProfesor.id_profe) {
            this.arrRankings.push(element);
          }
        });
      }
    });
  }

  obtenerDatosEntregas() {
    this.rankingService.obtenerEntregas().subscribe(val => this.entregas = val);

    if (this.entregas) {
      this.flagEntregas = true;
    } else {
      this.flagEntregas = false;
    }
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

  generarCodRank() {
    let nuevoCod = this.generaNss();
    
    if (this.rankings != null || this.rankings != undefined ) {
      nuevoCod = this.validarCodigoRepetido(nuevoCod);
    }

    this.rankSeleccionado.cod_rank = nuevoCod;

    this.rankingService.modificarRanking(this.rankSeleccionado).subscribe((val: any) => {
      console.log(val);
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
      this.rankings.forEach((element: any) => {
        if (element.cod_rank == codigo) {
          codExiste = true;
        }
      });

      if (codExiste) {
        codigo = this.validarCodigoRepetido(this.generaNss());
      }
    return codigo;
  }

  eliminarRanking() {
    console.log(this.rankSeleccionado.id_rank);

    Swal.fire({
      title: '¿Quieres eliminar el ranking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¿Realmente quieres eliminar el ranking?',
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
              text: 'Se eliminó el ranking',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.rankingService.eliminarRanking(this.rankSeleccionado.id_rank).subscribe((val: any) => {
                if (val.resultado == 'ok') {
                  this.obtenerDatosRanking();
                } else {
                  console.log(val.mensaje);
                }
              });
            });
          } else if (result.isDenied) {
            Swal.fire('No se ha eliminado el ranking', '', 'info');
          }
        });
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
    var oldIndex: number = this.indice;
    this.arrEntregas = [];
    this.indice = index;
    this.rankDesplegable = rank;

    if (index == oldIndex) {
      if (this.flagDesplegable) {
        this.flagDesplegable = false;
      } else {
        this.flagDesplegable = true;
      }
    } else {
      this.flagDesplegable = true;
    }

    this.entregas.forEach((element: any) => {
      if (element.id_rank == this.rankDesplegable.id_rank) {
        this.arrEntregas.push(element);
      }
    });

    
    if (this.arrEntregas.length == 0) {
      this.flagEntregas = true;
    } else {
      this.flagEntregas = false;
    }
  }

  detalleEntrega(entrega: any) {
    console.log(entrega);

    this.entregaSeleccionada = entrega;
  }

  eliminarEntrega() {
    Swal.fire({
      title: '¿Quieres eliminar esta práctica/entrega?',
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
          text: 'Se eliminó la entrega',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        }).then((result) => {

          this.rankingService.eliminarEntregas(this.entregaSeleccionada).subscribe((val: any) => {
            if (val.resultado == 'ok') {
              window.location.reload();
            } else {
              console.log(val.mensaje);
            }
          });
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado la entrega', '', 'info');
      }
    });
  }

  puntuarEntrega() {
    let puntuacion: number = 0;
    
    Swal.fire({
      title: 'How old are you?',
      icon: 'question',
      input: 'range',
      inputLabel: 'Your age',
      inputValue: 25
    }).then((result) => {
      puntuacion = result.value;

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se puntuó la entrega con un ' + puntuacion.toString(),
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        }).then((result) => {
          console.log(puntuacion);

          this.entregaSeleccionada.puntuacion_entrega = puntuacion;

          this.rankingService.modificarEntrega(this.entregaSeleccionada).subscribe((val: any) => {
            console.log(val);
          });
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha puntuado la entrega', '', 'info');
      }
    });
  }

  eliminarAlumno(idAlumno: any) {
    console.log(idAlumno);

    Swal.fire({
      title: '¿Quieres quitar este alumno del ranking?',
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
          text: 'Se quitó al usuario del ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        }).then((result) => {

          this.rankingService.quitarAlumnoRanking(this.rankSeleccionado.id_rank, idAlumno).subscribe((val: any) => {
            if (val.resultado == 'ok') {
              window.location.reload();
            } else {
              console.log(val.mensaje);
            }
          });
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el ranking', '', 'info');
      }
    });
  }
}