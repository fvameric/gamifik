import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// plantillas
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';

// modals
import { ModalComponent } from './plantillas/modal/modal.component';
import { ModalEntregaComponent } from './vistas/profesores/modal-entrega/modal-entrega.component';
import { ModalPerfilAlumnoComponent } from './vistas/profesores/modal-perfil-alumno/modal-perfil-alumno.component';
import { ModalEditarRankingComponent } from './vistas/profesores/modal-editar-ranking/modal-editar-ranking.component';
import { DarkModeComponent } from './vistas/dark-mode/dark-mode.component';
import { LandingComponent } from './vistas/landing/landing.component';

// vistas
import { LoginComponent } from './vistas/identificacion/login/login.component';

// alumnos
import { IdentificacionComponent } from './vistas/identificacion/identificacion/identificacion.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';

// profesores
import { IdentificacionProfesoresComponent } from './vistas/identificacion/identificacion-profesores/identificacion-profesores.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';
import { CrearRankingComponent } from './vistas/profesores/crear-ranking/crear-ranking.component';
import { DashboardEvaluacionesComponent } from './vistas/profesores/dashboard-evaluaciones/dashboard-evaluaciones.component';

// guards
import { AuthGuardService } from 'services/guards/auth-guard.service';
import { RoleGuardService } from 'services/guards/role-guard.service';

// tests
import { PerfilPruebaComponent } from './vistas/alumnos/perfil-prueba/perfil-prueba.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'identificacion-profesores', component: IdentificacionProfesoresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'dashboardprofesor', component: DashboardProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'evaluaciones', component: DashboardEvaluacionesComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'perfil-prueba', component: PerfilPruebaComponent},
  { path: 'perfilprofesor', component: PerfilProfesorComponent, canActivate: [AuthGuardService, RoleGuardService] },
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
  DashboardEvaluacionesComponent,
  PerfilComponent,
  PerfilPruebaComponent,
  PerfilProfesorComponent,
  LandingComponent,
  HeaderComponent,
  FooterComponent,
  CrearRankingComponent,
  ModalComponent,
  ModalEntregaComponent,
  ModalPerfilAlumnoComponent,
  ModalEditarRankingComponent,
  DarkModeComponent
];
