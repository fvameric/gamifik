import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Profesor } from '../../../interfaces/Profesor';
import { UsersService } from 'services/users.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearRankingComponent } from '../crear-ranking/crear-ranking.component';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.css'],
})
export class DashboardProfesorComponent implements OnInit {

  private subject = new Subject();

  testpunts: any;

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
  alumnoSelec: any;
  rankingSelec: number = 0;
  buscadorInput!: FormGroup;

  // rankings
  rankings: any;
  rankingsConProfes: any;
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  rankDesplegable: any;
  listaAlumnos: any[] = [];
  listaAlumnosPendientes: any[] = [];
  listaAlumnosEntregas: any[] = [];

  templateFlag: boolean = false;

  flagDesplegable: boolean = false;
  indice: number = 0;
  indiceRank: number = 0;
  indiceEntrega: number = 0;

  // entregas
  entregas: any;
  arrEntregas: any[] = [];
  entregaSeleccionada: any;
  flagEntregas: boolean = false;
  puntuacionAlumno: string = '';

  antiguaId: number = 0;

  //documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    private elem: ElementRef,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("test");

    this.obtenerDatos();
    this.obtenerDatosRanking();
    this.obtenerDatosEntregas();
    this.crearformInput();

    this.authService.guardarRoute(this.router.url);
  }


  obtenerDatos() {
    this.datosProfesor = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking()
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val) => (this.rankings = val));

    this.rankingService.obtenerJoinRankingProfes()
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val: any) => {
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
    this.rankingService.obtenerEntregas()
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val) => (this.entregas = val));
  }

  rankSelec(rank: any, index: number) {
    // ranks
    this.rankSeleccionado = rank;

    let btnRanks = this.elem.nativeElement.querySelectorAll(
      '.button-ranking-class'
    );
    btnRanks[index].setAttribute('style', 'background-color: #1292f8;');
    btnRanks[this.indiceRank].setAttribute(
      'style',
      'background-color: transparent;'
    );
    if (index == this.indiceRank) {
      btnRanks[index].setAttribute('style', 'background-color: #1292f8;');
    }

    this.obtenerAlumnosRank();

    this.templateFlag = true;
    this.indiceRank = index;
    this.rankDesplegable = rank;

    // entregas
    let arrows = this.elem.nativeElement.querySelectorAll('.svgArrow');
    var oldIndex: number = this.indice;
    this.indice = index;

    if (index == oldIndex) {
      if (this.flagDesplegable) {
        this.flagDesplegable = false;
        arrows[index].setAttribute('style', 'transform: rotate(0deg);');
      } else {
        this.flagDesplegable = true;
        arrows[index].setAttribute('style', 'transform: rotate(90deg);');
      }
    } else {
      this.flagDesplegable = true;
      arrows[oldIndex].setAttribute('style', 'transform: rotate(0deg);');
      arrows[index].setAttribute('style', 'transform: rotate(90deg);');
    }

    this.obtenerEntregasRank();
  }

  obtenerAlumnosRank() {
    this.listaAlumnos = [];
    this.listaAlumnosPendientes = [];

    this.rankingService.obtenerAlumnoPorRanking(this.rankSeleccionado.id_rank)
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val: any) => {
        if (val != null) {
          val.forEach((element: any) => {
            if (element.aceptado == 1) {
              this.listaAlumnos.push(element);
            } else {
              this.listaAlumnosPendientes.push(element);
            }
          });
        }
      });
  }

  obtenerEntregasRank() {
    this.arrEntregas = [];
    this.rankingService.obtenerEntregas()
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val) => {
        this.entregas = val;

        // b??squeda de entregas por ranking
        if (this.entregas != null || this.entregas != undefined) {
          this.entregas.forEach((element: any) => {
            if (element.id_rank == this.rankDesplegable.id_rank) {
              this.arrEntregas.push(element);
            }
          });

          if (this.arrEntregas.length > 0) {
            this.flagEntregas = false;
          } else {
            this.flagEntregas = true;
          }
        } else {
          this.flagEntregas = true;
        }
      });
  }

  generarCodRank() {
    let nuevoCod = this.generaNss();

    if (this.rankings != null || this.rankings != undefined) {
      nuevoCod = this.validarCodigoRepetido(nuevoCod);
    }

    this.rankSeleccionado.cod_rank = nuevoCod;

    this.rankingService.modificarRanking(this.rankSeleccionado)
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val: any) => {
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

  async inputBorrarRanking() {
    const { value: test } = await Swal.fire({
      icon: 'info',
      title: 'Borrar Ranking',
      input: 'text',
      inputLabel:
        'Porfavor Escriba ' +
        this.rankSeleccionado.nom_rank +
        ' para poder borrar el ranking.',
      inputPlaceholder: 'Escribe algo',
      confirmButtonColor: '#56baed',
      showCancelButton: true,
    });
    if (test) {
      if (test == this.rankSeleccionado.nom_rank) {
        Swal.fire({
          icon: 'success',
          title: 'Se elimin?? el ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.rankingService
            .eliminarRanking(this.rankSeleccionado.id_rank)
            .pipe(
              takeUntil(this.subject)
            )
            .subscribe((val: any) => {
              if (val.resultado == 'ok') {
                this.obtenerDatosRanking();
              } else {
                console.log(val.mensaje);
              }
            });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: 'No se ha eliminado el ranking, escriba bien el nombre del ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    }
  }

  mostrarDesplegable(alumno: any) {
    this.alumnoSelec = alumno;

    if (this.antiguaId == alumno.id_alumno) {
      if (this.mostrarDesplegableVisual) {
        this.mostrarDesplegableVisual = false;
      } else {
        this.mostrarDesplegableVisual = true;
      }
    } else {
      this.mostrarDesplegableVisual = true;
    }

    this.antiguaId = alumno.id_alumno;
  }

  detalleEntrega(entrega: any) {
    this.listaAlumnosEntregas = [];
    this.templateFlag = false;

    this.entregaSeleccionada = entrega;

    this.rankingService
      .obtenerAlumnoPorRankingApellido(entrega.id_rank)
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val: any) => {
        if (val != null) {
          val.forEach((element: any) => {
            if (
              element.aceptado == 1 &&
              element.id_entrega == entrega.id_entrega
            ) {
              this.listaAlumnosEntregas.push(element);
            }
          });
        }
      });
  }

  async inputeliminarEntrega() {
    const { value: test } = await Swal.fire({
      icon: 'info',
      title: 'Borrar Entrega/Pactica',
      input: 'text',
      inputLabel:
        'Porfavor Escriba ' +
        this.entregaSeleccionada.nom_entrega +
        ' para poder borrar una Entrega/Pactica.',
      inputPlaceholder: 'Escribe algo',
      confirmButtonColor: '#56baed',
      showCancelButton: true,
    });
    if (test) {
      if (test == this.entregaSeleccionada.nom_entrega) {
        Swal.fire({
          icon: 'success',
          title: 'Se elimin?? la Entrega/Pactica',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.rankingService
            .eliminarEntregas(this.entregaSeleccionada)
            .pipe(
              takeUntil(this.subject)
            )
            .subscribe((val: any) => {
              if (val.resultado == 'ok') {
                this.obtenerEntregasRank();
              } else {
                console.log(val.mensaje);
              }
            });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: 'No se ha eliminado la entrega, escriba bien el nombre del ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    }
  }

  eliminarAlumno(alumno: any) {
    Swal.fire({
      title: '??Quieres quitar este alumno del ranking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S??',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se quit?? al usuario del ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.rankingService.quitarAlumnoRanking(this.rankSeleccionado.id_rank, alumno.id_alumno)
            .pipe(
              takeUntil(this.subject)
            )
            .subscribe((val: any) => {
              if (val.resultado == 'ok') {
                this.obtenerAlumnosRank();
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

  editarPuntuacionAlumno(alumno: any) {
    var puntuacionAlumno: number = 0;

    Swal.fire({
      title: 'Puntuaci??n del alumno',
      icon: 'question',
      input: 'range',
      inputLabel: 'Puntuaci??n',
      inputValue: alumno.puntuacion_entrega,
    }).then((result) => {
      puntuacionAlumno = result.value;

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se puntu?? al alumno con un ' + puntuacionAlumno.toString(),
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          alumno.puntuacion = puntuacionAlumno;

          this.listaAlumnosEntregas.forEach((element) => {
            if (element.id_alumno == alumno.id_alumno) {
              element.puntuacion_entrega = puntuacionAlumno;
              this.rankingService
                .modificarRankAlumnos(element)
                .pipe(
                  takeUntil(this.subject)
                )
                .subscribe((val: any) => {
                  console.log(val);
                });
            }
          });
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha puntuado la entrega', '', 'info');
      }
    });
  }

  aceptarPendientes(pendiente: any) {
    console.log("entra en pendientes");
    pendiente.aceptado = 1;
    this.rankingService
      .aceptarAlumnosPendientes(pendiente)
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val) => this.insertarAlumnosJoin(pendiente, val));
  }

  insertarAlumnosJoin(pendiente: any, val: any) {
    var arrPendientes: any = [];

    if (val.resultado == 'ok') {
      this.entregas.forEach((element: any) => {
        if (element.id_rank == pendiente.id_rank) {
          var ids = {
            id_rank: pendiente.id_rank,
            id_entrega: element.id_entrega,
            id_alumno: pendiente.id_alumno,
          };
          arrPendientes.push(ids);
        }
      });

      if (arrPendientes.length != 0) {
        this.rankingService
          .insertarEntregaJoin(arrPendientes)
          .pipe(
            takeUntil(this.subject)
          )
          .subscribe((val) => this.resultadoInsert(val));
      } else {
        this.resultadoInsert(val);
      }
    }
  }

  resultadoInsert(val: any) {
    if (val.resultado == 'ok') {
      this.obtenerAlumnosRank();
    } else {
      console.log(val);
    }
  }

  editarPuntuacion(alumno: any) {
    console.log(alumno);
    var flagInvalid: boolean = false;

    var arrPuntos = document.querySelectorAll('.puntos');
    arrPuntos.forEach((puntos) => {
      var puntuacion = parseInt((puntos as HTMLInputElement).value);

      if (puntuacion > 100 || puntuacion < 0) {
        flagInvalid = true;
      }
    });

    if (flagInvalid) {
      console.log('No valido');
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido puntuar al alumno',
        text: '??Puntuaci??n incorrecta, debes escribir un numero entre el 0 y el 100!',
      });
    } else {
      for (var i = 0; i < arrPuntos.length; i++) {
        this.listaAlumnosEntregas[i].puntuacion_entrega = (<HTMLInputElement>(
          arrPuntos[i]
        )).value;
      }

      this.listaAlumnosEntregas.forEach((element) => {
        console.log(element);

        this.rankingService
          .modificarRankAlumnos(element)
          .pipe(
            takeUntil(this.subject)
          )
          .subscribe((val: any) => {
            console.log(val);
          });
      });
    }
  }

  denegarPendientes(pendiente: any) {
    var index = this.listaAlumnosPendientes.findIndex(x => x.id_alumno === pendiente.id_alumno);
    this.listaAlumnosPendientes.splice(index,1)
    
    this.rankingService
      .eliminarAlumnosPendientes(pendiente)
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((val: any) => {
        console.log(val);
      });
  }

  // modals
  abrirModal(idModal: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.idModal = idModal;
    modalRef.componentInstance.rankSelec = this.rankSeleccionado;
    modalRef.componentInstance.alumnosRank = this.listaAlumnos;
    modalRef.componentInstance.entregaSelec = this.entregaSeleccionada;
    modalRef.componentInstance.alumnoDetalle = this.alumnoSelec;
  }

  //buscador
  filtro: any;
  entregasPracticasBuscar: any;
  splitArray: any;
  i: any;
  textoBuscador: any;
  imputBuscador: any = undefined;

  crearformInput() {
    this.buscadorInput = this.formBuilder.group({
      nombreBuscador: [''],
    });
  }

  get nombreBuscador() {
    return this.buscadorInput.get('nombreBuscador') as FormControl;
  }

  buscador(): any {
    this.nombreBuscador.valueChanges.subscribe((nombreBuscador) => {
      this.imputBuscador = document.getElementById('buscadorId');
      this.filtro = nombreBuscador.toUpperCase();
      this.entregasPracticasBuscar =
        document.getElementsByClassName('btn-entrega');

      for (this.i = 0; this.i < this.entregasPracticasBuscar.length; this.i++) {
        var text = this.entregasPracticasBuscar[this.i].innerText.split('\n');
        if (text[0].toUpperCase().indexOf(this.filtro) > -1) {
          this.entregasPracticasBuscar[this.i].style.display = '';
        } else {
          this.entregasPracticasBuscar[this.i].style.display = 'none';
        }
      }
    });
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }
}
