import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpServiceService } from '../http-service.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  constructor(private route: ActivatedRoute, private http: HttpServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.templateID = params.get('templateID')!;
  })
  this.http.getTemplate(this.templateID).subscribe(
    {
      next: res => {
        console.log(res);
        this.template = res.semester;
        this.templateName = res.templateName;
        this.uniID = res.universityID;
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
  }

  submitSubject(){
    this.subject.universityID = this.uniID;
    console.log(this.subject);
    this.http.postSubject(this.subject).subscribe(
      {
        next: res => {
          console.log(res);
        }
      }
    )
  }

  search(val:string){
    this.http.getSubjects({
      param: val,
      universityID: this.uniID
    }).subscribe(
      {
        next: res => {
          console.log(res);
        }
      }
    )
  }

  drop(event: CdkDragDrop<string[]>, index:number) {
    moveItemInArray(this.template[index], event.previousIndex, event.currentIndex);
  }

}
