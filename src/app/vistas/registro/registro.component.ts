import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';

// interfaces
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private controladorService: ControladorService, private http: HttpClient) { }

  ngOnInit(): void {

    //Validadors registre
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        nombre: ['', [Validators.required, Validators.minLength(1)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        centro: ['', [Validators.required]]
      },
      {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: this.MustMatch("password", "confirmPassword")
      }
    );
  }

  //
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })

      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  //Retorna els valors introduits al formulari
  get form() {
    return this.registerForm.controls;
  }

  //Funció que reseteja els valors del formulari
  onReset() {
    this.registerForm.reset();
  }

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {

    const nuevoProfe: Profesor = {
      _id: 0,
      nick: form.username,
      email: form.email,
      pass: form.password,
      nombre: form.nombre,
      apellidos: form.apellidos,
      centro: form.centro
    }

    this.controladorService.insertarProfesor(nuevoProfe);

    this.onReset();
  }

}
