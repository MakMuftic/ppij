import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Event } from "../models/Event";
import 'rxjs/add/operator/map'

@Injectable()
export class EventService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getEvents() {
    return this.http.get('http://localhost:8080/api/events',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""));
  }
  getEvent(event : Event) {
    return this.http.get('http://localhost:8080/api/events/${event.id}',this.options)
      .toPromise()
      .then(response => { return response as any;})
  }
  deleteEvent(event : Event) {
    return this.http.delete('http://localhost:8080/api/events/${event.id}',this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateEvent(event : Event) {
    return this.http.put('http://localhost:8080/api/events/${event.id}',JSON.stringify(event),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  addEvent(event : Event) {
    return this.http.post('http://localhost:8080/api/events',JSON.stringify(event),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }

}
