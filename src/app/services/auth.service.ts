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
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.loginUrl, { username, password }, { responseType: 'text' }) 
      .pipe(
        map(response => {
          console.log('Login response:', response);
          if (response) {
            // If a response (token) is received, set isAuthenticated to true
            this.isAuthenticatedSubject.next(true);
            return true;
          }
          return false;
        })
      );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<{ username: string, passwordHash: string }>(this.registerUrl, { username, password }).pipe(
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
