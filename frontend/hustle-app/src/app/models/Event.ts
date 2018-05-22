import { Venue } from "./venue";
import { Sport } from "./sport";
import { Image } from "./image";
export class Event {
   id:number;
   name : string;
   description:string;
   venue: Venue;
   sports:Sport[];
   image:Image;
   date :string;
   constructor(name:string,description:string,
                venue:Venue,sports:Sport[],image:Image,date:string) {
                  this.name = name;
                  this.description = description;
                  this.venue = venue;
                  this.sports = sports;
                  this.image = image;
                  this.date=date;
                }
}
