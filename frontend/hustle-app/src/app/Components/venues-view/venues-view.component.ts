import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";

@Component({
  selector: 'app-venues-view',
  templateUrl: './venues-view.component.html',
  styleUrls: ['./venues-view.component.css']
})
export class VenuesViewComponent implements OnInit {
  @Input('objectType') object: any;
  @Input('favorites') userFavorites:any[];
  switch:boolean = false;
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService) { }

  ngOnInit() {}
  checkFav(venue:number) {
    let bool;
     this.userFavorites.forEach(e => {
      if(e.id == venue) {
        this.switch= true;
        bool=true
        return true
      }
    });
     if (bool) {
       return true
     } else {
       this.switch=false;
       return false;
     }
  }

  add() {
    console.log(this.switch);
    if(this.switch) {
      this.userService.deleteUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,this.object.id);
    } else {
      this.userService.addUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id,this.object.id);
    }
    this.userService.getUserFavouritesVenues(JSON.parse(localStorage["currentUser"]).id)
      .then(response => this.userFavorites = response);

  }

}
