import { Component, OnInit } from '@angular/core';
import { Profesor } from 'app/interfaces/Profesor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EvaluacionService } from 'services/evaluacion.service';
import { RankingService } from 'services/ranking.service';
import { SkillService } from 'services/skill.service';
import { TokenService } from 'services/token.service';

@Component({
  selector: 'app-dashboard-evaluaciones',
  templateUrl: './dashboard-evaluaciones.component.html',
  styleUrls: ['./dashboard-evaluaciones.component.css']
})
export class DashboardEvaluacionesComponent implements OnInit {

  private subject = new Subject();

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
  
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
  rankings: any;
  rankingsConProfes: any;

  // evaluaciones
  evaluaciones: any;
  arrEvaluaciones: any[] = [];
  arrAlumnos: any[] = [];
  arrEvaluadores: any[] = [];
  filteredArray: any[] = [];

  // skills
  skills: any;
  filtrado: boolean = false;

  sel: any;
  selEvaluador: any;

  // dates
  dt: Date = new Date;
  dt2: Date = new Date;

  constructor(
    private rankingService: RankingService,
    private tokenService: TokenService,
    private evaluacionService: EvaluacionService,
    private skillService: SkillService) { }

  ngOnInit(): void {
    this.obtenerDatos()
    this.obtenerDatosRanking();
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

  rankSelec(rank: any) {
    this.filtrado = false;
    this.rankSeleccionado = rank;
    this.obtenerDatosRankSelec();
  }

  obtenerDatosRankSelec() {
    this.arrEvaluaciones = [];

    var ids = {
      id_profesor: this.datosProfesor.id_profe,
      id_ranking: this.rankSeleccionado.id_rank
    }
    this.evaluacionService.obtenerEvalProfesorId(ids).subscribe(val => {
      console.log(val);
      this.evaluaciones = val;

      this.evaluaciones.data.forEach((element: any) => {
        this.arrEvaluaciones.push(element);

        if (!this.arrAlumnos.find(x => x.id_alumno == element.id_alumno)) {
          this.arrAlumnos.push(element);
        }

        if (!this.arrEvaluadores.find(x => x.id_evaluador == element.id_evaluador)) {
          console.log("push");
          this.arrEvaluadores.push(element);
        }
      });
    });

    this.obtenerSkills();
  }

  obtenerSkills() {
    this.skills = this.skillService.getSkills();
  }

  filtrarSkill(skill: any) {
    this.filtrado = true;
    this.filteredArray = this.arrEvaluaciones.filter(f => f.id_skill == skill.id_skill);
  }

  restaurar() {
    this.filtrado = false;
  }

  onChange() {
    
    if (this.sel == '') {
      this.filtrado = false;
    } else {
      this.filtrado = true;
    }
    this.filteredArray = this.arrEvaluaciones.filter(f => f.id_alumno == this.sel);
  }

  onChangeEvaluador() {
    
    console.log(this.selEvaluador);
    
    if (this.sel == '') {
      this.filtrado = false;
    } else {
      this.filtrado = true;
    }
    this.filteredArray = this.arrEvaluaciones.filter(f => f.id_evaluador == this.selEvaluador);
  }

  eliminarEval(evaluacion: any) {
    console.log(evaluacion);
    this.evaluacionService.eliminarEvaluacion(evaluacion.id_evaluacion)
    .pipe(
      takeUntil(this.subject)
    ).subscribe((val:any) => {
      console.log(val);
      this.obtenerDatosRankSelec();
    });
  }

  onChangeDate() {
    this.filtrado = true;
    console.log(this.dt);
    this.filteredArray = this.arrEvaluaciones.filter(f => (f.fecha >= this.dt && f.fecha <= this.dt2));
    console.log(this.filteredArray);
  }

  onChangeDate2() {
    this.filtrado = true;
    console.log(this.dt2);
    this.filteredArray = this.arrEvaluaciones.filter(f => (f.fecha >= this.dt && f.fecha <= this.dt2));
    console.log(this.filteredArray);
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
