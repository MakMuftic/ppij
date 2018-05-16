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
  }
  register(firstName,lastName,username,email,pass) {
    let user = new User(username,firstName,lastName,email,"","",null,null,false);
    this.userService.registerUser(user,pass);
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
    if(this.loginService.login(this.username,this.pass)) {
      this.startpage();
    } else {
      console.log("Neuspjelo")
    }
    
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
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]],
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
  checkIfValidField(field: string,type:string): boolean {
    if(type == "L") {
      return !this.loginForm.controls[field].valid && this.loginForm.controls[field].touched;
    } else {
      return !this.registerForm.controls[field].valid && this.registerForm.controls[field].touched;
    }
  }

}
