export class User {
  id:number;
  username:string;
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  desctiption:string;
  favoriteSport:string;
  image:string;
  admin:boolean;
  constructor(id:number,username:string,firstName:string,lastName:string,email:string,
  phoneNumber:string,description:string,favoriteSport:string,image:string,admin:boolean) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.desctiption = description;
    this.favoriteSport = favoriteSport;
    this.image = image;
    this.admin = admin;
  }
}
