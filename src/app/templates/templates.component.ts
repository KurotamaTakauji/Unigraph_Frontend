import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

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
  showAuth: boolean = false;
  isPublic:boolean = false;
  template = {
    templateName: "",
    universityID: this.uniID,
    facultyID: this.facultyID,
    majorID: this.majorID,
    userId: "unknown"
  };
  showTemplates:any = [];
  userID:string = "";
  constructor(private route: ActivatedRoute, private http: HttpServiceService, private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.uniN = params.get('uniN')!;
        this.uniID = params.get('uniID')!;
        this.facultyN = params.get('facultyN')!;
        this.facultyID = params.get('facultyID')!;
        this.majorN = params.get('majorN')!;
        this.majorID = params.get('majorID')!;
    })
    this.userID = this.parseJwt(<string>localStorage.getItem("token")).id;
    this.http.getTemplates({universityID: this.uniID, facultyID: this.facultyID, majorID: this.majorID}).subscribe(
      {
        next: res =>{
          console.log(res);
          if(res != []){
            this.templates = res;
            for(let temp of this.templates){
              this.http.getTemplate(temp).subscribe(
                {
                  next: res => {
                    if(res.isPublic == true){
                      this.showTemplates.push({
                        ID: res.templateID,
                        Name: res.templateName,
                        User: res.userID
                      })
                    }
                  }
                }
              )
            }
            this.temps = true;
          }
          else{
            this.temps = false;
          }

        }
      }
    )
  }
  parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  submit(){
    this.template = {
      templateName: this.template.templateName,
      universityID: this.uniID,
      facultyID: this.facultyID,
      majorID: this.majorID,
      userId: this.userID
    };
    this.http.postTemplate(this.template).subscribe(
      {
        next: res => {
          console.log(res);
          this.http.getTemplate(res).subscribe(
            {
              next: res => {
                console.log(res);
                console.log(this.isPublic);
                if(this.isPublic){
                  this.http.switchPublic({
                    templateID: res.templateID,
                    userID: this.userID
                  }).subscribe(
                    {
                      next: resp => {
                        console.log(resp);
                        this.router.navigate(['/edit/'+res.templateID]);
                      }
                    }
                  )
                }
                this.router.navigate(['/edit/'+res.templateID]);
              }
            }
          )
        }
      }
    )
  }
  disableScroll() {
    // Get the current page scroll position
    let scrollTop: number = window.scrollY;
    let scrollLeft: number = window.scrollX;

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
  }

  enableScroll() {
      window.onscroll = function() {};
  }

}
