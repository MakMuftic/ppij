import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/userService";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {SportService} from "../../services/sportService";
import {Event} from "../../models/Event";
import {ImageService} from "../../services/imageService";
import {Image} from "../../models/image";
import {EventService} from "../../services/eventService";
import {Constants} from "../../Constants/constants";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  venues:any[];
  sports:any[];
  event:Event = new Event("","",0,0,new Image(""),"");
  file:File;
  image:Image;
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private venueService:VenueService,
              private sportService:SportService,private imageService: ImageService,
              private eventService:EventService) {
  }

  ngOnInit() {
    this.venueService.getVenues().then(
      venues => this.venues = venues);
    this.sportService.getSports().then(
      sports => this.sports = sports
    );
  }


  create() {
    this.imageService.addImage(this.file).then(
      image => this.image = image
    );
    console.log(this.event.sportId);
    console.log(this.event.venueId);
    console.log(this.event.name);
    console.log(this.event.date);
    console.log(this.image);

    this.eventService.addEvent(this.event);
    Constants.type="";
  }
  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.file=file;
    }
  }

}
