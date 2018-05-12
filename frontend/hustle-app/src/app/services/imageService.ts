import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import { Image } from "../models/image";
import 'rxjs/add/operator/map'

@Injectable()
export class ImageService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token,"Content-Type":"application/json"});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http,private loginService:LoginService) {}

  getImages() {
    return this.http.get('http://localhost:8080/api/images',this.options)
      .toPromise();
  }
  getImage(id : number) {
    return this.http.get('http://localhost:8080/api/images/'+id,this.options)
      .toPromise();
  }
  deleteImage(image : number) {
    return this.http.delete('http://localhost:8080/api/images/'+image,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateImage(image : number) {
    return this.http.put('http://localhost:8080/api/images/'+image,JSON.stringify(image),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  addImage(image : Image) {
    return this.http.post('http://localhost:8080/api/images',JSON.stringify(image),this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }

}
