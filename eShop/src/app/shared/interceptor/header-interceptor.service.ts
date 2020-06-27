import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { map, catchError, finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/shared/services/progress/progress.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService, private notification: NotificationService, private router: Router, private progress: ProgressService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.progress.show();

    let header = req.headers.set('authorization', this.userService.getToken());
    let r = req.clone({
      headers: header
    })
    return next.handle(r).pipe(
      map(result => {
        return result;
      }),
      catchError((err: HttpErrorResponse) => {
        this.showProperMessage(err);
        return throwError(err);
      }),
      finalize(() => {
        this.progress.hide();
      })
    );
  }

  showProperMessage(err: HttpErrorResponse){
    if(err.url.includes('is-admin')){
      return;
    }

    if(this.router.url.includes('login') && err.status != 401){
      this.notification.show('Invalid Login Credentials...');
      return;
    }

    if(err.status == 401){
      this.notification.show('Session Expired. Please Login again...');
      this.userService.logout();
      this.router.navigate(['login'], {
        queryParams: {
          'redirectUrl': this.router.url
        }
      });
      return;
    }
  }
}
