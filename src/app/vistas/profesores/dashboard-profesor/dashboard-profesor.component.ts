import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';
import { Profesor } from 'app/interfaces/Profesor';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.css'],
})
export class DashboardProfesorComponent implements OnInit {
  profesores: any;
  alumnos: any;
  mostrarRankingsVisual: boolean = false;
  mostrarConfiguracionVisual: boolean = false;
  mostrarCerrarVisual: boolean = false;
  editableEmail: boolean = true;
  editableNombre: boolean = true;
  editableApellidos: boolean = true;

  perfil: Profesor = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
  };

  constructor(
    private controladorService: ControladorService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerProfesor();
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.controladorService
      .obtenerDatosProfesor()
      .subscribe((datos) => (this.profesores = datos));

    this.controladorService
      .obtenerDatosAlumno()
      .subscribe((datos) => (this.alumnos = datos));
  }

  obtenerProfesor() {
    this.perfil = this.controladorService.obtenerPerfilProfesor();
  }

  mostrarRankings() {
    if (this.mostrarRankingsVisual == false) {
      this.mostrarRankingsVisual = true;
      this.mostrarConfiguracionVisual = false;
      this.mostrarCerrarVisual = false;
    } else {
      this.mostrarRankingsVisual = false;
    }
  }

  mostrarConfiguracion() {
    if (this.mostrarConfiguracionVisual == false) {
      this.mostrarConfiguracionVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarCerrarVisual = false;
    } else {
      this.mostrarConfiguracionVisual = false;
    }
  }

  mostrarCerrar() {
    if (this.mostrarCerrarVisual == false) {
      this.mostrarCerrarVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarConfiguracionVisual = false;
    } else {
      this.mostrarCerrarVisual = false;
    }
  }

  editarEmail() {
    if (this.editableEmail == true) {
      this.editableEmail = false;
    } else {
      let valorInputNombre = (<HTMLInputElement>(
        document.getElementById('inputEmail')
      )).value;
      (<HTMLInputElement>document.getElementById('inputEmail')).value = '';
      this.editableEmail = true;
    }
  }

  editarNombre() {
    if (this.editableNombre == true) {
      this.editableNombre = false;
    } else {
      let valorInputNombre = (<HTMLInputElement>(
        document.getElementById('inputNombre')
      )).value;
      (<HTMLInputElement>document.getElementById('inputNombre')).value = '';
      this.editableNombre = true;
    }
  }

  editarApellidos() {
    if (this.editableApellidos == true) {
      this.editableApellidos = false;
    } else {
      let valorInputNombre = (<HTMLInputElement>(
        document.getElementById('inputApellidos')
      )).value;
      (<HTMLInputElement>document.getElementById('inputApellidos')).value = '';
      this.editableApellidos = true;
    }
  }
}
