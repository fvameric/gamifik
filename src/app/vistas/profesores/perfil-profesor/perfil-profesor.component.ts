import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
import { Profesor } from '../../../interfaces/Profesor';
import { User } from 'app/interfaces/User';
import { UsersService } from 'services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RankingService } from 'services/ranking.service';
import Swal from 'sweetalert2';

const USER_LS = 'userLocalStorage';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {
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

  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: ''
  };

  flagRanks: boolean = false;
  rankingIds: any;
  datosRanking: any;
  arrRankings: any[] = [];

  userLocStorage: any;
  datosStorage: any;

  // formulario
  registerForm!: FormGroup;

  oldPass: string = '';
  newPass: string = '';
  newConfPass: string = '';

  centroSelec: number = 0;

  listaCentros = [
    { id: 0, nombre: 'Ilerna' },
    { id: 1, nombre: 'Caparrella' },
    { id: 2, nombre: 'Almenar' }
  ];

  imgSrc: string = '';

  arrSwal: any = [
    { id: 0, icon: 'success', title: 'Ok', text: 'Se han guardaron los cambios' },
    { id: 1, icon: 'error', title: 'Error', text: 'Contraseña y confirmar contraseña no pueden quedar vacíos' },
    { id: 2, icon: 'error', title: 'Error', text: 'Las contraseñas tienen que coincidir' },
    { id: 3, icon: 'error', title: 'Error', text: 'La contraseña actual no es correcta' }
  ];

  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.crearForm();
    this.oldCentro();
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

  obtenerDatosProfesor() {
    this.datosStorage = localStorage.getItem(USER_LS);
    this.datosProfesor = JSON.parse(this.datosStorage);

    this.nombre = this.datosProfesor.nombre;
    this.apellidos = this.datosProfesor.apellidos;
    this.email = this.datosProfesor.email;
    this.imgSrc = this.datosProfesor.imagen;
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
    this.rankingService.obtenerRankingProfeId(this.datosProfesor.id_profe).subscribe((val: any) => {
      if (val == null) {
        this.flagRanks = true;
      } else {
        this.flagRanks = false;
        val.forEach((element: any) => {
          this.rankingService.obtenerRankingPorId(element.id_rank).subscribe((val: any) => {
            this.datosRanking = val;
            this.arrRankings.push(this.datosRanking.data);
          });
        });
      }
    });
  }

  oldCentro() {
    this.centroSelec = this.datosProfesor.centro;
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
      id: this.datosProfesor.id_profe,
      email: this.email,
      pass: this.datosProfesor.pass,
      nombre: this.nombre,
      apellidos: this.apellidos,
      centro: this.centroSelec
    }

    // en caso de que se quiera cambiar el email, nombre o apellidos
    // pero no la password
    if (this.oldPass == '' && this.newPass == '' && this.newConfPass == '') {
      this.generarSwal(this.arrSwal[0], userModif);
    } else {
      if (this.oldPass == this.datosProfesor.pass) {
        if (this.newPass == '' || this.newConfPass == '') {
          this.generarSwal(this.arrSwal[1]);
        } else {

          // en caso de que se quiera cambiar cualquier dato y
          // además, la password
          if (this.newPass == this.newConfPass) {
            let userModif: User = {
              id: this.datosProfesor.id_profe,
              email: this.email,
              pass: this.newConfPass,
              nombre: this.nombre,
              apellidos: this.apellidos,
              centro: this.centroSelec
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
  
            this.usersService.modificarProfesor(user).subscribe((val: any) => {
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

}
