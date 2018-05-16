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
    this.router.navigate(['user',this.localStorageItemName('currentUser')]);
  }
  toEvents() {
    this.type="E";
    this.eventService.getEvents()
      .then(events => this.events = events);
    console.log(this.events);
  }
  toVenues() {
    this.type = "V";
    this.venueService.getVenues()
      .then(venues => this.venues = venues);
    console.log(this.venues);
  }
  tofavorites() {
    this.type =  "F";
    this.userService.getUser(1).then(user => this.user = user);
    this.userService.getUserFavouritesVenues(this.user.id);
  }
  logOut() {
    this.loginService.logout();
    this.router.navigate(['welcomepage']);
  }
  getType() {return this.type}
  getSports() {
    this.sportService.getSports()
      //.then(sports => this.sports = sports);
      //console.log(this.sports);
  }
  localStorageItemName(id: string): string {
    return JSON.parse(localStorage.getItem(id)).username;
  }
  ipsrobajmoSve() {
    /*this.imageService.getImage(1).then(response => {
      var event = new Event("lala","blabla",1,2,response.json() as Image,new Date().toUTCString());
      this.eventService.addEvent(event);});
    let event = this.eventService.getEvent(1).then(response => { let event = (response.json() as Event);
    event.name = "aafasfasfasasdasd";
    this.eventService.updateEvent(event)});
    this.eventService.getEvents();
    this.eventService.deleteEvent(1);*/
    /*let pass = "pass";
    this.imageService.getImage(1).then(response => {
      let image = response.json() as Image
      this.sportService.getSports().then(response => {
        var user = new User("lala","blabla","blabla","blabla","080595235","sdad",response.json() as Sport[],image,false);
        this.userService.registerUser(user,pass);
      });
    });
    let user = this.userService.getUser(5).then(response => {
      {let user = response.json() as User;
      user.userName = "sadadasd";
      this.userService.updateUser(user);
    }
  });
    this.userService.deleteUser(5);*/
    //this.userService.getUserFavouritesVenues(1);
    //this.userService.addUserFavouritesVenues(2,1);
    //this.userService.deleteUserFavouritesVenues(1,1);
    /*this.sportService.getSports().then(response => {
      let sports = response.json() as Sport[];
      this.imageService.getImage(1).then(response => {
        let venue = new Venue("hahaha","hahaha",sports,"outdoor_public","martinovka",[response.json() as Image]);
        this.venueService.addVenue(venue);
      })

    })*/
    /*this.venueService.getVenue(1);
    this.venueService.getVenues();*/
    /*this.venueService.getVenue(2).then(response => {
      let venue = response.json() as Venue;
      venue.name = "blabla";
      this.venueService.updateVenue(venue);
    })*/
    /*this.venueService.deleteVenue(2);
    this.venueService.getAllUserFavoritingThisVenue(1);*/

    /*this.userService.getUsers();
    this.userService.registerUser(user);
    user.username = "blblblblb";
    this.userService.updateUser(user);
    this.userService.deleteUser(user);
    this.venueService.addVenue(venue);
    this.venueService.getVenues();
    venue.description = "sajdajdasd";
    this.venueService.updateVenue(venue);
    this.venueService.getVenue(venue);
    this.venueService.deleteVenue(venue);*/

}
}
