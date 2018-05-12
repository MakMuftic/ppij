export class Venue {
  id:number;
  name:string;
  description:string;
  sports:string;
  type:string;
  location:string;
  constructor (id:number,name:string,desctiption:string,sports:string,type:string,location:string) {
    this.id = id;
    this.name = name;
    this.description = desctiption;
    this.sports = sports;
    this.type = type;
    this.location = location;
  }
}
