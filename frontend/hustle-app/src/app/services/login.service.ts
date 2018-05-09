import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {User} from "../models/user";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }
  storeToken() {

  }

  loginUser(user:string,password:string){
    user="mace";
    password="pass";
    const url = "/login";
    let result = this.http.post(url,JSON.stringify({user,password})).subscribe(
      res => {console.log(res)},
      err => console.log(err)
    );
  }

  getLoginedUser(): User {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    return user === "null" ? null : user;
  }

  setLoginedUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    localStorage.setItem("user", "null");
  }

}
