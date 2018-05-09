import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class SportService {
  constructor(private http:Http) {}

  getSports(): Promise<any[]> {
    return this.http.get('http://localhost:8080/api/sports')
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
