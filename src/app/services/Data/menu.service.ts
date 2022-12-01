import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../models/Menu';
import { MenuApiServices } from '../Api/menu.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService implements DataService<Menu> {
  constructor(private menuApiService: MenuApiServices) {}

  public getAll(): Observable<Menu[]> {
    return this.menuApiService.getAll();
  }

  // public getById(id: number): Observable<Menu> {
  //   return this.menuApiService.getById(id);
  // }

  // public getByClinic(): Observable<Menu[]> {
  //   return this.menuApiService.getByClinic();
  // }

  // public getByStatus(status: 'active' | 'inactive'): Observable<Menu[]> {
  //   return this.menuApiService.getByStatus(status);
  // }

  // public getMenu(): Observable<Menu[]> {
  //   return this.menuApiService.getMenu();
  // }

  // public getMenuByName(queries: string): Observable<Menu[]> {
  //   return this.menuApiService.getMenuByName(queries);
  // }

  public create(data: any): Observable<any> {
    return this.menuApiService.create(data);
  }

  // public update(id: number, data?: any): Observable<any> {
  //   return this.menuApiService.update(id, data);
  // }

  // public delete(id: number): Observable<any> {
  //   return this.menuApiService.delete(id);
  // }
}
