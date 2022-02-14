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

  ranksCodes: any;
  alumnosId: any;

  ranksArray: any[] = [];

  constructor(
    private usersService: UsersService,
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
    this.imgSrc = this.datosAlumno.imagen;
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
    // cargar rankings
    this.rankingService.obtenerRanking().subscribe(ranks => this.ranksCodes = ranks);
    this.rankingService.obtenerRankingAlumnosId(this.datosAlumno.id_alumno).subscribe(alumnos => this.alumnosId = alumnos);

    this.arrRankings = [];
    this.rankingService.obtenerRankingAlumnosId(this.datosAlumno.id_alumno).subscribe((val: any) => {
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

  async unirseRanking() {
    this.this.ranksArray = [];
    const { value: test } = await Swal.fire({
      title: 'Input',
      input: 'text',
      inputLabel: 'Input test',
      inputPlaceholder: 'Escribe algo'
    });
    this.ranksCodes.forEach((element: any) => {
      if (test == element.cod_rank) {
        this.ranksArray.push(element);
      }
    });

    this.comprobarAlumnoRanking(this.ranksArray);
  }

  comprobarAlumnoRanking(rank: any) {
    let alumnRepetido = false;
    console.log(rank);

    /*
    //this.rankingService.obtenerRankCodes(test).subscribe((val: any) => {
    this.rankingService.obtenerRanking().subscribe((val: any) => {
      console.log(val);
      val.forEach((element: any) => {
        */
        /*
        if (this.datosAlumno.id_alumno == element.id_alumno) {
          console.log(this.datosAlumno.nick + " esta en " + element.id_rank);
          alumnRepetido = true;
          
        }*/
        /*
      });

      if (alumnRepetido) {
        console.log("este alumno ya está en este ranking");
      } else {
        console.log("este alumno (" + this.datosAlumno.id_alumno + ") no está en este ranking");
        console.log("alumno: " + this.datosAlumno.nick + " se ha unido a " + test);
      }
    });
    */
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

generarSwal(swal: any, user ?: User) {
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

}
