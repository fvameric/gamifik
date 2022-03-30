import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { UsersService } from 'services/users.service';

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
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.getSavedRoute()) {
        this.router.navigateByUrl(this.authService.getSavedRoute()!.toString());
      }
    }
  }
}