import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/identificacion/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';

import { AuthGuardService } from 'services/guards/auth-guard.service';
import { RoleGuardService } from 'services/guards/role-guard.service';
import { ModalComponent } from './vistas/profesores/modal/modal.component';
import { CrearRankingComponent } from './vistas/profesores/crear-ranking/crear-ranking.component';
import { ModalEntregaComponent } from './vistas/profesores/modal-entrega/modal-entrega.component';
import { ModalPerfilAlumnoComponent } from './vistas/profesores/modal-perfil-alumno/modal-perfil-alumno.component';
import { IdentificacionProfesoresComponent } from './vistas/identificacion/identificacion-profesores/identificacion-profesores.component';
import { PerfilPruebaComponent } from './vistas/alumnos/perfil-prueba/perfil-prueba.component';
import { ModalEditarRankingComponent } from './vistas/profesores/modal-editar-ranking/modal-editar-ranking.component';
import { DarkModeComponent } from './vistas/dark-mode/dark-mode.component';
import { PodiumComponent } from './plantillas/podium/podium.component';
import { LandingComponent } from './vistas/landing/landing.component';
import { DashboardEvaluacionesComponent } from './vistas/profesores/dashboard-evaluaciones/dashboard-evaluaciones.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'identificacion-profesores', component: IdentificacionProfesoresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'dashboardprofesor', component: DashboardProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'evaluaciones', component: DashboardEvaluacionesComponent },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuardService] },
  { path: 'footer', component: FooterComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'perfil-prueba', component: PerfilPruebaComponent},
  { path: 'perfilprofesor', component: PerfilProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'crear-ranking', component: CrearRankingComponent },
  { path: 'modal', component: ModalComponent }, 
  { path: 'modal-entrega', component: ModalEntregaComponent }, 
  { path: 'modal-perfil-alumno', component: ModalPerfilAlumnoComponent },
  { path: 'modal-editar-ranking', component: ModalEditarRankingComponent },
  { path: 'dark-mode', component: DarkModeComponent },
  { path: 'podium', component: PodiumComponent},
  { path: 'landing', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  IdentificacionComponent,
  IdentificacionProfesoresComponent,
  LoginComponent,
  DashboardComponent,
  DashboardProfesorComponent,
  PerfilComponent,
  PerfilPruebaComponent,
  PerfilProfesorComponent,
  HeaderComponent,
  FooterComponent,
  CrearRankingComponent,
  ModalComponent,
  ModalEntregaComponent,
  ModalPerfilAlumnoComponent,
  ModalEditarRankingComponent,
  DarkModeComponent,
  PodiumComponent
];
