import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/alumnos/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/alumnos/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { PruebaHeaderComponent } from './plantillas/prueba-header/prueba-header.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent },
  { path: 'perfil', component: PerfilComponent},
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
  RegistroComponent,
  PerfilComponent,
  HeaderComponent,
  FooterComponent,
  PruebaHeaderComponent
];
