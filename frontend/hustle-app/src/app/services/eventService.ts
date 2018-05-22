import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Event } from "../models/Event";
import 'rxjs/add/operator/map'
import {Constants} from "../Constants/constants";

@Injectable()
export class EventService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getEvents():Promise<any[]>{
    return this.http.get('http://localhost:8080/api/events',this.options)
      .toPromise()
      .then(response => response.json() as any[],err => {throw new Error("Dohvaćanje evenata nije uspjelo")});
  }
  getEvent(eventId : number):Promise<Event> {
    return this.http.get('http://localhost:8080/api/events/'+eventId,this.options)
      .toPromise()
      .then(response => response.json() as Event,err => {throw new Error("Dohvaćanje eventa nije uspjelo")})
  }
  deleteEvent(eventId : number) {
    return this.http.delete('http://localhost:8080/api/events/'+eventId,this.options)
      .toPromise()
      .then(response => {this.getEvents().then(
        response => Constants.venues = response
      );},err => {throw new Error("Brisanje nije uspjelo ")} );
  }
  updateEvent(event : Event) {
    return this.http.put('http://localhost:8080/api/events/'+event.id,JSON.stringify(event),this.options)
      .toPromise()
      .then(response => {this.getEvents().then(
        response => Constants.venues = response
      );},err => {throw new Error("Ažuriranje podataka nije uspjelo ")})
  }
  addEvent(event : Event) {
    return this.http.post('http://localhost:8080/api/events',JSON.stringify(event),this.options)
      .toPromise()
      .then(response => {this.getEvents().then(
        response => Constants.events = response
      );},err => {throw new Error("Dodavanje podatka nije uspjelo ")})
  }

}
