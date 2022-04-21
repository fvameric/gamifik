import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { UsersService } from 'services/users.service';
import { FormBuilder } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import Swal from 'sweetalert2';
import { TokenService } from 'services/token.service';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
import { SkillService } from 'services/skill.service';
import { ModalComponent } from 'app/vistas/profesores/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, interval, merge, Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Skill } from 'app/interfaces/Skill';
import { EvaluacionService } from 'services/evaluacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private subject = new Subject();

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

  // rankings
  rankings: any;
  rankingsConAlumnos: any;
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  listaAlumnos: any;

  flagPendiente: boolean = false;

  // skills
  skills: Skill[] = [];
  skillHover: Skill = {
    id_skill: 0,
    nombre: '',
    descripcion: '',
    niveles: {
      lvl1: 0,
      img1: '',
      lvl2: 0,
      img2: '',
      lvl3: 0,
      img3: ''
    }
  }
  skillSelec: any;
  showHover: boolean = false;
  skillDetails: boolean = false;
  alumnSelec: any;
  alumnHover: any;

  // evaluaciones
  evaluaciones: any;
  dataEval: any;
  evaluacionAlumno: any;

  constructor(
    private usersService: UsersService,
    private evaluacionService: EvaluacionService,
    private rankingService: RankingService,
    private tokenService: TokenService,
    private skillService: SkillService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDatosRanking();
    this.obtenerSkills();

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

  obtenerSkills() {
    this.skills = this.skillService.getSkills();
    //this.evaluaciones = this.evaluacionService.obtenerEval();
    console.log(this.skills);
    console.log(this.evaluaciones);
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

  abrirModal(idModal: number, alumnoSelec: any, skill: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.idModal = idModal;
    modalRef.componentInstance.skillSelec = skill;
    modalRef.componentInstance.datosAlumno = this.datosAlumno;
    modalRef.componentInstance.alumnoSelec = alumnoSelec;
    modalRef.componentInstance.datosRanking = this.rankSeleccionado;
  }

  over(alumno: any, skill: Skill) {
    this.alumnHover = alumno;
    console.log("over");
    this.showHover = true;
    this.skillHover = skill;
    var ids = {
      id_alumno: alumno.id_alumno,
      id_ranking: alumno.id_rank,
      id_skill: skill.id_skill,
    };
    console.log(ids);
    this.evaluacionService.obtenerEvalAlumnoRankIds(ids).subscribe(val => {
      this.dataEval = val;
      console.log(this.dataEval);
      if (this.dataEval.resultado == 'ok') {
        this.evaluacionAlumno = this.dataEval.data;
        
      }
    });
  }

  out() {
    this.evaluacionAlumno = undefined;
    console.log("out");
    this.showHover = false;
  }

  detalleSkills(alumno: any) {
    console.log(alumno);
    var lastAlumno = this.alumnSelec;
    this.alumnSelec = alumno;
    
    if (lastAlumno == this.alumnSelec && this.skillDetails == true) {
      this.skillDetails = false;
      lastAlumno = null;
    } else {
      this.skillDetails = true;
    }
  }
}
