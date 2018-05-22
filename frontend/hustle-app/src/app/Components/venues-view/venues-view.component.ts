import {Component, EventEmitter, Input, Output, OnChanges, OnInit, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";
import {Constants} from "../../Constants/constants";
import {Venue} from "../../models/venue";

@Component({
  selector: 'app-venues-view',
  templateUrl: './venues-view.component.html',
  styleUrls: ['./venues-view.component.css']
})
@Injectable()
export class VenuesViewComponent implements OnInit,OnChanges {
  venues:Venue[] = Constants.venues;
  favorites:any[] = Constants.favorites;
  switch:boolean = false;
  @Input() bool:boolean;
  @Output() boolChange = new EventEmitter<boolean>();
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService) { }

  ngOnInit() {
    console.log(this.venues);
  }
  checkFav(venue:number) {
    let bool;
     this.favorites.forEach(e => {
      if(e.id == venue) {
        this.switch= true;
        bool=true
        return;
      }
    });
     if (bool) {
       return false
     } else {
       this.switch=false;
       return true;
     }
  }
  ngOnChanges() {
    if(this.switch) {
      this.userService.getUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id)
        .then(response => Constants.favorites = response);
      this.switch=false;
    }
  }

  add(venueId:number) {
    console.log(this.switch);
    if(this.switch) {
      this.userService.deleteUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,venueId);
    } else {
      this.userService.addUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,venueId);
    }
    this.userService.getUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id)
      .then(response => Constants.favorites = response);
    this.bool = true;
    this.boolChange.emit(this.bool)

  }

}
