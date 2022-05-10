import {Component, Input, OnInit} from '@angular/core';
import {Template} from "../Template";
import {Semester} from "../Semester";
import {Subject} from "../Subject";
import {HttpServiceService} from "../http-service.service";
import {FullSubject} from "../FullSubject";
import {ArrBody} from "../ArrBody";
import {KeyValue} from "@angular/common";
import {Pair} from "../../Pair";
@Component({
  selector: 'app-display-template',
  templateUrl: './display-template.component.html',
  styleUrls: ['./display-template.component.css']
})
export class DisplayTemplateComponent implements OnInit {
  template:Template={
    facultyID: "",
    isPublic: false,
    majorID: "",
    semester: [],
    templateName: "",
    universityID: "",
    userID: "",
    templateID:''};
  subjects:FullSubject[]=[]
  //subjectMap:Map<string,FullSubject> =new Map<string, FullSubject>();
  subjectIds:ArrBody={
    array:[]
  };
  highlight:boolean[][][]=[];
  inputId:string='';
  constructor(private httpclient:HttpServiceService) {
    for(let i = 0;i<15;i++){

        this.highlight.push([
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false],
          [false,false,false,false,false]
        ]) ;

    }
    //Ha templatetel van megnyitva akkor ki kell kommentezni
    //Innentol


  }


  ngOnInit(): void {

    //idaig

  }
  ngAfterViewInit():void{
         let str=(this.inputId =='')?'9gz3970bx8j01b749lstdez':this.inputId;
    this.httpclient.getTemplate(str).subscribe({
      next:value => {
        this.template=value;
    //idaig + meg lejjebb

                for(let semesters of this.template.semester){

                  for(let subjects of semesters.subjects){
                     this.subjectIds.array.push(subjects);


                  }

                }
                this.httpclient.getSubjectFromIdArray(this.subjectIds).subscribe({
                    next:value => {
                      this.subjects=value;

                let ii =0;
                for(let semesters of this.template.semester){
                  let jj=0;
                  for(let subjects of semesters.subjects){
                     const a = this.findIt(subjects);
                     a.i=ii;
                     a.j=jj;
                     jj++;


                  }
                  ii++;

                }
                for (let subj of this.subjects){
                  if(subj.prerequisiteSubjectIDs.length<1){
                    this.highlight[subj.i][subj.j][2]=true;
                  }
                }



                }
  })
    //meg innentol
      }
    })
  }
  highligthRelatives(fullSubject: string, i: number) {

    this.deepPre(this.findIt(fullSubject));
    this.deepPost(this.findIt(fullSubject))


  }
  deepPre(full:FullSubject){

    for(let ids of full.prerequisiteSubjectIDs){

      let id=this.findIt(ids);

      this.highlight[id.i][id.j][0]=true;
      this.deepPre(id)
    }

  }
  deepPost(full:FullSubject){

    for(let ids of full.builtOnSubjectIDs){

      let id=this.findIt(ids);

      this.highlight[id.i][id.j][1]=true;
      this.deepPost(id)
    }

  }

  findIt(subject:string) {
    const r =this.subjects.find(el=>el.subjectID==subject)
    if(r == undefined){
    return {
  subjectID:'',
  universityID:'',
  neptunCode:'',
  subjectName:'',
  esubjectName:'',
  kreditNum:0,
  prerequisiteSubjectIDs:[],
  builtOnSubjectIDs:[],
  i:0,
      j:0
};}
    return r
  }

  clearHighlight() {
    for(let i = 0;i<this.highlight.length;i++){
      for(let j= 0;j<this.highlight[i].length;j++){
      this.highlight[i][j][0] = false;
      this.highlight[i][j][1] = false;

    }
  }
  }
  checjIfNextRelativeStarted(fullS:FullSubject){


    for(let i = 0;i<fullS.builtOnSubjectIDs.length;i++){
      let nextRelatives = this.findIt(fullS.builtOnSubjectIDs[i]);
      if(this.highlight[nextRelatives.i][nextRelatives.j][3] || this.highlight[nextRelatives.i][nextRelatives.j][4]){

        return true;
      }
    }

    return false;
  }
  switchRelativesCan(full:FullSubject){
    for(let s of full.builtOnSubjectIDs){
      let relative =this.findIt(s);
      let count =0;
      console.log(relative.builtOnSubjectIDs.length)
      for(let ss of relative.prerequisiteSubjectIDs){
        let earlyRelative= this.findIt(ss);
        if(this.highlight[earlyRelative.i][earlyRelative.j][4]){
          count++;
        }else {
          break;
        }
      }
      console.log(count,relative.prerequisiteSubjectIDs)
      if(count>=relative.prerequisiteSubjectIDs.length){
        this.highlight[relative.i][relative.j][2]=!this.highlight[relative.i][relative.j][2];
      }

    }
  }
  switchRelativesDone(full:FullSubject){
    for(let s of full.builtOnSubjectIDs){
      let relative =this.findIt(s);
      this.highlight[relative.i][relative.j][2]=!this.highlight[relative.i][relative.j][2];
    }
  }
  click(subject:string) {
    let fullSubject = this.findIt(subject);
    if(this.highlight[fullSubject.i][fullSubject.j][2] || this.highlight[fullSubject.i][fullSubject.j][3] || this.highlight[fullSubject.i][fullSubject.j][4]){

    if(this.highlight[fullSubject.i][fullSubject.j][2]){
      this.highlight[fullSubject.i][fullSubject.j][3]=true;
      this.highlight[fullSubject.i][fullSubject.j][2]=false;
    }else if(this.highlight[fullSubject.i][fullSubject.j][3]){
      this.highlight[fullSubject.i][fullSubject.j][3]=false;
      this.highlight[fullSubject.i][fullSubject.j][4]=true;
      this.switchRelativesCan(fullSubject);
    }else{
       if(fullSubject.builtOnSubjectIDs.length<1){
          this.highlight[fullSubject.i][fullSubject.j][4]=false;
           this.highlight[fullSubject.i][fullSubject.j][2]=true;

       }else {
          if(!this.checjIfNextRelativeStarted(fullSubject)){
            this.highlight[fullSubject.i][fullSubject.j][4]=false;
           this.highlight[fullSubject.i][fullSubject.j][2]=true;
           this.switchRelativesDone(fullSubject);
          }
       }
    }

    }

  }
}
