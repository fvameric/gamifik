import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  RequiredValidator,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

// interfaces
import { Alumno } from 'app/interfaces/Alumno';
import { AuthService } from 'services/auth.service';
import { Profesor } from 'app/interfaces/Profesor';
import { debounceTime, repeat, tap } from 'rxjs/operators';
import { UsersService } from 'services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  // ngIf en caso de querer registrarnos como profesor
  registroProfe: boolean = false;
  registroAlumno: boolean = false;

  // input para acceder como profesor
  passAcceso: string = '';

  constructor(
  ) { }

  ngOnInit() {
  }

  profe() {
    this.registroAlumno = false;
    
    if (this.registroProfe) {
      this.registroProfe = false;
    } else {
      this.registroProfe = true;
    }
  }

  alumno() {
    this.registroProfe = false;

    if (this.registroAlumno) {
      this.registroAlumno = false;
    } else {
      this.registroAlumno = true;
    }
  }
}
