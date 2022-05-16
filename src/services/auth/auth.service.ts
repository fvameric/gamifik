import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/interfaces/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { EvaluacionService } from 'services/evaluacion.service';

const URL_LOCALHOST = "http://localhost:8080/";
const ROUTE_LS = 'userRoute';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private evaluacionService: EvaluacionService
  ) { }

  // utiliza loginAlumnos.php donde se selecciona el alumno por su user y contraseña
  loginAlumnos(user: User) {
    return this.http.post(this.concatUrl('identificacion/loginAlumnos.php'), JSON.stringify(user));
  }

  // utiliza loginProfes.php donde se selecciona el profesor por su user y contraseña
  loginProfesores(user: User) {
    return this.http.post(this.concatUrl('identificacion/loginProfes.php'), JSON.stringify(user));
  }

  // utiliza insertarAlumno.php donde se inserta el alumno
  // si todo ha ido bien con la base de datos, se guarda el alumno en localstorage
  registroAlumno(user: User) {
    this.http.post(this.concatUrl('alumnos/insertarAlumno.php'), JSON.stringify(user))
    .subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarLocalStorage(val);
      }
    });
  }

  // utiliza insertarProfesor.php donde se inserta el profesor
  // si todo ha ido bien con la base de datos, se guarda el profe en localstorage
  registroProfesor(user: User) {
    return this.http.post(this.concatUrl('profesores/insertarProfesor.php'), JSON.stringify(user))
    .subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarLocalStorage(val);
      }
    });
  }

  // genera una alerta con los registros fallidos
  generarSwal(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }

  // comprueba si hay un token guardado en localstorage
  // tener token significa que se ha logueado el user
  isAuthenticated(): boolean {
    if (this.tokenService.getToken() != '') {
      return true;
    }
    return false;
  }

  // se utiliza para comprobar en el guard que el user sea profesor o alumno
  // así un alumno no puede entrar a componentes de profesores y viceversa
  userRole(): number {
    const user = this.tokenService.getUser();
    return user.tipo;
  }

  // limpia localstorage, eliminando el token
  logout() {
    this.tokenService.signOut();
  }

  // se guarda el token y el usuario en localstorage para conocer su sesión
  guardarLocalStorage(data: any) {
    console.log(data);
    if (data.resultado == 'ok') {
      if (data.data.tipo == 0) {
        this.evaluacionService.checkFechaPuntosSemanales(data.data.id_alumno).subscribe(val => {
          var dataPuntos: any = val;
          var dataNow = new Date();
          console.log(dataPuntos);
          if (dataPuntos.data != null) {
            var lunes = this.obtenerLunes(dataPuntos.data.fecha);

            if (dataNow.getTime() > lunes.getTime()) {
              console.log('siguiente semana, recupera puntos');
              this.evaluacionService.renovarPuntosSemanales(data.data.id_alumno).subscribe(val => console.log(val));
            } else {
              console.log('anterior o misma semana, no recupera puntos');
            }
          } else {
            this.evaluacionService.renovarPuntosSemanales(data.data.id_alumno).subscribe(val => console.log(val));
          }
         
        });
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data.data);
        this.router.navigate(['dashboard']);
      } else {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data.data);
        this.router.navigate(['dashboardprofesor']);
      }
    } else {
      this.generarSwal(data.mensaje);
    }
  }

  obtenerLunes(dataPuntos: Date) {
    dataPuntos = new Date(dataPuntos);
    var day = dataPuntos.getDay(),
        diff = dataPuntos.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(dataPuntos.setDate(diff));
  }

  // guarda la última ruta donde se ubica el usuario
  guardarRoute(route: any) {
    localStorage.removeItem(ROUTE_LS);
    localStorage.setItem(ROUTE_LS, route);
  }

  // obtiene la ruta de la última ubicación del usuario
  getSavedRoute() {
    return localStorage.getItem(ROUTE_LS);
  }

  // concatena la URL de localhost y la string que le pasemos
   
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }
}
