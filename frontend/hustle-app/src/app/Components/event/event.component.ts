import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { EventService } from "../../services/eventService";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input('event') event: any;
  constructor(private router:Router,public eventService:EventService) { }

  ngOnInit() {
  }
  more() {
    this.eventService.serviceData = this.event;
    this.router.navigate(['event',"{{event.id}}"]);
  }

}
