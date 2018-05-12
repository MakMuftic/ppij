import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { User } from "../models/user";
import { Venue } from "../models/venue";
import 'rxjs/add/operator/map'


@Injectable()
export class SportService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getUsers() {
    return this.http.get('http://localhost:8080/api/users',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getUser(user : User):Promise<any> {
    return this.http.get('http://localhost:8080/api/users/${user.id}',this.options)
      .toPromise()
      .then(response => { return response as any;})
  }
  deleteUser(user : User) {
    return this.http.delete('http://localhost:8080/api/users/${user.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  registerUser(user : User) {
    return this.http.post('http://localhost:8080/api/users/',JSON.stringify(user),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateUser(user : User) {
    return this.http.put('http://localhost:8080/api/users/${user.id}',JSON.stringify(user),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  getUserFavouritesVenues(user:User) {
    return this.http.get('http://localhost:8080/api/users/${user.id}/favourites',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  updateUserFavouritesVenues(user:User,venue:Venue) {
    return this.http.put('http://localhost:8080/api/users/${user.id}/favourites/${venue.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  deleteUserFavouritesVenues(user:User,venue:Venue) {
    return this.http.delete('http://localhost:8080/api/users/${user.id}/favourites/${venue.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }

}
