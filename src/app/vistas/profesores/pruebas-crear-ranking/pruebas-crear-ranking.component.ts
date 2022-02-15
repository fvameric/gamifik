import { Component, OnInit } from '@angular/core';
import { RankingService } from 'services/ranking.service';
import { UsersService } from 'services/users.service';

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
    this.selecAlumnos.forEach((alumno) => {
      //console.log(alumno);
    });

    //this.insertarAlumnosRanking();
    let codigoRandom=this.generaNss();
    console.log(codigoRandom);
    
    
    
    // this.codigoRanking = ""; rellenar con una string random de letras y números
    
    /*
    this.rankService.insertarAlumnoEnRanking(id_rank, id_alumno).subscribe((val: any) => {
      console.log(val);
    });
    */
  }

  insertarAlumnosRanking() {
    for (let i = 0; i < this.selecAlumnos.length; i++) {
      const id = this.selecAlumnos[i];

      //console.log(id);
    }
  }

  generaNss() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
