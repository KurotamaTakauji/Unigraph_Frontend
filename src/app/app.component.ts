import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { CryptoService } from './crypto.service';
import { Router } from '@angular/router';
import { Login } from './login';
import { Register } from './register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Unigraph_Frontend';
  showAuth: boolean = false;
  valid: boolean = false;
  formTemplate: string = 'login';
  loginData: Login = {
    username: "",
    password: ""
  };
  registerData: Register = {
    username: "",
    email: "",
    password: ""
  };
  key: string = "r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdR";
  errorMsg: string | undefined;

  emailReg:RegExp =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  constructor(private httpService: HttpServiceService, private crypto:CryptoService, private router:Router) {
   }

   ngOnInit(): void {
     if(this.parseJwt(<string>localStorage.getItem("token")) !== null && (this.parseJwt(<string>localStorage.getItem("token")).exp > Math.floor(Date.now() / 1000))){
       this.valid = true;
     }else{
       this.valid = false;
     }
   }

  login(){
    if(this.loginData.username != "" && this.loginData.password != ""){
       this.httpService.loginUser(this.loginData, "/users/login").subscribe({
            next: response => {
              if(response.token != ""){
                localStorage.setItem("token",response.token);
                localStorage.setItem("pw",this.crypto.set(this.key,this.loginData.password));
                this.router.navigate([''])
                .then(() => {
                  window.location.reload();
                });
              }else{
                console.log(response);
              }
            }
          }
        );
      }
  }

  validateEmail(){
    if(!this.emailReg.test(this.registerData.email) ){
      this.errorMsg = "érvénytelen email!";
    }else{
      this.errorMsg = "";
    }
  }

  register(){
    if(this.registerData.username != "" && this.registerData.email != "" && this.registerData.password != ""){
       this.httpService.loginUser(this.registerData, "/signup").subscribe({
            next: response => {
              console.log(response);
                this.router.navigate(['/']);
            }
          }
        );
        console.log(this.errorMsg);
      }
  }

  parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  reNewToken(){
    if(localStorage.getItem("token") !== null && localStorage.getItem("pw") !== null){
      let user: Login = {
        username: this.parseJwt(<string>localStorage.getItem("token")).name,
        password: this.crypto.get(this.key, localStorage.getItem("pw"))
      }
      this.loginData = user;
      this.login();
    }
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
