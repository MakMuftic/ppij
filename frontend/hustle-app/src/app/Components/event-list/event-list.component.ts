import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/Event";
import { Venue } from "../../models/venue";
import { Sport } from "../../models/sport";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  imena: string[] = ["Marko","Ivan","Lili","Pero","Djordj"];
  constructor() { }

  ngOnInit() {
    var i:number;
    for(i=0 ; i< 5; i++) {
      this.events[i] = new Event("bla bla",i,this.imena[i],"15-10-2011","lalala",new Venue(),new Sport(),"llalal");
    }
  }

}
