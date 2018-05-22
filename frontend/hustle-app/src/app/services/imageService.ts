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

  getImages():Promise<any[]>{
    return this.http.get('http://localhost:8080/api/images',this.options)
      .toPromise()
      .then(response => response.json() as any[],err => {throw new Error("Dohvaćanje slika nije uspjelo")});
  }
  getImage(id : number):Promise<Image> {
    return this.http.get('http://localhost:8080/api/images/'+id,this.options)
      .toPromise()
      .then(response => response.json() as Image,err => {throw  new Error("Dovaćanje slike nije uspjelo")});
  }
  deleteImage(image : number) {
    return this.http.delete('http://localhost:8080/api/images/'+image,this.options)
      .toPromise()
      .then(response => console.log(response),err => console.log(""))
  }
  updateImage(image : number) {
    return this.http.put('http://localhost:8080/api/images/'+image,JSON.stringify(image),this.options)
      .toPromise()
      .then(response => console.log(response),err => {throw new Error("Brisanje slike nije uspjelo")})
  }
  addImage(image:any):Promise<Image> {
    let form = new FormData();
    form.append("file1",image);
    return this.http.post('http://localhost:8080/api/images',form,
      new RequestOptions({ headers: new Headers({ 'Authorization': 'Bearer ' + this.loginService.token}) }))
      .toPromise()
      .then(response => response.json() as Image,err => {throw  new Error("Dodavanje slike nije uspjelo")})
  }

}
