import { Component, OnInit } from '@angular/core';
import { RankingService } from 'services/ranking.service';
import { UsersService } from 'services/users.service';
import { Ranking } from '../../../interfaces/Ranking';

@Component({
  selector: 'app-pruebas-crear-ranking',
  templateUrl: './pruebas-crear-ranking.component.html',
  styleUrls: ['./pruebas-crear-ranking.component.css'],
})
export class PruebasCrearRankingComponent implements OnInit {
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

  constructor(
    private usersService: UsersService,
    private rankService: RankingService
  ) {}

  ngOnInit(): void {
    this.usersService
      .obtenerAlumnos()
      .subscribe((val) => (this.listaAlumnos = val));
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
    console.log('nombre: ' + this.nombreRanking);
    console.log('alumnos seleccionados: ');

    //this.insertarAlumnosRanking();

    // this.codigoRanking = ""; rellenar con una string random de letras y números

    /*
    this.rankService.insertarAlumnoEnRanking(id_rank, id_alumno).subscribe((val: any) => {
      console.log(val);
    });
    */

    this.generaNss();
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
        console.log("subscribe"+val.data.id_rank);
        
      });
    });
  }

  insertarAlumnosRanking(id_rank:number) {
    for (let i = 0; i < this.selecAlumnos.length; i++) {
      let id_alumno:number = this.selecAlumnos[i];
      this.rankService.insertarAlumnoEnRanking(id_rank,id_alumno).subscribe((val:any) => {console.log(val);
      });
      console.log("id ranking"+id_rank);
      console.log("id alumno"+id_alumno);
      
      
      
      
    }
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



}
