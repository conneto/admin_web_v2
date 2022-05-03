import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Guard3Guard implements CanActivate {
  constructor(private user:AuthService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.user.currentUserValue) {
        if(this.user.currentUserValue.role_id=='admin'){
          this.router.navigate(['/admin/dashboard']);
          return true;
        }else if(this.user.currentUserValue.role_id=='organization_manager'){
          this.router.navigate(['/manager']);
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
  }

}
