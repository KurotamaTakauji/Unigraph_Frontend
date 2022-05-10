
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Login } from './login';
import { Token } from './token';
import { Register } from './register';
import { Search } from './search';
import {UserTemplateIDs} from "./UserTemplateIDs";
import {TemplateCreationData} from "./TemplateCreationData";
import {Template} from "./Template";
import {NewPassword} from "./newPassword";
import {University} from "./University";
import {Faculty} from "./Faculty";
import {Major} from "./Major";
import {Subject} from "./Subject";
import {FullSubject} from "./FullSubject";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'

  })
};
let  AuthHeader = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')

        })
      };

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginUser(data:Login, url: string): Observable<Token> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<Token>(this.url+ url, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }
  checkUser(data:Login, url: string):Observable<Token>{


    return this.http.post<Token>(this.url+ url, data, httpOptions);




  }

  registerUser(data:Register, url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<Register>(this.url+ url, data, httpOptions)






  }


  deleteTemplate(id:string,userId:string):Observable<string>{
    let  header = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')

        })
      };
    return this.http.post<string>(this.url+'/templates/delete/',{userId:userId,templateId:id},header);
  }
  deleteSavedTemplate(id:string,userId:string):Observable<string>{
    return this.http.post<string>(this.url+"/templates/fav/",{userId:userId,templateId:id},AuthHeader);
  }

  changePassword(data:NewPassword): Observable<string> {

     let  header = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')

        })
      };
    return this.http.patch<string>(this.url+ '/users/changePassword', data, header).pipe(
      tap(),

    );

  }
  switchPublic(data: {
    templateID: string,
    userID: string
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.patch<boolean>(`${this.url}/templates/ispublic`,data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }





 getTemplates(data:{
    universityID: string,
    facultyID: string,
    majorID: string

  putTemplate(data:{
    templateID: string,
    templateName: string,
    universityID: string,
    facultyID: string,
    majorID: string,
    userID: string,
    isPublic: boolean,
    semester: semester[]
  }): Observable<any> {
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.put(`${this.url}/templates`, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  switchPublic(data: {
    templateID: string,
    userID: string
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<any>(this.url+"/universities/faculty/major/template", data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  getSubjectFromIdArray(arr:any):Observable<FullSubject[]>{
    return this.http.post<FullSubject[]>(this.url+"/subjects/arr",arr,AuthHeader);
  }



  // /subjects

  getSubjects(data:{
    param: string,
    universityID: string
  }): Observable<any> {
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.patch(`${this.url}/subjects`, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  postSubject(data: {
    universityID: string,
    neptunCode: string,
    subjectName: string,
    esubjectName: string,
    kreditNum: number,
    prerequisiteSubjectIDs: string[],
    builtOnSubjectIDs: string[]
  }){
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.post(`${this.url}/subjects`, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getNewSemester(templateID:string): Observable<any> {
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.patch(`${this.url}/templates/${templateID}`, '', httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  postTemplate(data:{
    templateName: string,
    universityID: string,
    facultyID: string,
    majorID: string,
    userId: string
  }): Observable<any> {
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.post(this.url+"/templates", data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  getMajors(data:{
    universityID: string,
    facultyID: string
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<any>(this.url+"/universities/faculty/major", data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  getFaculties(data:{
    universityID: string
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<any>(this.url+"/universities/faculty", data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  getUnis(data:{
    universityName: string,
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'

      })
    };
    return this.http.post<any>(this.url+"/universities", data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  search(value: Search): Observable<any> {
    const httpOptions: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: any,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }),
        responseType: 'text'
    };
    return this.http.patch(this.url+ "/universities", value, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }


  postTemplatee(u:University,f:Faculty,m:Major,name:string,userId:string):Observable<any>{
    console.log({templateName:name,universityID:u.universityID,facultyID:f.facultyID,majorID:m.majorID,userId:userId})
    return this.http.post<any>(this.url+'/templates',{templateName:name,universityID:u.universityID,facultyID:f.facultyID,majorID:m.majorID,userId:userId},AuthHeader);
  }

  getMajorss(u:University,f:Faculty):Observable<Major[]>{
    return this.http.post<Major[]>(this.url+'/universities/faculty/major',{universityID:u.universityID,facultyID:f.facultyID},AuthHeader);
  }
  getFacultiess(u:University):Observable<Faculty[]>{
    return this.http.post<Faculty[]>(this.url+'/universities/faculty',{universityID:u.universityID},AuthHeader);
  }
  getUniversites():Observable<University[]>{
    return this.http.get<University[]>(this.url+'/universities',AuthHeader);
  }

  getUserTemplates(userID:string):Observable<UserTemplateIDs>{

    return this.http.get<UserTemplateIDs>(this.url+'/profile/'+userID+'/templates');
  }
  swapTemplatePublic(t:Template){
    return this.http.patch(this.url+'/templates/ispublic',{templateID:t.templateID,userID:t.userID});
  }
  getTemplateById(templateId:string):Observable<Template>{
    return this.http.get<Template>(this.url+'/templates/'+templateId);
  }
  getTemplate(templateId:string):Observable<Template>{
    return this.http.get<Template>(this.url+'/templates/'+templateId);
  }
  private handleError(err: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
    if(err.status !=200){
      if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
   }else{

    }
    // console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

export interface semester{
  semesterID: string,
  subjects: string[]
}
