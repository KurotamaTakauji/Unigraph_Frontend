import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Login } from './login';
import { Token } from './token';
import { Register } from './register';
import { Search } from './search';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'

  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginUser(data:Login, url: string): Observable<Token> {


    return this.http.post<Token>(this.url+ url, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }

  search(value: Search): Observable<any> {
    return this.http.patch<Search>(this.url+ "/universities", value, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );

  }
  
  registerUser(data:Register, url: string): Observable<any> {

    return this.http.post<Register>(this.url+ url, data, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
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
