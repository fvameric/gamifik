import { Component, Input, OnInit } from '@angular/core';
import { Evaluacion } from 'app/interfaces/Evaluacion';
import { EvaluacionService } from 'services/evaluacion.service';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  @Input() skillSelec: any;
  @Input() alumnoSelec: any;
  @Input() datosRanking: any;

  datosAlumno: any;
  puntosInput: number = 0;
  profesorRank: any;

  constructor(private evaluacionService: EvaluacionService, private rankingService: RankingService ,private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosAlumno = this.tokenService.getUser();
    console.log(this.datosAlumno);
    
  }

  onSubmit() {
    const evaluacion: Evaluacion = {
      id_alumno: this.alumnoSelec.id_alumno,
      id_evaluador: this.datosAlumno.id_alumno,
      id_profesor: 0,
      id_ranking: this.datosRanking.id_rank,
      id_skill: this.skillSelec.id_skill,
      puntos: this.puntosInput,
      fecha: new Date()
    }
    this.rankingService.obtenerProfeRankId(this.datosRanking.id_rank).subscribe(val => {
      this.profesorRank = val;
      evaluacion.id_profesor = this.profesorRank[0].id_profe;
      console.log(evaluacion);

      this.evaluacionService.insertarEvaluacion(evaluacion).subscribe(val => {
        console.log(val);
        window.location.reload();
      });
    });
  }

}
