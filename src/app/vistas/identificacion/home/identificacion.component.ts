import { Component, OnInit } from '@angular/core';
import { UsersService } from 'services/users.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  
  alumnos: any;
  profesores: any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }
}