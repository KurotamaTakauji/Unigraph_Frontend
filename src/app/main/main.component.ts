import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Search } from '../search';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              '../app.component.css']
})

export class MainComponent implements OnInit {

  searchValue: string = "";
  items: any = {};


  constructor(private httpService: HttpServiceService) { }

  search(){
    // if (typeof searchValue === 'string') return searchValue;
    this.items = {};
    if(this.searchValue != ""){
      let searchData: Search = {
        searchParam: this.searchValue
      }
      this.httpService.search(searchData).subscribe({
           next: response => {
             this.items = response;
           }
         }
       );
     }
  }

  stringify(value: any){
    return JSON.stringify(value);
  }

  ngOnInit(): void {
  }

}
