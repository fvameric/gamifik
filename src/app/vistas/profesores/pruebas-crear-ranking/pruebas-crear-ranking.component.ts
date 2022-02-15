import { Component, OnInit } from '@angular/core';
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
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.obtenerAlumnos().subscribe(val => this.listaAlumnos = val);
  }

  checkboxAlumnos(event: any) {
    if (event.target.checked) {
      this.selecAlumnos.push(event.target.value);
    } else {
      this.selecAlumnos.splice(this.selecAlumnos.indexOf(event.target.value), 1);
    }
  }

  onSubmit() {
    console.log("nombre: " + this.nombreRanking);
    console.log("alumnos seleccionados: ");
    this.selecAlumnos.forEach(alumno => {
      console.log(alumno);
    });
    // this.codigoRanking = ""; rellenar con una string random de letras y números
  }
}
