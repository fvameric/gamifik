import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

// Interceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'services/interceptors/interceptor.service';

// JWT Token
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// Loading
import { LoadingInterceptorService } from 'services/interceptors/loading-interceptor.service';
import { LoaderComponent } from './plantillas/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from 'services/loader.service';

//plantillas
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { RegistroAlumnoComponent } from './vistas/identificacion/registro/registro-alumno/registro-alumno.component';
import { RegistroProfesorComponent } from './vistas/identificacion/registro/registro-profesor/registro-profesor.component';
import { ModalEditarRankingComponent } from './vistas/profesores/modal-editar-ranking/modal-editar-ranking.component';
import { ModalEditarEntregaComponent } from './vistas/profesores/modal-editar-entrega/modal-editar-entrega.component';
import { VerDetallesAlumnoComponent } from './vistas/profesores/ver-detalles-alumno/ver-detalles-alumno.component';
import { SkeletonLoaderModule } from './plantillas/loader-skeleton/skeleton-loader/skeleton-loader.module';
import { HomeComponent } from './plantillas/home/home.component';
import { ModalPodiumComponent } from './plantillas/modal-podium/modal-podium.component';
import { ModalSkillComponent } from './vistas/alumnos/modal-skill/modal-skill.component';
import { LandingComponent } from './vistas/landing/landing.component';
import { DashboardEvaluacionesComponent } from './vistas/profesores/dashboard-evaluaciones/dashboard-evaluaciones.component';
import { WavesComponent } from './plantillas/waves/waves.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistroAlumnoComponent,
    RegistroProfesorComponent,
    LoaderComponent,
    routingComponents,
    ModalEditarEntregaComponent,
    VerDetallesAlumnoComponent,
    HomeComponent,
    ModalPodiumComponent,
    ModalSkillComponent,
    LandingComponent,
    DashboardEvaluacionesComponent,
    WavesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SkeletonLoaderModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
