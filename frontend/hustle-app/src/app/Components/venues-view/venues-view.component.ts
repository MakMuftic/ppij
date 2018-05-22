import { Component, OnInit,EventEmitter,Input,Output,OnChanges,Injectable,ChangeDetectorRef } from '@angular/core';
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
  @Input() boolPop:boolean;
  @Output() boolChange = new EventEmitter<boolean>();
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService,
              private cd :ChangeDetectorRef) { }

  ngOnInit() {
  }
  checkFav(venue:number) {
    let bool = false;
    Constants.favorites.forEach(e => {
      if(e.id == venue) {
        bool=true
      }
    })
    return bool;
  }
  ngOnChanges() {
    if(this.switch) {
      this.userService.getUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id)
        .then(response => Constants.favorites = response);
      this.switch=false;
    }
  }

  add(venueId:number) {
    if(this.checkFav(venueId)) {
      this.userService.deleteUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,venueId);
    } else {
      console.log("hahahah");
      console.log(JSON.parse(localStorage["currentUser"]));
      this.userService.addUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,venueId);
    }
    this.boolPop = true;
    this.boolChange.emit(this.boolPop);
    this.switch = this.checkFav(venueId);
    this.cd.detectChanges();


  }

}
