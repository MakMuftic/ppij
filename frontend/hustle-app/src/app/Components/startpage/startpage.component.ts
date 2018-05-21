import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';

import { LoginService } from "../../services/login.service";
import { SportService } from "../../services/sportService";
import { EventService } from "../../services/eventService";
import { VenueService } from "../../services/venueService";
import { UserService } from "../../services/userService";
import { User } from "../../models/user";
import { Event } from "../../models/Event";
import { Venue } from "../../models/venue";
import { Sport } from "../../models/sport";
import { Image } from "../../models/image";
import { ImageService } from "../../services/imageService";

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  loading = false;
  error = '';
  sports:any[]=[];
  events:any[]=[];
  venues:any[]=[];
  favorites:any[]=[];
  user:User;
  type: string ="";



  constructor(private router: Router,private loginService:LoginService,
  private sportService:SportService,private eventService:EventService,
  private venueService:VenueService,private userService:UserService,private imageService:ImageService) { }

  ngOnInit() {
  }

  openProfile() {
    this.type = "P";
    }
  toEvents() {
    if(localStorage.getItem("currentUser") !== null) {
      this.type="E";
      this.eventService.getEvents()
        .then(events => this.events = events);
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  toVenues() {
    if(localStorage.getItem("currentUser") !== null) {
      this.type = "V";
      this.venueService.getVenues()
        .then(venues => this.venues = venues);
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  create() {
    this.type="C";
  }
  tofavorites() {
    if(localStorage.getItem("currentUser") !== null) {
      this.type =  "F";
      this.userService.getUser(JSON.parse(localStorage.getItem("currentUser")).id).then(user => this.user = user);
      this.userService.getUserFavouritesVenues(JSON.parse(localStorage.getItem("currentUser")).id)
        .then(favorites => this.favorites = favorites);
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  logOut() {
    if(localStorage.getItem("currentUser") != null) {
      this.loginService.logout();
      this.router.navigate(['welcomepage']);
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  getType() {return this.type}
  getSports() {
    this.sportService.getSports()
      .then(sports => this.sports = sports);
      console.log(this.sports);
  }
  localStorageItemName(id: string): string {
    return JSON.parse(localStorage.getItem(id)).username;
  }

}
