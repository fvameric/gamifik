import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from 'app/interfaces/Alumno';

@Component({
  selector: 'app-modal-perfil-alumno',
  templateUrl: './modal-perfil-alumno.component.html',
  styleUrls: ['./modal-perfil-alumno.component.css']
})
export class ModalPerfilAlumnoComponent implements OnInit {
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

  @Input() alumnoDetalle: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  enviar(modal:any){
    this.modalService.open(modal); 
  }

  retornar(){
    this.modalService.dismissAll();
  }
  
  onSubmit(){
    this.modalService.dismissAll();
  }
}
