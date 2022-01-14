import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  passwordShown:boolean = false;
  passwordType:string = 'password';

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  //Funció rebre valors del formulari
  get form() {
    return this.loginForm.controls;
  }

  //Funció resetejar valors
  onReset() {
    this.loginForm.reset();
  }

  //Funció iniciar sessió
  onLogin(form: any) {
    console.log(form);
    this.onReset();

  }


  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = this.loginForm.get("password")?.value;

    } else {
      this.passwordShown = true;
      this.passwordType = this.loginForm.get("password")?.value;
    }
  }


}
