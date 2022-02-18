import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // en caso de loguearse como alumno y querer acceder a componetes de profesores
    if (route.routeConfig?.path == 'perfilprofesor' && this.authService.userRole() == 0) {
      this.router.navigate(['perfil']);
      return false;
    }
    if (route.routeConfig?.path == 'dashboardprofesor' && this.authService.userRole() == 0) {
      this.router.navigate(['dashboard']);
      return false;
    }
    
    // en caso de ser profesor y querer acceder a componentes de alumnos
    if (route.routeConfig?.path == 'perfil' && this.authService.userRole() == 1) {
      this.router.navigate(['perfilprofesor']);
      return false;
    }
    if (route.routeConfig?.path == 'dashboard' && this.authService.userRole() == 1) {
      this.router.navigate(['dashboardprofesor']);
      return false;
    }
    return true;
  }
}