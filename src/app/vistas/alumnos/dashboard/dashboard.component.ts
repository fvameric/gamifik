import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';
import { Alumno } from 'app/interfaces/Alumno';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profesores: any;
  alumnos: any;

  perfil: Alumno = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date
  }
  
  constructor(private controladorService: ControladorService, private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerAlumno();
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.controladorService.obtenerDatosProfesor().subscribe(
      datos => this.profesores = datos
    );

    this.controladorService.obtenerDatosAlumno().subscribe(
      datos => this.alumnos = datos
    );
  }

  obtenerAlumno() {
    this.perfil = this.controladorService.obtenerPerfilAlumno();
  }
}
