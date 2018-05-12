import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { SportService } from "../../services/sportService";
import { EventService } from "../../services/eventService";
import { VenueService } from "../../services/venueService";
import { UserService } from "../../services/userService";
import { User } from "../../models/user";
import { Event } from "../../models/Event";
import { Venue } from "../../models/venue";
import { Sport } from "../../models/sport";


@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  loading = false;
  error = '';
  sports:any[]=[];
  constructor(private router: Router,private loginServie:LoginService,
  private sportService:SportService,private eventService:EventService,
  private venueService:VenueService,private userService:UserService) { }

  ngOnInit() {
  }
  login() {
    this.loginServie.login("la","la").subscribe(
      result => {
                if (result === true) {
                    console.log(result);
                } else {
                    console.log("problem")
                }
            }
    );
  }
  openProfile() {
    this.router.navigate(['user',"blabla"]);
  }
  events() {
    this.router.navigate(['events']);
  }
  posts() {
    this.router.navigate(['posts']);
  }
  getSports() {
    this.sportService.getSports()
      //.then(sports => this.sports = sports);
      //console.log(this.sports);
  }
  ipsrobajmoSve() {
    let venue = new Venue(50,"lala","b","c","d","v");
    let sport = new Sport(50,"lalala");
    let user = new User(50,"lala","lala","lala","0","b","c","d","b",false);
    let event = new Event("lala",50,"blabla","b","c",venue,sport,"lala");
    this.sportService.addSport(sport);
    this.sportService.getSport(sport);
    this.sportService.getSports();
    this.sportService.deleteSport(sport);
    this.eventService.addEvent(event);
    event.name="asfjahfashf";
    this.eventService.updateEvent(event);
    this.eventService.getEvent(event);
    this.eventService.deleteEvent(event);
    this.userService.getUsers();
    this.userService.registerUser(user);
    user.username = "blblblblb";
    this.userService.updateUser(user);
    this.userService.deleteUser(user);
    this.venueService.addVenue(venue);
    this.venueService.getVenues();
    venue.description = "sajdajdasd";
    this.venueService.updateVenue(venue);
    this.venueService.getVenue(venue);
    this.venueService.deleteVenue(venue);

  }

}
