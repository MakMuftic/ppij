import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { User } from "../models/user";
import { Venue } from "../models/venue";
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getUsers() {
    return this.http.get('http://localhost:8080/api/users',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getUser(user : number){
    return this.http.get('http://localhost:8080/api/users/'+user,this.options)
      .toPromise();
  }
  deleteUser(user : number) {
    return this.http.delete('http://localhost:8080/api/users/'+user,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  registerUser(user : User,password:string) {
    return this.http.post('http://localhost:8080/api/users/',JSON.stringify({user:user,password:password}),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateUser(user : User) {
    return this.http.put('http://localhost:8080/api/users/'+user.id,JSON.stringify(user),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  getUserFavouritesVenues(user:number) {
    return this.http.get('http://localhost:8080/api/users/'+user+'/favourites',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  addUserFavouritesVenues(user:number,venue:number) {
    return this.http.post('http://localhost:8080/api/users/'+user+'/favourites/'+venue,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  deleteUserFavouritesVenues(user:number,venue:number) {
    return this.http.delete('http://localhost:8080/api/users/'+user+'/favourites/'+venue,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }

}
