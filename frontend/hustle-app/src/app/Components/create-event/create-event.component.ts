import { Component, OnInit,EventEmitter,Output,OnChanges,Injectable,ChangeDetectorRef } from '@angular/core';
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
import {Venue} from "../../models/venue";
import {Sport} from "../../models/sport";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  venues:any[];
  sports:any[];
  venue:Venue;
  event:Event = new Event("","",new Venue("","",[],"","",[])
  ,[],new Image(""),"");
  file:File;
  image:Image;
  selectedSports:Sport[];
  constructor(private router:Router,private userService:UserService,
              private loginService:LoginService,private fb: FormBuilder,private venueService:VenueService,
              private sportService:SportService,private imageService: ImageService,
              private eventService:EventService,private cd:ChangeDetectorRef) {
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
    this.event.venue=this.venue;
    this.event.sports = this.selectedSports;
    console.log(this.event);

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
