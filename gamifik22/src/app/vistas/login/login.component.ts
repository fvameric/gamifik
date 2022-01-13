import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onReset() {
    this.loginForm.reset();
  }
  onLogin(form: any) {
    console.log(form);
    this.onReset();

  }


}
