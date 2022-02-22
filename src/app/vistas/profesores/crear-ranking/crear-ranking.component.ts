import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from 'services/ranking.service';
import { TokenService } from 'services/token.service';
import { UsersService } from 'services/users.service';
import { Ranking } from '../../../interfaces/Ranking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-ranking',
  templateUrl: './crear-ranking.component.html',
  styleUrls: ['./crear-ranking.component.css']
})
export class CrearRankingComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  nombreRanking: string = '';
  listaAlumnos: any;
  selecAlumnos: any[] = [];
  codigoRanking: string = 'Random string';
  rankCodes: any;
  ranking: Ranking = {
    id_rank: 0,
    nom_rank: '',
    alumnos: 0,
    cod_rank: '',
  };

  profeLogin: any;

  constructor(
    private usersService: UsersService,
    private rankService: RankingService,
    private tokenService: TokenService,
    private router: Router,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.usersService
      .obtenerAlumnos()
      .subscribe((val) => (this.listaAlumnos = val));
  }

  obtenerDatosProfesor() {
    this.profeLogin = this.tokenService.getUser();
  }

  checkboxAlumnos(event: any) {
    if (event.target.checked) {
      this.selecAlumnos.push(event.target.value);
    } else {
      this.selecAlumnos.splice(
        this.selecAlumnos.indexOf(event.target.value),
        1
      );
    }
  }

  onSubmit() {

    //this.insertarAlumnosRanking();

    // this.codigoRanking = ""; rellenar con una string random de letras y números

    /*
    this.rankService.insertarAlumnoEnRanking(id_rank, id_alumno).subscribe((val: any) => {
      console.log(val);
    });
    */

    this.generaNss();
    this.modalService.dismissAll();
  }

  //Funcion que genera el codigo
  generaNss() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.comprobarCodigo(result);
  }

  //Función que comprueba el codigo
  comprobarCodigo(codigo: string) {
    this.codigoRanking = codigo;
    this.rankService.obtenerRanking().subscribe((val: any) => {
      this.rankCodes = val;

      this.rankCodes.forEach((element: any) => {
        if (element.cod_rank != codigo) {

          this.ranking.alumnos = 0;
          this.ranking.nom_rank = this.nombreRanking;
          this.ranking.cod_rank = codigo;
        } else {
          this.generaNss();
        }
      });
      this.rankService.insertarRanking(this.ranking).subscribe((val: any) => {

        //this.insertarAlumnosRanking(val.data.id_rank);
        this.insertarAlumnosRanking(val.data.id_rank);
        this.insertarProfesorRanking(val.data.id_rank);
      });
    });
  }

  insertarAlumnosRanking(id_rank: number) {
    for (let i = 0; i < this.selecAlumnos.length; i++) {
      let id_alumno: number = this.selecAlumnos[i];
      this.rankService.insertarAlumnoEnRanking(id_rank, id_alumno).subscribe((val: any) => {
        console.log(val);
      });
    }
  }

  insertarProfesorRanking(id_rank: number) {
    this.rankService.insertarProfeEnRanking(id_rank, this.profeLogin.id_profe).subscribe((val: any) => {
      console.log(val);
      window.location.reload();
    });
  }
}