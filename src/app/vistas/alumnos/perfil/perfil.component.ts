import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { Profesor } from '../../../interfaces/Profesor';
import { User } from 'app/interfaces/User';
import { UsersService } from 'services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { Ranking } from 'app/interfaces/Ranking';
import Swal from 'sweetalert2';
import { TokenService } from 'services/token.service';
import { AuthService } from 'services/auth.service';

const USER_LS = 'userLocalStorage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  profesores: any;
  alumnos: any;
  mostrarRankingsVisual: boolean = false;
  mostrarConfiguracionVisual: boolean = false;
  mostrarCerrarVisual: boolean = false;
  editableEmail: boolean = true;
  editableNombre: boolean = true;
  editableApellidos: boolean = true;

  passType: string = 'password';
  passTypeNew: string = 'password';
  passTypeConfirmNew: string = 'password';

  antiguaContrasena: boolean = false;
  nuevaContrasena: boolean = false;
  confirmarNuevaContrasena: boolean = false;
  mostrarEditarContrasena: boolean = false;

  nombre: string = 'funciona Fran';
  apellidos: string = 'funciona Fran Olga';
  email: string = 'funcionaFran@gmail.com';

  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: ''
  };

  flagRanks: boolean = false;
  rankingIds: any;
  datosRanking: any;
  arrRankings: any[] = [];

  datosStorage: any;

  // formulario
  registerForm!: FormGroup;

  oldPass: string = '';
  newPass: string = '';
  newConfPass: string = '';

  imgSrc: string = '';

  arrSwal: any = [
    { id: 0, icon: 'success', title: 'Ok', text: 'Se han guardaron los cambios' },
    { id: 1, icon: 'error', title: 'Error', text: 'Contraseña y confirmar contraseña no pueden quedar vacíos' },
    { id: 2, icon: 'error', title: 'Error', text: 'Las contraseñas tienen que coincidir' },
    { id: 3, icon: 'error', title: 'Error', text: 'La contraseña actual no es correcta' }
  ];

  rankings: any;
  rankingsConAlumnos: any;
  ranksCodes: any;
  alumnosId: any[] = [];

  ranksArray: any[] = [];

  // token
  logUserToken: any;

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    private authService: AuthService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.crearForm();
    this.obtenerDatosRanking();
  }

  obtenerDatosAlumno() {
    /*
    this.datosStorage = localStorage.getItem(USER_LS);
    this.datosAlumno = JSON.parse(this.datosStorage);
    */

    this.datosAlumno = this.tokenService.getUser();

    this.nombre = this.datosAlumno.nombre;
    this.apellidos = this.datosAlumno.apellidos;
    this.email = this.datosAlumno.email;
    this.imgSrc = this.datosAlumno.imagen;
  }

  expirado() {
    this.tokenService.tokenExpired(this.tokenService.getToken());
  }

  cerrarSesion() {
    this.authService.logout();
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) =>
        this.imgSrc = e.target.result;
      reader.readAsDataURL(file);
    }
  }
  

  obtenerDatosRanking() {
    this.arrRankings = [];
    this.rankingService.obtenerRanking().subscribe(val => this.rankings = val);
    this.rankingService.obtenerJoinRankingAlumno().subscribe((val: any) => {
      this.rankingsConAlumnos = val;

      val.forEach((element: any) => {
        if (element.id_alumno == this.datosAlumno.id_alumno) {
          this.arrRankings.push(element);
        }
      });

      if (this.arrRankings.length == 0) {
        this.flagRanks = true;
      } else {
        this.flagRanks = false;
      }
    });
  }

  async unirseRanking() {
    const { value: test } = await Swal.fire({
      title: 'Input',
      input: 'text',
      inputLabel: 'Input test',
      inputPlaceholder: 'Escribe algo',
      showCancelButton: true
    });

    if (test) {
      this.comprobarAlumnoRanking(test);
    }
  }

  comprobarAlumnoRanking(codRank: string) {
    let rankId: number = 0;
    let rankExiste: boolean = false;
    let alumnoExiste: boolean = false;
    this.rankings.forEach((element: any) => {
      if (codRank == element.cod_rank) {
        console.log("rank existe");
        rankId = element.id_rank;
        rankExiste = true;
      }
    });

    if (rankExiste) {
      rankExiste = false;
      this.arrRankings.forEach((element: any) => {
        if (codRank == element.cod_rank) {
          alumnoExiste = true;
        }
      });
      if (alumnoExiste) {
        alumnoExiste = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ya está en el ranking'
        });
      } else {
        console.log("alumno NO está en el rank");
        Swal.fire({
          title: "¿Quieres unirte a " + codRank + "?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Ok',
              text: 'Se une al ranking'
            });
            console.log("Se une al ranking");

            this.rankingService.insertarAlumnoEnRanking(rankId, this.datosAlumno.id_alumno).subscribe((val: any) => {
              if (val.resultado == 'ok') {
                this.ngOnInit();
              } else {
                console.log(val);
              }
            });
          } else {
            console.log("Se cancela el unirse al ranking");
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Codigo " + codRank + " no existe"
      });
      console.log(codRank + " no existe");
    }
  }

  confirmarModif() {
    let userModif: User = {
      id: this.datosAlumno.id_alumno,
      email: this.email,
      pass: this.datosAlumno.pass,
      nombre: this.nombre,
      apellidos: this.apellidos
    }
    // en caso de que se quiera cambiar el email, nombre o apellidos
    // pero no la password
    if (this.oldPass == '' && this.newPass == '' && this.newConfPass == '') {
      this.generarSwal(this.arrSwal[0], userModif);
    } else {
      if (this.oldPass == this.datosAlumno.pass) {
        if (this.newPass == '' || this.newConfPass == '') {
          this.generarSwal(this.arrSwal[1]);
        } else {
          // en caso de que se quiera cambiar cualquier dato y
          // además, la password
          if (this.newPass == this.newConfPass) {
            let userModif: User = {
              id: this.datosAlumno.id_alumno,
              email: this.email,
              pass: this.newConfPass,
              nombre: this.nombre,
              apellidos: this.apellidos
            }
            this.generarSwal(this.arrSwal[0], userModif);
          } else {
            this.generarSwal(this.arrSwal[2]);
          }
        }
      } else {
        this.generarSwal(this.arrSwal[3]);
      }
    }
  }

  generarSwal(swal: any, user?: User) {
    if (swal.id == 0) {
      if (user != undefined || user != null) {
        Swal.fire({
          title: '¿Quieres guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: swal.icon,
              title: swal.title,
              text: swal.text
            });

            this.usersService.modificarAlumno(user).subscribe((val: any) => {
              localStorage.removeItem(USER_LS);
              localStorage.setItem(USER_LS, JSON.stringify(val.data));
              this.ngOnInit();
            });
          }
        });
      }
    } else {
      Swal.fire({
        icon: swal.icon,
        title: swal.title,
        text: swal.text
      });
    }
  }

  /********** funciones formulario **********/
  crearForm() {
    //Validadors registre
    this.registerForm = this.formBuilder.group({
      newPass: [''],
      confNewPass: ['', Validators.required]
    }, {
      //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
      validator: this.mustMatch("newPass", "confNewPass")
    }
    );
  }

  // funció per controlar que camps password i confirmarpassword siguin iguals
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /********** funciones botones del perfil **********/
  mostrarRankings() {
    if (this.mostrarRankingsVisual == false) {
      this.mostrarRankingsVisual = true;
      this.mostrarConfiguracionVisual = false;
      this.mostrarCerrarVisual = false;
    } else {
      this.mostrarRankingsVisual = false;
    }
  }

  mostrarConfiguracion() {
    if (this.mostrarConfiguracionVisual == false) {
      this.mostrarConfiguracionVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarCerrarVisual = false;
    } else {
      this.mostrarConfiguracionVisual = false;
    }
  }

  mostrarCerrar() {
    if (this.mostrarCerrarVisual == false) {
      this.mostrarCerrarVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarConfiguracionVisual = false;
    } else {
      this.mostrarCerrarVisual = false;
    }
  }

  editarEmail() {
    if (this.editableEmail == true) {
      this.editableEmail = false;
    } else {
      (<HTMLInputElement>document.getElementById('inputEmail')).value;
      (<HTMLInputElement>document.getElementById('inputEmail')).value = '';
      this.editableEmail = true;
    }
  }

  editarNombre() {
    if (this.editableNombre == true) {
      this.editableNombre = false;
    } else {
      if (document.getElementById('guardarNombre')) {
      }

      (<HTMLInputElement>document.getElementById('inputNombre')).value;
      (<HTMLInputElement>document.getElementById('inputNombre')).value = '';
      this.editableNombre = true;
    }
  }

  editarApellidos() {
    if (this.editableApellidos == true) {
      this.editableApellidos = false;
    } else {
      (<HTMLInputElement>document.getElementById('inputApellidos')).value;
      (<HTMLInputElement>document.getElementById('inputApellidos')).value = '';
      this.editableApellidos = true;
    }
  }

  guardarNombre() {
    this.editableNombre = true;
    this.nombre = (<HTMLInputElement>(
      document.getElementById('inputNombre')
    )).value;
  }

  guardarApellidos() {
    this.editableApellidos = true;
    this.apellidos = (<HTMLInputElement>(
      document.getElementById('inputApellidos')
    )).value;
  }

  guardarEmail() {
    this.editableEmail = true;
    this.email = (<HTMLInputElement>(
      document.getElementById('inputEmail')
    )).value;
  }

  mostrarEditarContra() {
    if (this.mostrarEditarContrasena == true) {
      this.mostrarEditarContrasena = false;
    } else {
      this.mostrarEditarContrasena = true;
    }
  }

  visualizarAntiguaContrasena() {
    if (this.antiguaContrasena == false) {
      this.antiguaContrasena = true;
      this.passType = 'text';
    } else {
      this.antiguaContrasena = false;
      this.passType = 'password';
    }
  }

  visualizarNuevaContrasena() {
    if (this.nuevaContrasena == false) {
      this.nuevaContrasena = true;
      this.passTypeNew = 'text';
    } else {
      this.nuevaContrasena = false;
      this.passTypeNew = 'password';
    }
  }
  visualizarConfirmarNuevaContrasena() {
    if (this.confirmarNuevaContrasena == false) {
      this.confirmarNuevaContrasena = true;
      this.passTypeConfirmNew = 'text';
    } else {
      this.confirmarNuevaContrasena = false;
      this.passTypeConfirmNew = 'password';
    }
  }

}
