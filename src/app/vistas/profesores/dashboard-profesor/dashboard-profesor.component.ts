import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';
import { Profesor } from 'app/interfaces/Profesor';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.css']
})
export class DashboardProfesorComponent implements OnInit {
  profesores: any;
  alumnos: any;

  perfil: Profesor = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0
  }

  constructor(private controladorService: ControladorService, private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProfesor();
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

  obtenerProfesor() {
    this.perfil = this.controladorService.obtenerPerfilProfesor();
  }
}
