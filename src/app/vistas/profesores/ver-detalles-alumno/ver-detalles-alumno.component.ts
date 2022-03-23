import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-detalles-alumno',
  templateUrl: './ver-detalles-alumno.component.html',
  styleUrls: ['./ver-detalles-alumno.component.css']
})
export class VerDetallesAlumnoComponent implements OnInit {

  @Input() alumnoDetalle: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
