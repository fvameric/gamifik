import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/identificacion/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/identificacion/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/home/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { PruebaHeaderComponent } from './plantillas/prueba-header/prueba-header.component';
import { PerfilProfesorComponent } from './vistas/profesores/perfil-profesor/perfil-profesor.component';
import { DashboardProfesorComponent } from './vistas/profesores/dashboard-profesor/dashboard-profesor.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardprofesor', component: DashboardProfesorComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'perfilprofesor', component: PerfilProfesorComponent},
  { path: 'prueba-header', component: PruebaHeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
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
  PruebaHeaderComponent
];
