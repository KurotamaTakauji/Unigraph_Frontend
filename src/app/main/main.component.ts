import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Search } from '../search';
import { Router } from '@angular/router';

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


  constructor(private httpService: HttpServiceService, private router:Router) { }

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

}
