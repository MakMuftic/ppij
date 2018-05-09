export class Dvorana{
  location: string;
  name: string;
  vrsta: string;
  opis:string;


  constructor(location: string,name:string,vrsta:string,
              opis:string) {
                this.location = location;
                this.name = name;
                this.vrsta = vrsta;
                this.opis = opis;
              }
}
