import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpServiceService } from '../http-service.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import { UserPageComponent } from '../user-page/user-page.component';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {
  templateID:string = "";
  templateName:string = "";
  uniID:string = "";
  template:any = [];
  subject = {
    universityID: "",
    neptunCode: "",
    subjectName: "",
    esubjectName: "",
    kreditNum: 0,
    prerequisiteSubjectIDs: [],
    builtOnSubjectIDs: []
  };
  origTemplate:any = {};
  subjects:any = [];
  availableSubjects:any = [{
    universityID: "",
    neptunCode: "",
    subjectName: "",
    esubjectName: "",
    kreditNum: 0,
    prerequisiteSubjectIDs: [],
    builtOnSubjectIDs: []
  }];
  pres:any = [];
  buildOns:any = [];
  radio:any = "non";
  currentIndex:number = -1;
  selected:number = 0;
  temp:string[][] = [];

  constructor(private route: ActivatedRoute, private http: HttpServiceService,public dialog: MatDialog) {
  }

  openSettings() {
    const dialogRef = this.dialog.open(UserPageComponent,{
      width: '80vw',
      height: '60vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.templateID = params.get('templateID')!;
  })
  this.http.getTemplate(this.templateID).subscribe(
    {
      next: res => {
        console.log(res);
        this.origTemplate = res;
        this.template = res.semester;
        this.templateName = res.templateName;
        this.uniID = res.universityID;
        for(let sem of this.template){
          this.temp.push([]);
        }
        this.http.getSubjects({
          param: "",
          universityID: this.uniID
        }).subscribe(
          {
            next: res => {
              this.availableSubjects = JSON.parse(res);
              let temp:any = [];
              let k = 0;
              for(let sem of this.template){
                temp.push({
                  semesterID: sem.semesterID,
                  subjects: []
                });
                for(let sub of sem.subjects){
                  for(let ava of this.availableSubjects){
                    if(sub == ava.subjectID){
                      temp[temp.length-1].subjects.push(ava);
                      this.temp[k].push(ava.subjectID);
                    }
                  }
                }
                k++;
              }
              this.template = temp;
            }
          }
        )
      }
    }
  )
  }

  newSemester(){
    this.http.getNewSemester(this.templateID).subscribe(
      {
        next: res=>{
          console.log(res);
          this.template.push({
            semesterID: res,
            subjects: []
          });
          console.log(this.template);
        }
      }
    )
    this.temp.push([]);
  }

  delSemester(i:number){
    this.template.splice(i, 1);
    this.temp.slice(i, 1);
  }

  delSubject(i:number, j:number){
    this.template[i].subjects.splice(j, 1);
    this.temp[i].splice(j, 1);
  }

  updateTemplate(){
    console.log(this.template);
    let result:any = [];
    for(let i=0; i<this.template.length; i++){
      result.push({
        semesterID: this.template[i].semesterID,
        subjects: this.temp[i]
      })
    }
    this.origTemplate.semester = result;
    this.http.putTemplate(this.origTemplate).subscribe(
      {
        next: res => {
          console.log(res);
        }
      }
    )
  }

  submitSubject(){
    this.subject.universityID = this.uniID;
    console.log(this.subject);
    this.http.postSubject(this.subject).subscribe(
      {
        next: res => {
          console.log(res);
          if(this.currentIndex > -1){
            this.template[this.currentIndex].subjects.push(res);
          }
        }
      }
    )
  }

  submitASubject(index:number){
    this.template[this.currentIndex].subjects.push(this.availableSubjects[index]);
    this.temp[this.currentIndex].push(this.availableSubjects[index].subjectID);

  }

  search(val:string){
    this.http.getSubjects({
      param: val,
      universityID: this.uniID
    }).subscribe(
      {
        next: res => {
          this.subjects = JSON.parse(res);
          console.log(this.subjects);
        }
      }
    )
  }

  drop(event: CdkDragDrop<string[]>, index:number) {
    console.log(this.template[index].subjects);
    moveItemInArray(this.template[index].subjects, event.previousIndex, event.currentIndex);
    moveItemInArray(this.temp[index], event.previousIndex, event.currentIndex);
  }

  renderSubjectLists(i:number){
    if(this.radio == "non"){
      let j = 0;
      for(let pre of this.pres){
        if(pre.subjectID == this.subjects[i].subjectID)
          this.pres.splice(j, 1);
          j++;
      }
      j = 0;
      for(let bO of this.buildOns){
        if(bO.subjectID == this.subjects[i].subjectID){
          console.log(j);
          this.buildOns.splice(j, 1);
        }
          j++;
      }
    } else if(this.radio == "pre"){
      this.pres.push(this.subjects[i]);
      let j = 0;
      for(let bO of this.buildOns){
        if(bO.subjectID == this.subjects[i].subjectID)
          this.buildOns.splice(j, 1);
          j++;
      }
    }else if(this.radio == "buiOn"){
      this.buildOns.push(this.subjects[i]);
      let j = 0;
      for(let pre of this.pres){
        if(pre.subjectID == this.subjects[i].subjectID)
          this.pres.splice(j, 1);
          j++;
      }
    }
  }

}
