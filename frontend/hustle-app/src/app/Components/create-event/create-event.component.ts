import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/userService";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {SportService} from "../../services/sportService";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  venues:any[];
  sports:any[];
  createForm:FormGroup;
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private venueService:VenueService,
              private sportService:SportService) {
  }

  ngOnInit() {
    this.initForms();
    this.venueService.getVenues().then(
      venues => this.venues = venues);
    this.sportService.getSports().then(
      sports => this.sports = sports
    );
  }
  initForms() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'date': ['', Validators.required]
    });
  }
  checkIfValidField(field: string,type:string): boolean {
    return !this.createForm.controls[field].valid && this.createForm.controls[field].touched;

  }
  create() {

  }

}
