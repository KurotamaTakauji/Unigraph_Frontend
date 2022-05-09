import {Component, Input, OnInit} from '@angular/core';
import {HttpServiceService} from "../http-service.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserPageComponent} from "../user-page/user-page.component";
import {map, Observable} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  templateID: string ="";
  templateName: string ="";
  editing:string='';
  semester:number=0;


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(private httpService: HttpServiceService, private router:Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }
  logout(){
    console.log("uwu");
    localStorage.removeItem("token");
    localStorage.removeItem("pw");
    this.router.navigate(['']);
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

   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
