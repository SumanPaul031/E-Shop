import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let flag = false;
    if(this.userService.isLoggedIn()){
      flag = true;
    } else{
      let currentUrl = state.url;
      this.router.navigate(['login'], {
        queryParams: {
          returnUrl: currentUrl
        }
      });
    }
    
    return flag;
  }
}
