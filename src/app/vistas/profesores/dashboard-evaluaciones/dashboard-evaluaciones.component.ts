import { Component, OnInit } from '@angular/core';
import { Profesor } from 'app/interfaces/Profesor';
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
    this.arrEvaluaciones = [];
    this.rankSeleccionado = rank;
    var ids = {
      id_profesor: this.datosProfesor.id_profe,
      id_ranking: rank.id_rank
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
          console.log(element);
          this.arrEvaluadores.push(element);
        }
      });
    });

    this.obtenerSkills();
  }

  obtenerSkills() {
    this.skills = this.skillService.getSkills();
  }

  ordenarFecha() {
    console.log(this.arrEvaluaciones);
    this.arrEvaluaciones.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
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
}
