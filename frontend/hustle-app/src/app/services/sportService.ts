import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Sport } from "../models/sport";
import 'rxjs/add/operator/map'

@Injectable()
export class SportService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getSports() {
    return this.http.get('http://localhost:8080/api/sports',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getSport(sport : Sport) {
    return this.http.get('http://localhost:8080/api/sports/?id=${sport.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log("problem"));
  }
  deleteSport(sport : Sport) {
    let variable = sport.id;
    let url = "http://localhost:8080/api/sports/"+variable;
    return this.http.delete(url,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log("problem"));
  }
  addSport(sport : Sport) {
    return this.http.post('http://localhost:8080/api/sports',JSON.stringify(sport),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log("problem"))
  }
  editSport(sport:Sport) {
    let variable = sport.id;
    let url = "http://localhost:8080/api/sports/"+variable;
    return this.http.put(url,JSON.stringify(sport),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log("problem"))
  }


}
