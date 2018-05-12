import { Venue } from "./venue";
import { Sport } from "./sport";
import { Image } from "./image";
export class Event {
   id:number;
   name : string;
   description:string;
   venueId: number;
   sportId:number;
   image:Image;
   date :string;
   constructor(name:string,description:string,
                venueId:number,sportId:number,image:Image,date:string) {
                  this.name = name;
                  this.description = description;
                  this.venueId = venueId;
                  this.sportId = sportId;
                  this.image = image;
                  this.date=date;
                }
}
