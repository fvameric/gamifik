import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { Profesor } from '../../../interfaces/Profesor';
import { User } from 'app/interfaces/User';
import { UsersService } from 'services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import { Ranking } from 'app/interfaces/Ranking';

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

  rankingIds: any;
  datosRanking: any;
  arrRankings: any[] = [];

  datosStorage: any;

  // formulario
  registerForm!: FormGroup;

  oldPass: string = '';
  newPass: string = '';
  newConfPass: string = '';

  constructor(
    private usersServices: UsersService,
    private rankingService: RankingService,
    public formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.crearForm();
    this.obtenerDatosRanking();
  }

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

  obtenerDatosAlumno() {
    this.datosStorage = localStorage.getItem(USER_LS);
    this.datosAlumno = JSON.parse(this.datosStorage);

    this.nombre = this.datosAlumno.nombre;
    this.apellidos = this.datosAlumno.apellidos;
    this.email = this.datosAlumno.email;
  }

  obtenerDatosRanking() {
    this.rankingService.obtenerRankingAlumnosId(this.datosAlumno.id_alumno).subscribe((val: any) => {
      val.forEach((element: any) => {
        this.rankingService.obtenerRankingPorId(element.id_rank).subscribe((val: any) => {
          this.datosRanking = val;
          this.arrRankings.push(this.datosRanking.data);
        });
      });
    });
  }

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
      this.usersServices.modificarAlumno(userModif).subscribe((val: any) => {
        localStorage.removeItem(USER_LS);
        localStorage.setItem(USER_LS, JSON.stringify(val.data));
        this.ngOnInit();
      });
    } else {
      if (this.oldPass == this.datosAlumno.pass) {
        if (this.newPass == '' || this.newConfPass == '') {
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

            this.usersServices.modificarAlumno(userModif).subscribe((val: any) => {
              localStorage.removeItem(USER_LS);
              localStorage.setItem(USER_LS, JSON.stringify(val.data));
              this.ngOnInit();
            });
          } else {
            console.log('las pass tienen que coincidir');
          }
        }
      } else {
        console.log('la antigua pass no concuerda');
      }
    }
  }
}
