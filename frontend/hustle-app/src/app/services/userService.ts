import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { User } from "../models/user";
import { Venue } from "../models/venue";
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {Constants} from "../Constants/constants";


@Injectable()
export class UserService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService,private router:Router) {}

  getUsers():Promise<any[]> {
    return this.http.get('http://localhost:8080/api/users',this.options)
      .toPromise()
      .then(response => response.json() as any[],err => {throw new Error("Dohvaćanje svih usera nije uspjelo")});
  }
  getUser(user : number):Promise<User>{
    return this.http.get('http://localhost:8080/api/users/'+user,this.options)
      .toPromise().then(response => response.json() as User,err => {throw new Error("Dohvaćanje usera s id-jem:" + user +" nije uspjelo")});
  }
  deleteUser(user : number) {
    return this.http.delete('http://localhost:8080/api/users/'+user,this.options)
      .toPromise()
      .then(response => console.log(response),err => {throw new Error("Brisanje usera nije uspjelo")})
  }
  registerUser(user : User,password:string) {
    return this.http.post('http://localhost:8080/register',JSON.stringify({user:user,password:password}))
      .toPromise().then(response =>  { console.log(response),err => localStorage.setItem("registerError", "Y")
      });
  }
  updateUser(user : User) {
    return this.http.put('http://localhost:8080/api/users/'+user.id,JSON.stringify(user),this.options)
      .toPromise()
      .then(response => {this.getUser(JSON.parse(localStorage.getItem('currentUser')).id).then(
        response => Constants.user = response
      );},err => {throw new Error("Ažuriranje usera nije uspjelo")}).then(

      )
  }
  getUserFavouritesVenues(user:number):Promise<any[]> {
    return this.http.get('http://localhost:8080/api/users/'+user+'/favourites',new RequestOptions({headers:new Headers({ "Content-Type":"application/json"})}))
      .toPromise()
      .then(response => response.json() as any[],err => {throw new Error("Dohvaćanje venues koji su favorite za usera  nije uspjelo")});
  }
  addUserFavouritesVenues(user:number,venue:number) {
    return this.http.post('http://localhost:8080/api/users/'+user+'/favourites/'+venue,new RequestOptions({headers:new Headers({ "Content-Type":"application/json"})}))
      .toPromise()
      .then(response => {this.getUserFavouritesVenues(JSON.parse(localStorage.getItem("currentUser")).id).then(
        response => Constants.favorites=response
      )},err => {throw new Error("Dodavanje venue u userove favorite nije uspjelo")}).then(

      );
  }
  deleteUserFavouritesVenues(user:number,venue:number) {
    return this.http.delete('http://localhost:8080/api/users/'+user+'/favourites/'+venue,new RequestOptions({headers:new Headers({ "Content-Type":"application/json"})}))
      .toPromise()
      .then(response => {this.getUserFavouritesVenues(JSON.parse(localStorage.getItem("currentUser")).id).then(
        response => Constants.favorites=response
      )},err => {throw new Error("Brisanje venuea iz userovih favorita nije uspjelo")});
  }

}
