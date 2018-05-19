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

  getSports():Promise<any[]> {
    return this.http.get('http://localhost:8080/api/sports',this.options)
      .toPromise()
      .then(response => response.json() as any[]);
  }
  getSport(sport : number):Promise<Sport> {
    return this.http.get('http://localhost:8080/api/sports/'+sport,this.options)
      .toPromise()
      .then(response => response.json() as Sport,err => {throw new Error("Dohvaćanje sporta nije uspjelo")});
  }
  deleteSport(sport : Sport) {
    let variable = sport.id;
    let url = "http://localhost:8080/api/sports/"+variable;
    return this.http.delete(url,this.options)
      .toPromise()
      .then(response => console.log(response),err => {throw new Error("Brisanje sporta nije uspjelo")});
  }
  addSport(sport : Sport) {
    return this.http.post('http://localhost:8080/api/sports',JSON.stringify(sport),this.options)
      .toPromise()
      .then(response => console.log(response),err => {throw new Error("Dodavanje sporta nije uspjelo")})
  }
  editSport(sport:Sport) {
    let variable = sport.id;
    let url = "http://localhost:8080/api/sports/"+variable;
    return this.http.put(url,JSON.stringify(sport),this.options)
      .toPromise()
      .then(response => console.log(response),err => {throw new Error("Ažuriranje sporta nije uspjelo")})
  }


}
