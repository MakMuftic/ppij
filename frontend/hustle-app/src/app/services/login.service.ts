import { Injectable } from '@angular/core';
import { Http, Headers, Response ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string) {
        return this.http.post('http://localhost:8080/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.headers.get("Authorization");
                let id = response.headers.get("X-USER-ID");
                localStorage.setItem("currentUser",null);
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token,id:id }));
                } else {
                    // return false to indicate failed login
                     throw new Error("Problem s podacima ");
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem("currentUser");
    }
}
