import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import {SportService} from "../../services/sportService";

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  loading = false;
  error = '';
  sports:any[]=[];
  constructor(private router: Router,private loginServie:LoginService,
  private sportService:SportService) { }

  ngOnInit() {
  }
  login() {
    this.loginServie.login("la","la").subscribe(
      result => {
                if (result === true) {
                    console.log(result);
                } else {
                    console.log("problem")
                }
            }
    );
  }
  openProfile() {
    this.router.navigate(['user',"blabla"]);
  }
  events() {
    this.router.navigate(['events']);
  }
  posts() {
    this.router.navigate(['posts']);
  }
  getSports() {
    this.sportService.getSports()
      .then(sports => this.sports = sports);
      console.log(this.sports);
  }

}
