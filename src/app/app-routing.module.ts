import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { RegistroProfesorComponent } from './vistas/registro-profesor/registro-profesor.component';
import { IdentificacionComponent } from './vistas/identificacion/identificacion.component';

const routes: Routes = [
  { path: '', redirectTo: 'identificacion', pathMatch: 'full' },
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'registroProfesor', component: RegistroProfesorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [IdentificacionComponent, LoginComponent, DashboardComponent, PerfilComponent, RegistroComponent, RegistroProfesorComponent];
