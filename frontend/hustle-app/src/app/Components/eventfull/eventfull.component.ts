import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/eventService";

@Component({
  selector: 'app-eventfull',
  templateUrl: './eventfull.component.html',
  styleUrls: ['./eventfull.component.css']
})
export class EventfullComponent implements OnInit {
  event: any;
  constructor(private eventService: EventService ) { }

  ngOnInit() {
    
  }


}
