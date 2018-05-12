import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Venue} from "../models/venue";
import 'rxjs/add/operator/map'

@Injectable()
export class VenueService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getVenues() {
    return this.http.get('http://localhost:8080/api/venues',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getVenue(venue: Venue) {
    return this.http.get('http://localhost:8080/api/venues/${venue.id}',this.options)
      .toPromise()
      .then(response => { return response as any;})
  }
  deleteVenue(venue: Event) {
    return this.http.delete('http://localhost:8080/api/venues/${venue.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  addVenue(venue: Event) {
    return this.http.post('http://localhost:8080/api/venues',JSON.stringify(venue),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateVenue(venue: Event) {
    return this.http.put('http://localhost:8080/api/venues/${venue.id}',JSON.stringify(venue),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  getAllUserFacoritingThisVenue(venue: Event):Promise<any[]> {
    return this.http.get('http://localhost:8080/api/venues/${venue.id}/favourites',this.options)
      .toPromise()
      .then(response => { return response.json() as any[];})
  }
  

}
