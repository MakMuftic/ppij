import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";
import {Constants} from "../../Constants/constants";

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.css']
})
export class FavoriteViewComponent implements OnInit {
  favorites:any[] = Constants.favorites;
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService) { }

  ngOnInit() {
  }


}
