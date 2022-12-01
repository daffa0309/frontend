import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/v2';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  roleId: Pick<Users, "roleId">;
  userId: Pick<Users, "id">;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }
  // Login
  login(username: Pick<Users, "username">, password: Pick<Users, "password">): Observable<{
    token: string;
    userId: Pick<Users, "id">;
    
  }> {
    return this.http
      .post<Users>(`${this.url}/login`, { username, password, }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string, userId: Pick<Users, "id">, roleId: Pick<Users, "roleId"> }) => {
          this.userId = tokenObject.userId;
          this.roleId = tokenObject.roleId;
          sessionStorage.setItem('token', tokenObject.token);
          sessionStorage.setItem('roleId', JSON.stringify(tokenObject.roleId));
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['/dashboard/default']);
        }),
        catchError(this.errorHandlerService.handleError<{
          token: string; userId: Pick<Users, "id">
        }>('login'))
      );
  }
  // Logout
  logout(): void {
    sessionStorage.clear();
    this.isUserLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }
}
