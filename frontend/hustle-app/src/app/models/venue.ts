import { Sport } from "./sport";
import { Image } from "./image";
export class Venue {
  id:number;
  name:string;
  description:string;
  sports:Sport[];
  type:string;
  location:string;
  images:Image[];
  constructor (name:string,desctiption:string,sports:Sport[],type:string,location:string,images:Image[]) {
    this.name = name;
    this.description = desctiption;
    this.type = type;
    this.location = location;
    this.sports = sports
    this.images = images;
  }
}
