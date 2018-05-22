import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from "../../services/userService";
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  pass:string = "";
  username:string = "";
  loginForm :FormGroup;
  registerForm : FormGroup;

  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForms();
    localStorage.setItem("loginError", "N");
    localStorage.setItem("registerError", "N");
    this.formAnimation();
  }
  formAnimation() {
    const switchRegister = document.querySelector('.js-switch-register');
    const switchLogin = document.querySelector('.js-switch-login');

    const loginForm = document.querySelector('.js-form-login');
    const registerForm = document.querySelector('.js-form-register');

    if(switchRegister) {
      switchRegister.addEventListener('click', () => {
        loginForm.classList.add('u-animation--fade-out-down');

        registerForm.classList.remove('u-display-none');
        registerForm.classList.add('u-animation--fade-in-up');

        setTimeout(() => {
          loginForm.classList.remove('u-display-block');
          loginForm.classList.remove('u-opacity-1');
          loginForm.classList.add('u-display-none');
          loginForm.classList.add('u-opacity-0');
          loginForm.classList.remove('u-animation--fade-out-down');

          registerForm.classList.add('u-display-block');
          registerForm.classList.add('u-opacity-1');
          registerForm.classList.remove('u-opacity-0');
          registerForm.classList.remove('u-animation--fade-in-up');
        }, 500)
      });
    }

    if(switchLogin) {
      switchLogin.addEventListener('click', () => {
        registerForm.classList.add('u-animation--fade-out-down');

        loginForm.classList.remove('u-display-none');
        loginForm.classList.add('u-animation--fade-in-up');

        setTimeout(() => {
          registerForm.classList.remove('u-display-block');
          registerForm.classList.remove('u-opacity-1');
          registerForm.classList.add('u-display-none');
          registerForm.classList.add('u-opacity-0');
          registerForm.classList.remove('u-animation--fade-out-down');

          loginForm.classList.add('u-display-block');
          loginForm.classList.add('u-opacity-1');
          loginForm.classList.remove('u-opacity-0');
          loginForm.classList.remove('u-animation--fade-in-up');
        }, 500)
      });
    }
  }
  register() {
    this.username = this.registerForm.get("username").value;
    this.pass = this.registerForm.get("password").value;
    let firstName = this.registerForm.get("firstName").value;
    let lastName = this.registerForm.get("lastName").value;
    let email = this.registerForm.get("email").value;
    let user = new User(this.username,firstName,lastName,email,"","",null,null,false);
    this.userService.registerUser(user,this.pass).toPromise().then(response => console.log(response));
    this.loginService.login(this.username,this.pass).toPromise().then(response => this.startpage() &&
      localStorage.setItem("loginError", "N") ,err => localStorage.setItem("loginError","Y") && this.home());
  }
  startpage() {
    this.router.navigate(['startpage']);
  }
  home() {
    this.router.navigate(['']);
  }
  login() {
    this.username = this.loginForm.get("username").value;
    this.pass = this.loginForm.get("password").value;
    this.loginService.login(this.username,this.pass).toPromise().then(response => this.startpage() &&
      localStorage.setItem("loginError", "N") ,err => localStorage.setItem("loginError", "Y") && this.home());

  }

  initForms() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(13)]],
      'username': ['', [Validators.required]],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'confirmPassword': ['', Validators.required]
    });
  }

  checkIfPasswordMatch(password: string, confirmPassword: string): boolean {
    if (password.match(confirmPassword) &&  this.registerForm.controls['confirmPassword'].touched) {
      return true;
    } else {
      return false;
    }
  }
  localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
  checkIfValidField(field: string,type:string): boolean {
    if (type == "L") {
      return !this.loginForm.controls[field].valid && this.loginForm.controls[field].touched;
    } else {
      return !this.registerForm.controls[field].valid && this.registerForm.controls[field].touched;
    }

  }

}
