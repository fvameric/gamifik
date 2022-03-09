import { Component, OnInit, Output } from '@angular/core';
import { Profesor } from '../../../interfaces/Profesor';
import { UsersService } from 'services/users.service';
import { FormBuilder } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
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

  // rankings
  rankings: any;
  rankingsConProfes: any;
  flagRanks: boolean = false;
  arrRankings: any[] = [];
  rankSeleccionado: any;
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
    this.datosProfesor = this.tokenService.getUser();
  }

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking().subscribe(val => this.rankings = val);
    this.rankingService.obtenerJoinRankingProfes().subscribe((val: any) => {
      this.rankingsConProfes = val;

      val.forEach((element: any) => {
        if (element.id_profe == this.datosProfesor.id_profe) {
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

 

  rankSelec(rankId: number) {
    this.listaAlumnos = [];
    this.rankSeleccionado = this.arrRankings.find(rank => rank.id_rank == rankId);

    this.rankingService.obtenerAlumnoPorRanking(this.rankSeleccionado.id_rank)
    .subscribe((val: any) => {
      this.listaAlumnos = val;
    });
  }

  eliminarRanking() {
    console.log(this.rankSeleccionado.id_rank);
    this.rankingService.eliminarRanking(this.rankSeleccionado.id_rank).subscribe((val: any) => {
      if (val.resultado == 'ok') {
        window.location.reload();
      } else {
        console.log(val.mensaje);
      }
    });
  }
}
