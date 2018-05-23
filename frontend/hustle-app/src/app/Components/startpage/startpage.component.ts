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



  constructor(private router: Router,private loginService:LoginService,
  private sportService:SportService,private eventService:EventService,
  private venueService:VenueService,private userService:UserService,private imageService:ImageService,
              private cd:ChangeDetectorRef) { }

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
    Constants.pop=false;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      Constants.roll = false;
    },500);
  }
  ngOnChanges() {
  }
  openProfile(event) {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    Constants.event=event;
    Constants.event.target.classList.add('is-active');
    this.cd.detectChanges();
    Constants.type="P";
    }
  toEvents(event) {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    Constants.event=event;
    Constants.event.target.classList.add('is-active');
    this.cd.detectChanges();
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="E";

    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  fade() {
    Constants.pop=false;
    this.cd.detectChanges();
  }
  getRoll() {return Constants.roll;}
  toVenues() {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    Constants.event=event;
    Constants.event.target.classList.add('is-active');
    this.cd.detectChanges();
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="V";
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  create() {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    Constants.event=event;
    Constants.event.target.classList.add('is-active');
    this.cd.detectChanges();
    Constants.type="C";
  }
  tofavorites() {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    Constants.event=event;
    Constants.event.target.classList.add('is-active');
    this.cd.detectChanges();
    if(localStorage.getItem("currentUser") !== null) {
      Constants.type="F";
    } else {
      this.router.navigate(['welcomepage']);
    }

  }
  logOut() {
    if(Constants.event != undefined) {
      if(Constants.event.target.classList.contains('is-active')) {
        Constants.event.target.classList.remove('is-active');
      }
    }
    if(localStorage.getItem("currentUser") != null) {
      this.loginService.logout();
      this.router.navigate(['welcomepage']);
    } else {
      this.router.navigate(['welcomepage']);
    }
    Constants.roll=false;

  }
  getType() {return Constants.type}


  localStorageItemName(id: string): string {
    return JSON.parse(localStorage.getItem(id)).username;
  }
  getpop() {
    return Constants.pop;
  }

}
