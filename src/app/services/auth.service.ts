import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'https://localhost:8443/api/Auth/login'; 
  private readonly registerUrl = 'https://localhost:8443/api/Auth/register'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticatedValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }


  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<boolean> {
    return this.http.post(this.loginUrl, { username, password, role }, { responseType: 'text' }) 
      .pipe(
        map(response => {
          console.log('Login response:', response);
          if (response) {
            localStorage.setItem('token', response); // Store the token in local storage
            this.isAuthenticatedSubject.next(true);
            return true;
          }
          return false;
        })
      );
  }
  

  register(username: string, password: string, role: string): Observable<boolean> {
    return this.http.post<{ username: string, passwordHash: string, role: string }>(
      this.registerUrl, 
      { username, password, role }
    ).pipe(
      map(response => {
        console.log('Register response:', response); // Log the server response
        if (response.username) {
          // If a username is received, registration is successful
          return true;
        }
        return false;
      })
    );
  }
}
