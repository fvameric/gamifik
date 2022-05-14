import { Component, Input, OnInit } from '@angular/core';
import { Evaluacion } from 'app/interfaces/Evaluacion';
import { EvaluacionService } from 'services/evaluacion.service';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/auth/token.service';
import Swal from 'sweetalert2';

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
  puntos_semanales: number = 0;
  puntosInput: number = 0;
  profesorRank: any;
  puntosError: boolean = false;

  constructor(
    private evaluacionService: EvaluacionService,
    private rankingService: RankingService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosAlumno = this.tokenService.getUser();
    console.log(this.datosAlumno);
    this.evaluacionService.getPuntosSemanales(this.datosAlumno.id_alumno).subscribe(val => {
      let puntos:any = val;
      this.puntos_semanales = puntos.data.puntos_semanales;
      console.log(this.puntos_semanales);
    });

  }

  onSubmit() {
    this.puntosError = false;
    if (this.puntosInput <= 0) {
      this.puntosError = true;
    } else {
      if (this.puntosInput > this.datosAlumno.puntos_semanales) {
        this.puntosInput = this.datosAlumno.puntos_semanales;
      }
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
  
        this.evaluacionService.insertarEvaluacion(evaluacion).subscribe(val => {
          console.log(val);
          window.location.reload();
        });
      });
    }

    console.log(this.puntosError);
    
  }

}
