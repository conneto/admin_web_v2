import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class Guard3Guard implements CanActivate {
  constructor(private user:AuthServiceService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.user.currentUserValue) {
        if(this.user.currentUserValue.role=='admin'){
          this.router.navigate(['/admin/dashboard']);
          return true;
        }else if(this.user.currentUserValue.role=='organization_manager'){
          this.router.navigate(['/manager']);
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
  
}
