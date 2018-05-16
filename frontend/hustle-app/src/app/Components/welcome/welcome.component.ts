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
    localStorage.setItem("registerError", "N")
  }
  register() {
    this.username = this.registerForm.get("username").value;
    this.pass = this.registerForm.get("password").value;
    let firstName = this.registerForm.get("firstName").value;
    let lastName = this.registerForm.get("lastName").value;
    let email = this.registerForm.get("email").value;
    let user = new User(this.username,firstName,lastName,email,"","",null,null,false);
    this.userService.registerUser(user,this.pass).toPromise().then(response => this.startpage() &&
      localStorage.setItem("loginError", "N") ,err => localStorage.setItem("loginError", "Y") && this.home());;
    this.startpage()
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
      'username': ['', [Validators.required, Validators.email]],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'confirmPassword': ['', Validators.required]
    });
  }

  checkIfPasswordMatch(password: string, confirmPassword: string): boolean {
    if (password.match(confirmPassword)) {
      return true;
    } else {
      return false;
    }
  }
  localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
  checkIfValidField(field: string): boolean {
      return !this.loginForm.controls[field].valid && this.loginForm.controls[field].touched;

  }

}
