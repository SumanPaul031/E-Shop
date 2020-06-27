import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // let flag = false;
    // if(this.userService.isLoggedIn()){
    //   flag = true;
    // } else{
    //   this.router.navigate(['login']);
    // }
    
    return this.userService.isAdmin().pipe(
      map(result => {
        if(!result){
          this.router.navigate([''], {
            queryParams: {
              returnUrl: state.url
            }
          });
        }
        return result;
      })
    );
  }
}
