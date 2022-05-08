import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  uniN: string ="";
  uniID: string ="";
  facultyN: string ="";
  facultyID: string ="";
  majorN: string ="";
  majorID: string ="";
  msg:string = "";
  templates:any = [];
  temps:boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpServiceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.uniN = params.get('uniN')!;
        this.uniID = params.get('uniID')!;
        this.facultyN = params.get('facultyN')!;
        this.facultyID = params.get('facultyID')!;
        this.majorN = params.get('majorN')!;
        this.majorID = params.get('majorID')!;
    })
    this.http.getTemplates({universityID: this.uniID, facultyID: this.facultyID, majorID: this.majorID}).subscribe(
      {
        next: res =>{
          console.log(res);
          if(res != []){
            this.templates = res;
            this.temps = true;
          }
          else{
            this.temps = false;
          }
          
        }
      }
    )
  }
  submit(){
    this.http.postTemplate({
      universityID: this.uniID,
      facultyID: this.facultyID,
      majorID: this.majorID,
      userId: "string"
    }).subscribe(
      {
        next: res => {
          console.log(res);
        }
      }
    )
  }

}
