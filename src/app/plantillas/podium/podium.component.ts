import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {

  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: ''
  };

  constructor() { }

  ngOnInit() {
    console.log(this.datosAlumno);
    
  }

}
