import { Component, OnInit } from '@angular/core';
import { Profesor } from 'app/interfaces/Profesor';
import { ControladorService } from 'services/controlador.service';
@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  perfil: Profesor = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0
  }

  constructor(private controladorService: ControladorService) { }

  ngOnInit(): void {
    this.obtenerProfesor();
  }

  obtenerProfesor() {
    this.perfil = this.controladorService.obtenerPerfilProfesor();
  }

}
