import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/alumnos/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { RegistroComponent } from './vistas/alumnos/registro/registro.component';
import { RegistroProfesorComponent } from './vistas/profesores/registro-profesor/registro-profesor.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion.component';
import { LoginProfesorComponent } from './vistas/profesores/login-profesor/login-profesor.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginProfesor', component: LoginProfesorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardProfesor', component: DashboardProfesorComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfilProfesor', component: PerfilProfesorComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'registroProfesor', component: RegistroProfesorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  IdentificacionComponent,
  LoginComponent,
  LoginProfesorComponent,
  DashboardComponent,
  DashboardProfesorComponent,
  PerfilComponent,
  PerfilProfesorComponent,
  RegistroComponent,
  RegistroProfesorComponent
];
