import {ChangeDetectorRef, Component} from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Constants} from "./Constants/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    Constants.roll=true;
    if(localStorage.getItem('currentUser') !== null) {
      this.router.navigate(['startpage']);
    }
  }
  constructor(private router:Router,private cd:ChangeDetectorRef) {}



}
