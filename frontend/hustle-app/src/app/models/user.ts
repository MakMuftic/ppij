import { Image } from "./image";
import { Sport } from "./sport";

export class User {
  id:number;
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  aboutMeDescription:string;
  sports:Sport[];
  image:Image;
  role:boolean;
  constructor(userName:string,firstName:string,lastName:string,email:string,
  phoneNumber:string,description:string,favoriteSport:Sport[],image:Image,admin:boolean) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.aboutMeDescription = description;
    this.sports = favoriteSport;
    this.image = image;
    this.role = admin;
  }
}
