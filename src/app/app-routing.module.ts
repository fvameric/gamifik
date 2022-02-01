import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/alumnos/login/login.component';
import { DashboardComponent } from './vistas/alumnos/dashboard/dashboard.component';
import { PerfilComponent } from './vistas/alumnos/perfil/perfil.component';
import { RegistroComponent } from './vistas/alumnos/registro/registro.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent }
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
  PerfilComponent,
  RegistroComponent
];
