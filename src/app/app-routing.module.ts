import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/identificacion/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/identificacion/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/home/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';
import { PruebasCrearRankingComponent } from './vistas/profesores/pruebas-crear-ranking/pruebas-crear-ranking.component';
import { AuthGuardService } from 'services/auth-guard.service';
import { RoleGuardService } from 'services/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'dashboardprofesor', component: DashboardProfesorComponent, canActivate: [AuthGuardService] },
  { path: 'registro', component: RegistroComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'perfilprofesor', component: PerfilProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'pruebas-crear-ranking', component: PruebasCrearRankingComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  IdentificacionComponent,
  LoginComponent,
  DashboardComponent,
  DashboardProfesorComponent,
  RegistroComponent,
  PerfilComponent,
  PerfilProfesorComponent,
  HeaderComponent,
  FooterComponent,
  PruebasCrearRankingComponent
];
