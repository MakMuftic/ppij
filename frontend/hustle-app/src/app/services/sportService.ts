import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Sport } from "../models/sport";
import 'rxjs/add/operator/map'

@Injectable()
export class SportService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getSports() {
    return this.http.get('http://localhost:8080/api/sports',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getSport(sport : Sport) {
    return this.http.get('http://localhost:8080/api/sports/${sport.id}',this.options)
      .toPromise()
      .then(response => { return response as any;})
  }
  deleteSport(sport : Sport) {
    return this.http.delete('http://localhost:8080/api/sports/${sport.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  addSport(sport : Sport) {
    return this.http.post('http://localhost:8080/api/sports/',JSON.stringify(sport),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }


}
