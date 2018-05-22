import {ApplicationRef, ChangeDetectorRef, Component, Injectable, OnChanges, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';
import { Constants} from "../../Constants/constants";

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
@Injectable()
export class StartpageComponent implements OnInit,OnChanges{
  loading = false;
  user:User;
  switch:boolean=false;



  constructor(private router: Router,private loginService:LoginService,
  private sportService:SportService,private eventService:EventService,
  private venueService:VenueService,private userService:UserService,private imageService:ImageService) { }

  ngOnInit() {
    this.userService.getUser(JSON.parse(localStorage.getItem("currentUser")).id).then(user => this.user = user);
    this.eventService.getEvents().
    then(events => Constants.events = events);
    this.venueService.getVenues()
      .then(venues => Constants.venues = venues);
    this.userService.getUserFavouritesVenues(JSON.parse(localStorage.getItem("currentUser")).id)
      .then(favorites => Constants.favorites = favorites);
    this.userService.getUser(JSON.parse(localStorage['currentUser']).id).then(
      user => Constants.user = user
    );
  }
  ngOnChanges() {
    if (this.switch ) {
      this.ngOnInit();
    }
  }
  openProfile() {
      Constants.type="P";
    }
  toEvents() {
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="E";

    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  toVenues() {
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="V";
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  create() {
    Constants.type="C";
  }
  tofavorites() {
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="F";
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
  getType() {return Constants.type}

  d
  localStorageItemName(id: string): string {
    return JSON.parse(localStorage.getItem(id)).username;
  }

}
