import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Search } from '../search';
import { Router } from '@angular/router';
import {UserPageComponent} from "../user-page/user-page.component";
import {MatDialog} from "@angular/material/dialog";
import {EditorComponent} from "../editor/editor.component";
import {Observable} from "rxjs";
import {DisplayTemplateComponent} from "../display-template/display-template.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              '../app.component.css']
})

export class MainComponent implements OnInit {

  searchValue: string = "";
  items: any = [];
  pageEvent:any;


  constructor(private httpService: HttpServiceService, private router:Router, public dialog: MatDialog) {
    this.openTemplate();
  }
  openTemplate(){
    let dialogRef = this.dialog.open(DisplayTemplateComponent,{
      width:'98vw',
      height:'90vh',
      maxWidth:'100vw'
    })
  }
  search(){
    (typeof this.searchValue === 'string') ?  null : this.searchValue = "";
    this.items = [];
    let result = document.getElementById('content');
    if(this.searchValue != ""){
      if(result){
        result.style.display = "flex";
      }
      let searchData: Search = {
        searchParam: this.searchValue
      }
      this.httpService.search(searchData).subscribe(
        {
           next: response => {
             if(response[0] == '['){
              this.items = JSON.parse(response);
             }else
              console.log(response);
           }
        }
       );
     }else{
      if(result){
        result.style.display = "none";
      }
     }
  }

  logout(){
    console.log("uwu");
    localStorage.removeItem("token");
    localStorage.removeItem("pw");
    this.router.navigate(['']);
  }

  stringify(value: any): string{
    return JSON.stringify(value);
  }

  ngOnInit(): void {
  }

  uniDev(){
    alert('Ez a funkció sajnos még fejlesztés alatt áll :c');
  }
 open(templateId:string,templateName:string,editing:string):Observable<any> {
    const dialogRef = this.dialog.open(EditorComponent,{
      width: '80vw',
      height: '60vh',
    });
    dialogRef.componentInstance.templateID=templateId;
    dialogRef.componentInstance.templateName=templateName;
    dialogRef.componentInstance.templateName=editing;
   return dialogRef.afterClosed();
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
}
