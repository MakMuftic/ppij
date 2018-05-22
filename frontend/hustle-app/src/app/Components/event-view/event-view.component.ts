import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";
import {Venue} from "../../models/venue";
import {Sport} from "../../models/sport";
import {SportService} from "../../services/sportService";
import {ImageService} from "../../services/imageService";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  @Input('objectType') object: any;
  venue:Venue;
  sport:Sport
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService,
              private sportService:SportService,
              private imageService:ImageService) { }

  ngOnInit() {
    this.venueService.getVenue(this.object.venueId)
      .then(venue => this.venue = venue)
    this.sportService.getSport(this.object.sportId)
      .then(sport => this.sport = sport);
  }


  getObject() {
    return this.object;
  }

}
