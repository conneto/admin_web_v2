import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authApi: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authApi.currentUserValue;
    if (currentUser) {
      if (currentUser.role_id == 'admin') {
        return true;
      } else if (currentUser.role_id == 'organization_manager') {
        this.router.navigate(['/manager']);
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authApi.currentUserValue;
    if (currentUser.role_id == 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
