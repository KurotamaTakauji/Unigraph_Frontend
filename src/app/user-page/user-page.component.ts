import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {HttpServiceService} from "../http-service.service";
import {UserTemplateIDs} from "../UserTemplateIDs";
import {Template} from "../Template";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorStateMatcher} from "@angular/material/core";
import {AppTemplatePopupComponent} from "../app-template-popup/app-template-popup.component";
import {DisplayTemplateComponent} from "../display-template/display-template.component";
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {


  pw: string="";
  repw:string="";
  currpw:string="";
  passwordChange:FormGroup;
  disableCheck:boolean[]=[];
  get somethingAutofillDoesntKnowPassword() {return this.passwordChange.get("somethingAutofillDoesntKnowPassword")};
  get somethingAutofillDoesntKnow() {return this.passwordChange.get("somethingAutofillDoesntKnow")};
  get currentPassword() {return this.passwordChange.get('currentPassword')}


  userTemplates:UserTemplateIDs;
  ree:Template[];
  ree2:Template[];


  constructor(private router:Router,private httpService:HttpServiceService,private formBuilder: FormBuilder,private _snackBar: MatSnackBar,private dilaog:MatDialog) {
    this.ree=[{
                    facultyID:    '',
                    isPublic:     false,
                    majorID:      '',
                    semester:     [],
                    templateName: '',
                    universityID: '',
                    userID:       '',
                    templateID:   ''
  }];
    this.ree.pop();
    this.ree2=[{
                    facultyID:    '',
                    isPublic:     false,
                    majorID:      '',
                    semester:     [],
                    templateName: '',
                    universityID: '',
                    userID:       '',
                    templateID:   ''
  }];
    this.ree2.pop();
    this.userTemplates={ownedTemplates:[],savedPublicTemplates:[]};


    this.passwordChange = new FormGroup({
      somethingAutofillDoesntKnowPassword  : new FormControl('', [Validators.required]),
      somethingAutofillDoesntKnow:           new FormControl('',[Validators.required]),
      // @ts-ignore
      currentPassword:                       new FormControl('',Validators.required)
      // @ts-ignore
  },{validators: this.checkPasswords})
  }
  snackbar(msg:string){
    let snackBarRef = this._snackBar.open(msg);
  }

   savePW() {

      if(localStorage.getItem('token') != null){
        this.httpService.checkUser({username:this.parseJwt(localStorage.getItem('token')).name,password:this.passwordChange.controls['currentPassword'].value},'/users/login').subscribe({
          next:response=>{
            this.httpService.changePassword({newPassword:this.passwordChange.controls['somethingAutofillDoesntKnowPassword'].value,
                                                  password:this.passwordChange.controls['currentPassword'].value,
                                                  username:this.parseJwt(localStorage.getItem('token')).name}).subscribe({
                next:response=>{


                  this.snackbar('Jelszó frissitve');
                  this.passwordChange.controls['currentPassword'].setValue("");
                   this.passwordChange.controls['somethingAutofillDoesntKnowPassword'].setValue("");
                   this.passwordChange.controls['somethingAutofillDoesntKnow'].setValue("");
                },
                error:err=>{

                  if(err.status != 200){
                    this.snackbar('Hiba történt');;
                  }else{
                   this.snackbar('Jelszó frissitve');
                   this.passwordChange.controls['currentPassword'].setValue("");
                   this.passwordChange.controls['somethingAutofillDoesntKnowPassword'].setValue("");
                   this.passwordChange.controls['somethingAutofillDoesntKnow'].setValue("");
                  }

                }

              });
          },
          error:err => {

            if(err !="Error"){
              this.snackbar("Hibás jelszó");
              this.passwordChange.controls['currentPassword'].setValue("");
            }

          }
        });

      }

    }
  ngOnInit(): void {
  this.ree=[{
                    facultyID:    '',
                    isPublic:     false,
                    majorID:      '',
                    semester:     [],
                    templateName: '',
                    universityID: '',
                    userID:       '',
                    templateID:   ''
  }];
  this.ree.pop();
  this.userTemplates={ownedTemplates:[],savedPublicTemplates:[]};
    this.httpService.getUserTemplates(this.parseJwt(localStorage.getItem('token') || '').id).subscribe({
      next: response => {
        this.userTemplates=response;

          if(this.userTemplates.ownedTemplates.length>0){
            for(let t of this.userTemplates.ownedTemplates){

              this.httpService.getTemplateById(t).subscribe({
                next:response1=>{
                  this.ree.push({
                    facultyID: response1.facultyID,
                    isPublic: response1.isPublic,
                    majorID: response1.majorID,
                    semester: response1.semester,
                    templateName: response1.templateName,
                    universityID: response1.universityID,
                    userID: response1.userID,
                    templateID:response1.templateID});
                  this.disableCheck.push(false)
                  console.log(this.ree)
                }
              })
            }
          }

      }
    })

    this.httpService.getUserTemplates(this.parseJwt(localStorage.getItem('token') || '').id).subscribe({
      next: response => {
        this.userTemplates=response;

          if(this.userTemplates.savedPublicTemplates.length>0){
            for(let t of this.userTemplates.savedPublicTemplates){

              this.httpService.getTemplateById(t).subscribe({
                next:response1=>{
                  this.ree2.push({
                    facultyID: response1.facultyID,
                    isPublic: response1.isPublic,
                    majorID: response1.majorID,
                    semester: response1.semester,
                    templateName: response1.templateName,
                    universityID: response1.universityID,
                    userID: response1.userID,
                    templateID:response1.templateID});
                  this.disableCheck.push(false)
console.log(this.ree2)
                }
              })
            }
          }

      }
    })

  }
   ngAfterViewInit(): void{

   }
   swapPublic(t:Template,n:number){
    this.disableCheck[n]=true;
    let isTicked = t.isPublic;
      this.httpService.swapTemplatePublic(t).subscribe({
        next:reps=>{
          this.disableCheck[n]=false;
        },
        error:err=>{
          this.ree[n].isPublic=isTicked;
          this.disableCheck[n]=false;
          this.snackbar('Hiba történt')
        }
      })
   }
   editTemplate(t:Template,i:number){

   }
   addTemplate(){

      let dialogRef = this.dilaog.open(AppTemplatePopupComponent,{
        width:'24vw',
        height:'44vh'
      })
     dialogRef.afterClosed().subscribe({
       next:value => {
         this.ngOnInit();
       }
     })
   }
  deleteTemplate(template:Template,num:number){
      this.httpService.deleteTemplate(template.templateID,this.parseJwt(localStorage.getItem('token')).id).subscribe({
        next:resp=>{
          this.ree.splice(num,1);
        },
        error:err=>{
          this.snackbar('Hiba történt');
        }
      })
  }


  logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("pw");
    this.router.navigate(['']);
  }
  parseJwt(token: string | null) {
    if(token != null){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
    }else{
      return {};
    }
  }



  // @ts-ignore
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('somethingAutofillDoesntKnowPassword')?.value;
    let confirmPass = group.get('somethingAutofillDoesntKnow')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  deleteTemplateFromSaved(t:Template, i:number) {
    this.httpService.deleteSavedTemplate(t.templateID,this.parseJwt(localStorage.getItem('token')).id).subscribe({
        next:resp=>{
          this.ree2.splice(i,1);
        },
        error:err=>{
          this.snackbar('Hiba történt');
        }
      })
  }
  openTemplate(t:Template){
    console.log('AAA')
    let dialogRef = this.dilaog.open(DisplayTemplateComponent,{
      width:'98vw',
      height:'90vh',
      maxWidth:'100vw'
    })
    dialogRef.componentInstance.inputId=t.templateID;
  }
}

export interface TemplateListRow {
  id:string,
  name:string
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
