import {Semester} from "./Semester";

export interface Template{
  templateID:string,
  templateName:string,
  universityID:string,
  facultyID:string,
  majorID:string,
  userID:string,
  isPublic:boolean,
  semester:Semester[]

}
