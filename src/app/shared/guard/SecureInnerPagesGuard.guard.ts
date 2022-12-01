import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceFirebase } from '../services/firebase/auth.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {
    
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = JSON.parse(localStorage.getItem('userId'));
        if (this.authService.isUserLoggedIn$) {
            window.alert("You are not allowed to access this URL!");
            this.router.navigate(['/dashboard/default'])
        }
        return true;
    }
}