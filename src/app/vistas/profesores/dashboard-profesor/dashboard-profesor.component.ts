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
                  window.location.reload();
                } else {
                  console.log(val.mensaje);
                }
              });
            });
          } else if (result.isDenied) {
            Swal.fire('No se ha eliminado el ranking', '', 'info')
          }
        });
      }
    });
  }
}
