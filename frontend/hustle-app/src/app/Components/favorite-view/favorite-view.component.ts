import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenueService} from "../../services/venueService";
import {UserService} from "../../services/userService";

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.css']
})
export class FavoriteViewComponent implements OnInit {
  @Input('objectType') object: any;
  constructor(private router:Router,
              private userService:UserService,
              private venueService:VenueService) { }

  ngOnInit() {
  }

  getObject() {
    return this.object;
  }

}
