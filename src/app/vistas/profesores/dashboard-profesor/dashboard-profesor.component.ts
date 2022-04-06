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

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.css'],
})
export class DashboardProfesorComponent implements OnInit {
  //@ViewChildren('toggleButton') toggleBtn: ElementRef | undefined;
  //@ViewChildren('despVisual') despVisual: ElementRef | undefined

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

  loaded = false;

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

  antiguaId: number = 0;

  //documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    private elem: ElementRef,
    private authService:AuthService,
    private router: Router
  ) { }

  /*
@HostListener('document:click', ['$event'])
documentClick(event: any): void {
  this.documentClickedTarget.next(event.target);
}
*/

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
    this.obtenerDatosEntregas();
    this.crearformInput();
    setInterval(() => {
      this.loaded = true;
    }, 6000);

    this.authService.guardarRoute(this.router.url);

    //this.documentClickedTarget.subscribe(val => this.documentClickListener(val));
  }

  /*
  documentClickListener(target: any): void {
    console.log(target);
    
    if (this.toggleBtn?.nativeElement.contains(target) || this.despVisual?.nativeElement.contains(target)) {
      console.log("entra");
    } else {
      console.log("no entra");
      this.mostrarDesplegableVisual = false;
    }
 }
 */

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
    this.rankingService
      .obtenerEntregas()
      .subscribe((val) => (this.entregas = val));
  }

  rankSelec(rank: any, index: number) {
    this.rankSeleccionado = rank;

    let btnRanks = this.elem.nativeElement.querySelectorAll(
      '.button-ranking-class'
    );
    btnRanks[index].setAttribute('style', 'background-color: #56baed;');
    btnRanks[this.indiceRank].setAttribute(
      'style',
      'background-color: transparent;'
    );
    if (index == this.indiceRank) {
      btnRanks[index].setAttribute('style', 'background-color: #56baed;');
    }
    this.indiceRank = index;
    this.templateFlag = true;
    this.listaAlumnos = [];
    this.listaAlumnosPendientes = [];
    this.rankingService
      .obtenerAlumnoPorRanking(this.rankSeleccionado.id_rank)
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

    let arrows = this.elem.nativeElement.querySelectorAll('.svgArrow');

    var oldIndex: number = this.indice;
    this.arrEntregas = [];
    this.indice = index;
    this.rankDesplegable = rank;

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

    this.flagEntregas = false;

    // búsqueda de entregas por ranking
    this.entregas.forEach((element: any) => {
      if (element.id_rank == this.rankDesplegable.id_rank) {
        this.arrEntregas.push(element);
      }
    });

    if (this.arrEntregas.length == 0) {
      this.flagEntregas = true;
    }
  }

  generarCodRank() {
    let nuevoCod = this.generaNss();

    if (this.rankings != null || this.rankings != undefined) {
      nuevoCod = this.validarCodigoRepetido(nuevoCod);
    }

    this.rankSeleccionado.cod_rank = nuevoCod;

    this.rankingService
      .modificarRanking(this.rankSeleccionado)
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

  eliminarRanking() {
    console.log(this.rankSeleccionado.id_rank);

    Swal.fire({
      title: '¿Quieres eliminar el ranking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¿Realmente quieres eliminar el ranking?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Ok',
              text: 'Se eliminó el ranking',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
            }).then((result) => {
              this.rankingService
                .eliminarRanking(this.rankSeleccionado.id_rank)
                .subscribe((val: any) => {
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

  /*
  mostrarDesplegablePractica(index: number, rank: any) {
    let arrows = this.elem.nativeElement.querySelectorAll('.svgArrow');

    var oldIndex: number = this.indice;
    this.arrEntregas = [];
    this.indice = index;
    this.rankDesplegable = rank;

    if (index == oldIndex) {
      if (this.flagDesplegable) {
        this.flagDesplegable = false;
        arrows[index].setAttribute("style", "transform: rotate(0deg);");
      } else {
        this.flagDesplegable = true;
        arrows[index].setAttribute("style", "transform: rotate(90deg);");
      }
    } else {
      this.flagDesplegable = true;
      arrows[oldIndex].setAttribute("style", "transform: rotate(0deg);");
      arrows[index].setAttribute("style", "transform: rotate(90deg);");
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
  */

  detalleEntrega(entrega: any) {
    this.listaAlumnosEntregas = [];
    this.templateFlag = false;

    this.entregaSeleccionada = entrega;

    this.rankingService
      .obtenerAlumnoPorRankingApellido(entrega.id_rank)
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

  eliminarEntrega() {
    Swal.fire({
      title: '¿Quieres eliminar esta entrega?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se eliminó la entrega',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.rankingService
            .eliminarEntregas(this.entregaSeleccionada)
            .subscribe((val: any) => {
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

  eliminarAlumno(alumno: any) {
    Swal.fire({
      title: '¿Quieres quitar este alumno del ranking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se quitó al usuario del ranking',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.rankingService
            .quitarAlumnoRanking(
              this.rankSeleccionado.id_rank,
              alumno.id_alumno
            )
            .subscribe((val: any) => {
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

  editarPuntuacionAlumno(alumno: any) {
    var puntuacionAlumno: number = 0;

    Swal.fire({
      title: 'Puntuación del alumno',
      icon: 'question',
      input: 'range',
      inputLabel: 'Puntuación',
      inputValue: alumno.puntuacion_entrega,
    }).then((result) => {
      puntuacionAlumno = result.value;

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Se puntuó al alumno con un ' + puntuacionAlumno.toString(),
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          alumno.puntuacion = puntuacionAlumno;

          this.listaAlumnosEntregas.forEach((element) => {
            if (element.id_alumno == alumno.id_alumno) {
              element.puntuacion_entrega = puntuacionAlumno;
              this.rankingService
                .modificarRankAlumnos(element)
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
    pendiente.aceptado = 1;
    this.rankingService.aceptarAlumnosPendientes(pendiente).subscribe(val => this.insertarAlumnosJoin(pendiente, val));
  }

  insertarAlumnosJoin(pendiente: any, val: any) {
    var arrPendientes: any = [];
    
    if (val.resultado == 'ok') {
      this.entregas.forEach((element: any) => {
        if (element.id_rank == pendiente.id_rank) {
          var ids = {
            "id_rank": pendiente.id_rank,
            "id_entrega": element.id_entrega,
            "id_alumno": pendiente.id_alumno
          }
          arrPendientes.push(ids);
        }
      });
    }
    this.rankingService.insertarEntregaJoin(arrPendientes).subscribe(val => this.resultadoInsert(val));
  }

  resultadoInsert(val: any) {
    if (val.resultado == 'ok') {
      window.location.reload();
    } else {
      console.log(val);
    }
  }

  denegarPendientes(pendiente: any) {
    this.rankingService
      .eliminarAlumnosPendientes(pendiente)
      .subscribe((val: any) => {
        console.log(val);
        window.location.reload();
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
    })
  }

  get nombreBuscador() {
    return this.buscadorInput.get('nombreBuscador') as FormControl;
  }


  buscador(): any {

    this.nombreBuscador.valueChanges.subscribe((nombreBuscador) => {

      this.imputBuscador = document.getElementById('buscadorId');
      this.filtro = nombreBuscador.toUpperCase();
      this.entregasPracticasBuscar = document.getElementsByClassName('btn-entrega');

      for (this.i = 0; this.i < this.entregasPracticasBuscar.length; this.i++) {
        var text = this.entregasPracticasBuscar[this.i].innerText.split("\n");
        if (text[0].toUpperCase().indexOf(this.filtro) > -1) {
          this.entregasPracticasBuscar[this.i].style.display = "";
        } else {
          this.entregasPracticasBuscar[this.i].style.display = "none";
        }

      }
    })
  }
}