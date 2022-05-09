import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Search } from '../search';
import { Router } from '@angular/router';
import {UserPageComponent} from "../user-page/user-page.component";
import {MatDialog} from "@angular/material/dialog";
import {EditorComponent} from "../editor/editor.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              '../app.component.css']
})

export class MainComponent implements OnInit {

  searchValue: string = "";
  items: any = {};


  constructor(private httpService: HttpServiceService, private router:Router, public dialog: MatDialog) {
    this.openSettings()
   // this.open('AAAA',"AAA","edit")
  }

  search(){
    (typeof this.searchValue === 'string') ?  null : this.searchValue = "";
    this.items = {};
    let result = document.getElementById('result');
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
             this.items = response;
             console.log(response);
           },
           error: error => {
            console.log(error);
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
