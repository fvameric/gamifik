import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  accesoProfeFlag: boolean = false;
  passAcceso: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  accesoProfe() {
    if (this.passAcceso == "1234") {
      this.accesoProfeFlag = true;
    }
  }

  accesoAlumno() {
    this.accesoProfeFlag = false;
  }

}
