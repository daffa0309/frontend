import { Injectable } from '@angular/core';
import { Users } from '../../models/Users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { Menu } from '../../models/Menu';
import { MenuAdapter } from '../adapter/menu.adapter.service';
@Injectable({
  providedIn: 'root'
})
export class MenuApiServices {
  private url = 'http://localhost:8080/api/v2';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private adapter: MenuAdapter

  ) { }

  public getAll(): Observable<Menu[]> {
    return this.http.get(`${this.url}/menu`).pipe(
      map((data: any) => {
        if (!data) {
          return [];
        }
        return data.responses.menu.map((item: Menu) => this.adapter.adapt(item));
      }),
      catchError((err) => throwError(err))
    );
  }
  public create(data: any): Observable<any> {
    return this.http
      .post(
        `${this.url}/menu`,
        data,
        this.httpOptions
      )
      .pipe(catchError((err) => throwError(err)));
  }

}
