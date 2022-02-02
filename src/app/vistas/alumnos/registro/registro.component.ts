import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';

// interfaces
import { Alumno } from 'app/interfaces/Alumno';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  passShown: boolean = false;
  confirmPassShown: boolean = false;
  passType: string = 'password';
  confirmPassType: string = 'password';

  registroProfe: boolean = false;

  accesoProfeFlag: boolean = false;
  passAcceso: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private controladorService: ControladorService) { }

  ngOnInit(){

    //Validadors registre
    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(".*\\S.*[a-zA-z0-9_]")]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.minLength(1)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        fechaNacimiento: ['', Validators.required]
      }, {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: this.mustMatch("password", "confirmPassword")
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
  
  //Retorna els valors introduits al formulari
  get form() {
    return this.registerForm.controls;
  }

  /*
  //Funció que reseteja els valors del formulari
  onReset() {
    this.registerForm.reset();
  }
  */

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;

    const nuevoAlumno: Alumno = {
      id: form.id,
      nick: form.username,
      email: form.email,
      pass: form.password,
      nombre: form.nombre,
      apellidos: form.apellidos,
      fecha_nacimiento: form.fechaNacimiento
    }

    //Comprobar si es cumpleixen o no tots els errors
    if (this.registerForm.invalid) {
      console.log("invalido");
    } else {
      console.log("valid");
      this.controladorService.insertarAlumno(nuevoAlumno);
    }

    //this.onReset();
  }

  public togglePass() {
    if (this.passShown) {
      this.passShown = false;
      this.passType = 'password';

    } else {
      this.passShown = true;
      this.passType = 'text';
    }
  }

  public toggleConfirmPass() {
    if (this.confirmPassShown) {
      this.confirmPassShown = false;
      this.confirmPassType = 'password';

    } else {
      this.confirmPassShown = true;
      this.confirmPassType = 'text';
    }
  }

  profe() {
    if (this.registroProfe) {
      this.registroProfe = false;
    }

    if (this.passAcceso == "12") {
      this.passAcceso = "";
      this.registroProfe = true;
    }
  }

}
