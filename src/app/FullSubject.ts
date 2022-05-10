import {Subject} from "./Subject";

export interface FullSubject {
  subjectID:string,
  universityID:string,
  neptunCode:string,
  subjectName:string,
  esubjectName:string,
  kreditNum:number,
  prerequisiteSubjectIDs:string[],
  builtOnSubjectIDs:string[],
  i:number,
  j:number
}
