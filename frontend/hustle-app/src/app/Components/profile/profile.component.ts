import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from "../../services/userService";
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import {init} from "protractor/built/launcher";
import {SportService} from "../../services/sportService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateForm:FormGroup;
  sports:any[];
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private sportService:SportService) {
  }

  ngOnInit() {
    this.initForms();
    this.sportService.getSports().then(
      sports => this.sports = sports
    );
  }
  initForms() {
    this.updateForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(13)]],
      'username': ['', [Validators.required]],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'confirmPassword': ['', Validators.required]
    });
  }
  checkIfValidField(field: string,type:string): boolean {
    return !this.updateForm.controls[field].valid && this.updateForm.controls[field].touched;

  }
  update() {
  }
}
