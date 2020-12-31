import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if(currentUser){
        console.log(currentUser.user.userType)
            if(currentUser.user.userType===1){
                this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
                return true
            }
            else{
            this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url } });           
            return false
            }
        
        }
       
        else{

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
        }
    }
}