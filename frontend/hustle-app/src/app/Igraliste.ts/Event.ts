export class Event {
  id:number;
  location:string;
  creator:string;
  datumOdrzavanja:Date;

  constructor(id:number,location:string,creator:string,datum:Date) {
    this.id = id;
    this.location = location;
    this.creator = creator;
    this.datumOdrzavanja = datum;

  }
}
