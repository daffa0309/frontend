import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceFirebase } from '../services/firebase/auth.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(public authService: AuthService,
    public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let userId =(sessionStorage.getItem('token'));
    
    
    if (!userId || userId === null) {
      this.router.navigate(['/auth/login']);
      return true
    }
    else if (userId) {
      if (!Object.keys(userId).length) {
        this.router.navigate(['/auth/login']);
        return true
      }
    }
    return true
  }
  
}
