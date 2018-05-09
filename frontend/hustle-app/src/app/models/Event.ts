import { Venue } from "./venue";
import { Sport } from "./sport";
export class Event {
   location : string;
   id:number;
   creator:string;
   date :string;
   description:string;
   venue: Venue;
   sport:Sport;
   image:string;
   constructor(location:string,id:number,creator:string,date:string,
                description:string,venue:Venue,sport:Sport,image:string) {
                  this.location=location;
                  this.id=id;
                  this.creator=creator;
                  this.date=date;
                  this.description=description;
                  this.venue=venue;
                  this.sport=sport;
                  this.image=image;
                }
}
