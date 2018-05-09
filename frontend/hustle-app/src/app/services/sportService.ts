import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import 'rxjs/add/operator/map'

@Injectable()
export class SportService {
  constructor(private http:Http,private loginService:LoginService) {}

  getSports(): Promise<any[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:8080/api/sports',options)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
