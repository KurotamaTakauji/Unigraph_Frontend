import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Login } from './login';
import { Token } from './token';
import { Register } from './register';
import { Search } from './search';


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

  getTemplates(data:{
    universityID: string,
    facultyID: string,
    majorID: string
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

  postTemplate(data:{
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
    
      })
    };
    return this.http.patch<any>(this.url+ "/universities", value, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }
  
  registerUser(data:Register, url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
    
      })
    };
    return this.http.post<Register>(this.url+ url, data, httpOptions).pipe(
      tap(),
      // catchError(this.handleError)
    );

  }

  private handleError(err: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
    // console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
