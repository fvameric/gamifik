import { Component, OnInit } from '@angular/core';
import { UsersService } from 'services/users.service';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  
  alumnos: any;
  profesores: any;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getSavedRoute()) {
      this.router.navigate([this.authService.getSavedRoute()]);
    }
  }
}