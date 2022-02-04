import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/alumnos/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/alumnos/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion.component';
import { HeaderComponent } from './plantillas/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'header', component: HeaderComponent}
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
  RegistroComponent
];
