import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authApi: AuthServiceService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authApi.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authApi.currentUserValue;
    if (currentUser.role == 'admin') {
      return true;
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

