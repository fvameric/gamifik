import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/identificacion/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/identificacion/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';
import { PruebasCrearRankingComponent } from './vistas/profesores/pruebas-crear-ranking/pruebas-crear-ranking.component';
import { AuthGuardService } from 'services/auth-guard.service';
import { RoleGuardService } from 'services/role-guard.service';
import { ModalComponent } from './vistas/profesores/modal/modal.component';
const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'dashboardprofesor', component: DashboardProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'registro', component: RegistroComponent },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuardService] },
  { path: 'footer', component: FooterComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'perfilprofesor', component: PerfilProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'pruebas-crear-ranking', component: PruebasCrearRankingComponent },
  { path: 'modal', component: ModalComponent }, 

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
  PruebasCrearRankingComponent,
  ModalComponent  
];
