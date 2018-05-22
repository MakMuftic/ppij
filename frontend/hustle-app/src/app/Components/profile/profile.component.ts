import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
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
import {Constants} from "../../Constants/constants";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() boolPop:boolean;
  @Output() boolChange = new EventEmitter<boolean>();
  user:User = Constants.user;
  sports:any[];
  image:Image;
  pass:string;
  file:File;
  selectedSports:Sport[];
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private sportService:SportService,
              private imageService:ImageService) {
  }

  ngOnInit() {
    this.sportService.getSports().then(
      sports => this.sports = sports
    );

  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.file=file;
    }
  }
  check(sportId:number) {
    let bool = false;
    this.sports.forEach(e => {
      if(e.id == sportId) {
        this.selectedSports.push(e);
        bool=true
      }
    })
    return bool;
  }
  update() {
    this.user.sports=this.selectedSports;
    if(this.file != null) {
      this.imageService.addImage(this.file).then(
        image => this.image = image
      );
    }
    this.user.image = this.image;
    this.userService.updateUser(this.user);
    Constants.type = "";
    this.boolPop = true;
    this.boolChange.emit(this.boolPop);

  }

}
