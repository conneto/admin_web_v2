import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Guard2Guard implements CanActivate {
  constructor(private router: Router, private user: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.user.currentUserValue) {
        if(this.user.currentUserValue.role_id=='admin'){
          this.router.navigate(['/admin/dashboard']);
          return true;
        }else if(this.user.currentUserValue.role_id=='organization_manager'){

          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
    // if (this.user-service.currentUserValue) {
    //   if (this.user-service.currentUserValue.role_id == 'organization_manager') {
    //     return true;
    //   }else if(this.user-service.currentUserValue.role_id=='admin'){
    //     this.router.navigate(['/admin/dashboard']);
    //     return true;
    //   }
    // }
    // this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    // return false;

  }

}
