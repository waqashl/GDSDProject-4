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
        const currentUser = this.authenticationService.currentUser;
        if(currentUser){
        console.log(currentUser.user.userType)
            if(currentUser.user.userType===0){

                return true
            }
            else{
                this.router.navigate(['/home/main'], { queryParams: { returnUrl: state.url } });           

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