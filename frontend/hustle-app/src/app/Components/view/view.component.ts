import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input('objectType') object: any;
  @Input('Type') Type: string;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  getObject() {
    return this.object;
  }

}
