import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { ControladorService } from 'services/controlador.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: Alumno = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date,
    tipo: 0
  }

  constructor(private controladorService: ControladorService) { }

  ngOnInit(): void {
    this.obtenerAlumno();
  }

  obtenerAlumno() {
    this.perfil = this.controladorService.datosAlumno;
    /*
    this.controladorService.obtenerDatosAlumno()
      .subscribe((datos: any) => {
        datos.forEach((element: any) => {
          this.perfil.id = element.id;
          this.perfil.nick = element.nick;
          this.perfil.email = element.email;
          this.perfil.pass = element.pass;
          this.perfil.nombre = element.nombre;
          this.perfil.apellidos = element.apellidos;
          this.perfil.fecha_nacimiento = element.fecha_nacimiento;
        });
      });
      */
  }

}
