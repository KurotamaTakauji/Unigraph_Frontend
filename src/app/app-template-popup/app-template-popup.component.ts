import { Component, OnInit } from '@angular/core';
import {University} from "../University";
import {Faculty} from "../Faculty";
import {Major} from "../Major";
import {HttpServiceService} from "../http-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-app-template-popup',
  templateUrl: './app-template-popup.component.html',
  styleUrls: ['./app-template-popup.component.css']
})
export class AppTemplatePopupComponent implements OnInit {
  university: University[]=[];
  faculty: Faculty[]=[];
  major: Major[]=[];
  form:FormGroup;
  selectedFaculty: Faculty={facultyID:'',facultyName:''};
  selectedUni: University={universityID:'',universityName:''};
  selectedMajor: Major={majorID:'',majorName:''};
  nameDisabled:boolean=true;
  constructor(private httpClient:HttpServiceService,public dialogRef: MatDialogRef<AppTemplatePopupComponent>,private _snackBar:MatSnackBar) {


     this.form = new FormGroup({
      uni  : new FormControl('', [Validators.required]),
      faculty: new FormControl('',[Validators.required]),
      major:                       new FormControl('',Validators.required),
     forTheLoveOfGodPleaseDontAutoFillTheTemplateName: new FormControl('',Validators.required)

      })

    this.httpClient.getUniversites().subscribe({
      next:value => {
        this.university=value;
      }
    })

  }
  fillFaculty(){
    this.httpClient.getFaculties(this.selectedUni).subscribe({
      next:value => {
        this.faculty=value;
      }
    })
  }
  fillMajor(){
    this.httpClient.getMajors(this.selectedUni,this.selectedFaculty).subscribe({
      next:value => {
        this.major=value;

        console.log(this.selectedMajor)
      }
    })
  }
  ngOnInit(): void {
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

  saveTemplate() {
    console.log(this.selectedUni,this.selectedFaculty,this.selectedMajor,this.form.controls['forTheLoveOfGodPleaseDontAutoFillTheTemplateName'].value,this.parseJwt(localStorage.getItem('token')).id)
    this.httpClient.postTemplate(this.selectedUni,this.selectedFaculty,this.selectedMajor,this.form.controls['forTheLoveOfGodPleaseDontAutoFillTheTemplateName'].value,this.parseJwt(localStorage.getItem('token')).id).subscribe({
      next:value => {
        this.form.reset();
        this.dialogRef.close('saved');
      },
      error:err=>{
        if(err.status !=200){
          this._snackBar.open(err);
        console.log(err)
        }else {
          this.form.reset()
          this.dialogRef.close('saved');
        }

      }
    });
  }

  pls() {
      this.nameDisabled=false;
  }
}
