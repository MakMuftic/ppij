import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Venue} from "../models/venue";
import 'rxjs/add/operator/map'

@Injectable()
export class VenueService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getVenues(): Promise<any[]>{
    return this.http.get('http://localhost:8080/api/venues',this.options)
      .toPromise()
      .then(response => response.json() as any[]);
  }
  getVenue(venue:number) {
    return this.http.get('http://localhost:8080/api/venues/'+venue,this.options)
      .toPromise();
  }
  deleteVenue(venue: number) {
    return this.http.delete('http://localhost:8080/api/venues/'+venue,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  addVenue(venue: Venue) {
    return this.http.post('http://localhost:8080/api/venues',JSON.stringify(venue),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateVenue(venue: Venue) {
    return this.http.put('http://localhost:8080/api/venues/'+venue.id,JSON.stringify(venue),this.options)
      .toPromise();
  }
  getAllUserFavoritingThisVenue(venue:number) {
    return this.http.get('http://localhost:8080/api/venues/'+venue+'/favourites',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log("problem"));
  }


}
