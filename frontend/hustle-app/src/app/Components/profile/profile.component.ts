import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from "../../services/userService";
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import {init} from "protractor/built/launcher";
import {SportService} from "../../services/sportService";
import {Sport} from "../../models/sport";
import {ImageService} from "../../services/imageService";
import {Image} from "../../models/image";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateForm:FormGroup;
  sports:any[];
  user:User;
  image:Image;
  pass:string;
  userSports:Sport[];
  pictureUrl:any;
  selectedSports:Sport[];
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private sportService:SportService,
              private imageService:ImageService) {
  }

  ngOnInit() {
    this.sportService.getSports().then(
      sports => this.sports = sports
    );
    this.userService.getUser(JSON.parse(localStorage.getItem("currentUser")).id).then(
      user => this.user = user);


  }

  checkIfValidField(field: string,type:string): boolean {
    return !this.updateForm.controls[field].valid && this.updateForm.controls[field].touched;

  }
  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.pictureUrl=file;
    }
  }
  checkIfSelected(sport:Sport) {
    return this.user.sports.indexOf(sport) != -1 ;
  }
  update() {
    this.user.sports=this.selectedSports;
    this.imageService.addImage(this.pictureUrl).then(
      image => this.image = image
    );
    this.user.image = this.image;
    this.userService.updateUser(this.user);

  }
}
