import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identificacion-profesores',
  templateUrl: './identificacion-profesores.component.html',
  styleUrls: ['./identificacion-profesores.component.css']
})
export class IdentificacionProfesoresComponent implements OnInit {

  // input para acceder como profesor
  passAcceso: string = '';
  accesoProfe: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  accesoProfes(){
    if (this.passAcceso == '12') {
      this.accesoProfe = true;
    }
  }

}
