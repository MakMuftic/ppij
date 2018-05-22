import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";
import {Venue} from "../../models/venue";
import {Sport} from "../../models/sport";
import {SportService} from "../../services/sportService";
import {ImageService} from "../../services/imageService";
import {Constants} from "../../Constants/constants";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  venue:Venue;
  sport:Sport
  events:any[]=Constants.events;
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService,
              private sportService:SportService,
              private imageService:ImageService) { }

  ngOnInit() {
    console.log(Constants.events);
  }
  getVenue(venueId:number) {
    this.venueService.getVenue(venueId)
      .then(venue => this.venue = venue)
    return this.venue;
  }
  getSport(sportId:number) {
    this.sportService.getSport(sportId)
      .then(sport => this.sport = sport);
    return this.sport;
  }


}
